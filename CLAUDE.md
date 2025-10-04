# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multi-agent Ultravox Voice AI system** providing browser-based voice interfaces for various business use cases. The project provides direct browser-to-Ultravox connections via serverless API proxy, supporting 6 different voice agents.

**Core Purpose**: Enable businesses to embed AI voice assistants for customer service across different industries: hotels, clinics, restaurants, after-sales support, hair salons, and maintenance services.

## Development Commands

### Local Development
```bash
# Start local server
python -m http.server 8080

# Or use npm
npm start
```

Access the interface at `http://localhost:8080/voice-agent.html?agent=hotel`

### Build & Deploy
```bash
# Build (currently just echoes confirmation)
npm run build

# Deploy to Vercel (see deploy-instructions.md for details)
vercel deploy
```

## Architecture

### Components

1. **Dynamic Voice Interface** (`voice-agent.html`)
   - Single HTML file supporting multiple agents via URL parameters
   - Direct browser-to-Ultravox WebSocket connections
   - Handles microphone access and media permissions
   - Real-time conversation UI with streaming transcripts
   - Debug panel for troubleshooting
   - TalkaFlow branding with logo

2. **Agent Configuration** (`agents-config.json`)
   - Defines 6 different voice agents: hotel, clinic, aftersales, restaurant, hairstudio, hepa
   - Each agent has: ID, name, title, description, icon, and suggestion prompts
   - Easily extensible for new agents

3. **Serverless API Proxy** (`api/ultravox.js`)
   - Vercel serverless function
   - Proxies requests to Ultravox API to bypass CORS restrictions
   - Accepts `agentId` parameter to support multiple agents
   - Authentication: API key stored server-side

4. **URL Routing** (`vercel.json`)
   - Clean URLs: `/hotel`, `/clinic`, `/restaurant`, etc.
   - Each route maps to `voice-agent.html?agent=<type>`
   - CORS headers for all routes

5. **Reference Workflows** (`Demo_*.json`)
   - Original n8n + Twilio SIP workflows
   - Kept for reference and agent ID lookup
   - Not used in current implementation

### Data Flow

```
1. User accesses URL (e.g., /hotel)
   ↓
2. Browser loads voice-agent.html with ?agent=hotel
   ↓
3. JavaScript fetches agents-config.json
   ↓
4. UI updates with agent-specific branding
   ↓
5. User clicks "Start Voice Call"
   ↓
6. Browser → /api/ultravox (POST with agentId)
   ↓
7. Vercel Function → Ultravox API (create call)
   ↓
8. Ultravox returns joinUrl & credentials
   ↓
9. Browser connects via Ultravox SDK WebSocket
   ↓
10. Real-time voice conversation (user ↔ AI agent)
```

### Key Technical Decisions

- **SDK Loading**: Multiple fallback CDN paths attempted (unpkg, jsdelivr, skypack, esm.run) due to network restrictions
- **Medium Type**: Uses `{ medium: { webRtc: {} } }` instead of Twilio SIP configuration
- **Direct WebSocket**: Falls back to raw WebSocket connection when Ultravox SDK fails to load
- **Status Management**: Tracks call states: disconnected → connecting → idle → listening → thinking → speaking

## Available Agents

See `agents-config.json` for full configuration. Current agents:

1. **Hotel** (`f6dd7bbb-ae88-4ebc-addf-d0a2203f9555`) - DoubleTree Auckland Karaka
2. **Clinic** (`2e187b77-75b4-4d33-97dc-78675babac81`) - Medical appointment booking
3. **After-Sales** (`32605cc1-70a5-4900-97ad-5c866efc07cf`) - Powerbay product support
4. **Restaurant** (`badeb30e-22d3-49c9-ad58-ff029473f796`) - Dining reservations
5. **Hair Studio** (`056b0abf-b196-4a3d-80ec-a33371f7e13e`) - L'Artisan salon bookings
6. **HEPA** (`d92f1c3b-1ee3-4ff5-86c9-ebe18b5b3bcd`) - Maintenance support

To add new agents: Update `agents-config.json` and `vercel.json` routing.

## Common Issues & Solutions

### SDK Loading Failures
- **Cause**: Corporate/network firewalls blocking CDN access (unpkg.com, livekit.cloud)
- **Solution**: Deploy to cloud hosting (Vercel/Netlify) or use mobile hotspot for testing

### Microphone Access Denied
- **Cause**: Browser permissions not granted or insecure context
- **Solution**: Ensure HTTPS or localhost, check browser permission settings

### WebSocket Connection Issues
- **Cause**: Invalid joinUrl or expired credentials
- **Solution**: Recreate call via API to get fresh credentials

## File Structure

- **`voice-agent.html`**: Main dynamic voice interface (supports all agents via URL params)
- **`agents-config.json`**: Agent configurations (names, IDs, icons, suggestions)
- **`api/ultravox.js`**: Serverless API proxy for Ultravox calls
- **`vercel.json`**: Deployment config with URL routing and CORS
- **`talkaFlow_logo_only.png`**: TalkaFlow branding logo
- **`Demo_*.json`**: Reference n8n workflows (not actively used)
- **`AGENT_URLS.md`**: Documentation for embedding agents in Wix
- **`CLAUDE.md`**: This file - guidance for Claude Code
- **`README.md`**: Project documentation

## Development Workflow

1. **Local Testing**: Run `python -m http.server 8080`
2. **Access Interface**: Navigate to `http://localhost:8080/voice-agent.html?agent=hotel`
3. **Test Different Agents**: Change `?agent=clinic`, `?agent=restaurant`, etc.
4. **Test Voice**: Click "Start Call" - should create call and establish WebSocket
5. **Debug**: Open browser DevTools console and/or expand "Technical Information" panel
6. **Deploy**: Push to GitHub - Vercel auto-deploys
7. **Verify Production**: Test each URL: `/hotel`, `/clinic`, `/restaurant`, etc.

## API Key & Security

- API key is stored server-side in `api/ultravox.js` (secure)
- Never exposed to browser/client
- Agent IDs are public (safe to expose)
- For production: Consider using Vercel environment variables instead of hardcoding
