/**
 * Check room availability and pricing via Little Hotelier GraphQL API.
 * Called by Ultravox voice agent as a tool endpoint.
 */

const GRAPHQL_URL = 'https://book-directonline.com/api/graphql';
const CHANNEL_CODE = 'arkanamotel_direct';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Origin': 'https://book-directonline.com',
  'Referer': `https://book-directonline.com/properties/${CHANNEL_CODE}`,
};

async function graphqlQuery(query, variables) {
  const resp = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
  });
  const data = await resp.json();
  if (data.errors) throw new Error(`GraphQL: ${JSON.stringify(data.errors)}`);
  return data.data || {};
}

async function getPropertyId() {
  const data = await graphqlQuery(
    `query property($channelCode: String!) {
      property(channelCode: $channelCode, locale: "en") { uuid }
    }`,
    { channelCode: CHANNEL_CODE }
  );
  return parseInt(data.property?.uuid || '0', 10);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { checkInDate, checkOutDate, adults = 2, children = 0 } = req.body || {};

  if (!checkInDate || !checkOutDate) {
    return res.status(200).json({ result: 'I need both check-in and check-out dates to look up availability.' });
  }

  try {
    const propertyId = await getPropertyId();

    // Fetch room types and pricing in parallel
    const [roomData, quoteData] = await Promise.all([
      graphqlQuery(
        `query roomTypes($channelCode: String!, $checkInDate: String, $checkOutDate: String) {
          roomTypes(channelCode: $channelCode, checkInDate: $checkInDate, checkOutDate: $checkOutDate, locale: "en") {
            uuid name maxOccupancy amenities { name featured }
          }
        }`,
        { channelCode: CHANNEL_CODE, checkInDate: checkInDate, checkOutDate: checkOutDate }
      ),
      graphqlQuery(
        `query quoteSets($propertyId: Int!, $checkInDate: String!, $checkOutDate: String!, $adults: Int, $children: Int) {
          quoteSets(propertyId: $propertyId, checkInDate: $checkInDate, checkOutDate: $checkOutDate, adults: $adults, children: $children) {
            roomTypeId available
            price { amount amountStr }
          }
        }`,
        { propertyId, checkInDate: checkInDate, checkOutDate: checkOutDate, adults, children }
      ),
    ]);

    const rooms = roomData.roomTypes || [];
    const quotes = quoteData.quoteSets || [];

    // Build quote lookup
    const quoteMap = {};
    for (const q of quotes) quoteMap[String(q.roomTypeId)] = q;

    // Calculate nights
    const dIn = new Date(checkInDate);
    const dOut = new Date(checkOutDate);
    const nights = Math.round((dOut - dIn) / (1000 * 60 * 60 * 24));

    const available = [];
    const unavailable = [];

    for (const room of rooms) {
      const quote = quoteMap[String(room.uuid)] || {};
      const avail = quote.available || 0;
      const total = quote.price?.amount || 0;
      const perNight = nights > 0 ? Math.round(total / nights) : 0;

      const entry = { name: room.name, available: avail, total, perNight };
      if (avail > 0) available.push(entry);
      else unavailable.push(entry);
    }

    if (available.length === 0) {
      return res.status(200).json({
        result: `Sorry, no rooms are available for those dates. All ${rooms.length} room types are fully booked.`
      });
    }

    const lines = [`Available rooms for ${nights} night${nights > 1 ? 's' : ''}, ${adults} adult${adults > 1 ? 's' : ''}:`];
    for (const r of available) {
      const availNote = r.available === 1 ? ' (only 1 left!)' : ` (${r.available} available)`;
      const petNote = r.name.toLowerCase().includes('pet') ? ' - PET FRIENDLY' : '';
      lines.push(`- ${r.name}: $${r.perNight} per night, $${r.total} total${petNote}${availNote}`);
    }
    if (unavailable.length > 0) {
      lines.push(`(${unavailable.length} other room types are fully booked for these dates)`);
    }

    res.status(200).json({ result: lines.join('\n') });
  } catch (error) {
    res.status(200).json({ result: `Sorry, I couldn't check availability right now. Error: ${error.message}` });
  }
}
