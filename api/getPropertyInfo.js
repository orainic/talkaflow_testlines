/**
 * Get property information via Little Hotelier GraphQL API.
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const resp = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        query: `query property($channelCode: String!) {
          property(channelCode: $channelCode, locale: "en") {
            name description starRating
            address { addressLine1 city state postcode country { name } }
            contact { phone email }
          }
        }`,
        variables: { channelCode: CHANNEL_CODE },
      }),
    });

    const data = await resp.json();
    if (data.errors) throw new Error(JSON.stringify(data.errors));

    const info = data.data?.property || {};
    const addr = info.address || {};
    const contact = info.contact || {};

    const result = {
      name: info.name || '',
      starRating: info.starRating || '',
      address: `${addr.addressLine1 || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.postcode || ''}`,
      phone: contact.phone?.[0] || '',
      email: contact.email || '',
      description: info.description || '',
    };

    res.status(200).json({ result: JSON.stringify(result) });
  } catch (error) {
    res.status(200).json({ result: `Error: ${error.message}` });
  }
}
