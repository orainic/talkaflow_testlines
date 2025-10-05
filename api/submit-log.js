// API endpoint to receive and store client logs
// This uses Vercel KV for persistent storage (optional - falls back to console logging)

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const logData = req.body;

    // Validate log data
    if (!logData || !logData.sessionId) {
      return res.status(400).json({ error: 'Invalid log data' });
    }

    // Add server timestamp
    const serverLog = {
      ...logData,
      serverReceivedAt: new Date().toISOString(),
      clientIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    // Try to use Vercel KV if available
    try {
      const { kv } = await import('@vercel/kv');

      // Store in KV with session ID as part of key
      const logKey = `log:${logData.sessionId}:${Date.now()}`;
      await kv.set(logKey, serverLog);

      // Also add to a list of all log keys for retrieval
      await kv.lpush('log_keys', logKey);

      // Keep only last 1000 log keys
      await kv.ltrim('log_keys', 0, 999);

      console.log(`[LOG SAVED TO KV] Session: ${logData.sessionId}`);
      return res.status(200).json({ success: true, storage: 'kv' });

    } catch (kvError) {
      // KV not available - fall back to console logging
      console.log('=== CLIENT LOG RECEIVED ===');
      console.log(JSON.stringify(serverLog, null, 2));

      return res.status(200).json({
        success: true,
        storage: 'console',
        note: 'Logged to Vercel console. Install @vercel/kv for persistent storage.'
      });
    }

  } catch (error) {
    console.error('Error processing log:', error);
    return res.status(500).json({ error: 'Failed to process log' });
  }
}
