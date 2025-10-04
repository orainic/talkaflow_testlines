export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ULTRAVOX_API_KEY = 'Sid4RoQc.3uuN493Jc06KqobeqBZaD5YNedjXQnXF';
  const AGENT_ID = 'f6dd7bbb-ae88-4ebc-addf-d0a2203f9555';

  try {
    // Make request to Ultravox API
    const response = await fetch(
      `https://api.ultravox.ai/api/agents/${AGENT_ID}/calls`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': ULTRAVOX_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medium: { webRtc: {} } })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({
        error: 'Ultravox API error',
        details: data
      });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
}
