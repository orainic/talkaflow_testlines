// API endpoint to retrieve stored logs
// Fetches logs from Vercel KV storage

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Try to use Vercel KV
    try {
      const { kv } = await import('@vercel/kv');

      // Get all log keys
      const logKeys = await kv.lrange('log_keys', 0, -1);

      if (!logKeys || logKeys.length === 0) {
        return res.status(200).json({
          logs: [],
          count: 0,
          storage: 'kv',
          message: 'No logs found'
        });
      }

      // Retrieve all logs
      const logs = [];
      for (const key of logKeys) {
        const log = await kv.get(key);
        if (log) {
          logs.push(log);
        }
      }

      // Sort by timestamp (newest first)
      logs.sort((a, b) => {
        const timeA = new Date(a.serverReceivedAt || a.fullTimestamp).getTime();
        const timeB = new Date(b.serverReceivedAt || b.fullTimestamp).getTime();
        return timeB - timeA;
      });

      return res.status(200).json({
        logs,
        count: logs.length,
        storage: 'kv'
      });

    } catch (kvError) {
      // KV not available
      return res.status(200).json({
        logs: [],
        count: 0,
        storage: 'none',
        message: 'Vercel KV not configured. Logs are available in Vercel console logs.',
        setup: 'Run: npm install @vercel/kv and configure KV in Vercel dashboard'
      });
    }

  } catch (error) {
    console.error('Error retrieving logs:', error);
    return res.status(500).json({ error: 'Failed to retrieve logs' });
  }
}
