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

  // Get API key from environment variable (set in Vercel dashboard)
  const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY;

  if (!ULTRAVOX_API_KEY) {
    res.status(500).json({ error: 'API key not configured. Please set ULTRAVOX_API_KEY environment variable in Vercel.' });
    return;
  }

  // Get agent ID from request body
  const { agentId } = req.body;

  if (!agentId) {
    res.status(400).json({ error: 'Agent ID is required' });
    return;
  }

  try {
    // Step 1: Fetch agent config to get prompt and tools
    const agentResponse = await fetch(
      `https://api.ultravox.ai/api/agents/${agentId}`,
      {
        method: 'GET',
        headers: { 'X-API-Key': ULTRAVOX_API_KEY },
      }
    );

    if (!agentResponse.ok) {
      // Fallback: create call directly via agent endpoint (old behavior)
      const response = await fetch(
        `https://api.ultravox.ai/api/agents/${agentId}/calls`,
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
        res.status(response.status).json({ error: 'Ultravox API error', details: data });
        return;
      }
      res.status(200).json(data);
      return;
    }

    const agentData = await agentResponse.json();

    // Agent config is nested under callTemplate
    const tpl = agentData.callTemplate || {};

    // Step 2: Prepend current date/time to prompt so agents always know today's date
    let prompt = tpl.systemPrompt || '';
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const currentDate = now.toLocaleDateString('en-US', dateOptions);
    const currentTime = now.toLocaleTimeString('en-US', timeOptions);
    const datePrefix = `[Current date and time: ${currentDate}, ${currentTime}]\n\n`;
    prompt = datePrefix + prompt;
    // Also replace any {{currentDate}} template variable if present
    prompt = prompt.replace('{{currentDate}}', currentDate);

    // Step 3: Build call body from agent config with resolved prompt
    const callBody = {
      systemPrompt: prompt,
      medium: { webRtc: {} },
    };

    if (tpl.selectedTools) callBody.selectedTools = tpl.selectedTools;
    if (tpl.voice) callBody.voice = tpl.voice;
    if (tpl.model) callBody.model = tpl.model;
    if (tpl.temperature != null) callBody.temperature = tpl.temperature;
    if (tpl.firstSpeaker) callBody.firstSpeaker = tpl.firstSpeaker;
    if (tpl.languageHint) callBody.languageHint = tpl.languageHint;

    // Step 4: Create call with resolved config
    const response = await fetch(
      'https://api.ultravox.ai/api/calls',
      {
        method: 'POST',
        headers: {
          'X-API-Key': ULTRAVOX_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callBody)
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
