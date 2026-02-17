/**
 * Create a demo booking.
 * Called by Ultravox voice agent as a tool endpoint.
 * In production, this would create a real reservation via the booking API.
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const {
    checkInDate = '',
    checkOutDate = '',
    adults = 2,
    guestName = '',
    email = '',
    phone = '',
    roomType = '',
    arrivalTime = '',
    specialRequests = '',
  } = req.body || {};

  // Calculate nights
  let nights = 0;
  try {
    const dIn = new Date(checkInDate);
    const dOut = new Date(checkOutDate);
    nights = Math.round((dOut - dIn) / (1000 * 60 * 60 * 24));
  } catch (e) { /* ignore */ }

  // Generate booking reference
  const ref = `TF-${String(Date.now() % 100000).padStart(5, '0')}`;

  // Log booking to server console
  console.log('='.repeat(60));
  console.log(`[BOOKING CONFIRMED] Reference: ${ref}`);
  console.log(`  Guest: ${guestName}`);
  console.log(`  Email: ${email}`);
  console.log(`  Phone: ${phone}`);
  console.log(`  Room: ${roomType}`);
  console.log(`  Dates: ${checkInDate} to ${checkOutDate} (${nights} nights)`);
  console.log(`  Adults: ${adults}`);
  console.log(`  Arrival: ${arrivalTime}`);
  console.log(`  Special requests: ${specialRequests}`);
  console.log(`  Payment: DEMO MODE (skipped)`);
  console.log('='.repeat(60));

  const result = [
    'Booking confirmed successfully!',
    `- Reference: ${ref}`,
    `- Guest: ${guestName}`,
    `- Room: ${roomType}`,
    `- Dates: ${checkInDate} to ${checkOutDate} (${nights} nights)`,
    `- Confirmation will be sent to ${email}`,
    `Tell the guest their booking reference is ${ref}.`,
  ].join('\n');

  res.status(200).json({ result });
}
