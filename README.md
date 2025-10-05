# TalkaFlow Multi-Agent Voice AI System 🎙️

## 🌟 What This Is

A **production-ready multi-agent voice AI system** powered by Ultravox, providing browser-based voice interfaces for 6 different business use cases. Each agent has its own dedicated URL for easy embedding in websites.

## 🔗 Live Voice Agent Hotlines

Test each voice agent by clicking the links below:

### 1. 🏨 Hotel Guest Services
**URL:** https://talkaflow-testlines.vercel.app/hotel

**Agent:** DoubleTree Auckland Karaka
**Use Case:** Hotel concierge services, room service, housekeeping
**Try Saying:**
- "I need room service"
- "What amenities do you have?"
- "I need housekeeping"
- "What's nearby to visit?"

---

### 2. 🏥 GP Clinic Reception
**URL:** https://talkaflow-testlines.vercel.app/clinic

**Agent:** Medical Clinic
**Use Case:** Medical appointment booking, clinic inquiries
**Try Saying:**
- "I'd like to book an appointment"
- "What are your opening hours?"
- "I need to see a doctor"
- "Do you accept walk-ins?"

---

### 3. 🛠️ After-Sales Support
**URL:** https://talkaflow-testlines.vercel.app/aftersales

**Agent:** Powerbay Support
**Use Case:** Product support, returns, technical assistance
**Try Saying:**
- "I need help with my product"
- "How do I return an item?"
- "My product isn't working"
- "What's your warranty policy?"

---

### 4. 🍽️ Restaurant Reservations
**URL:** https://talkaflow-testlines.vercel.app/restaurant

**Agent:** Restaurant
**Use Case:** Table bookings, menu inquiries, dining reservations
**Try Saying:**
- "I'd like to make a reservation"
- "What's on the menu today?"
- "Do you have vegetarian options?"
- "Can I book a table for 6 people?"

---

### 5. ✂️ Hair Studio Booking
**URL:** https://talkaflow-testlines.vercel.app/hairstudio

**Agent:** L'Artisan Men's Hair Studio
**Use Case:** Haircut appointments, salon services
**Try Saying:**
- "I'd like to book a haircut"
- "What services do you offer?"
- "How much is a haircut?"
- "Can I see a specific stylist?"

---

### 6. 🔧 HEPA Maintenance Support
**URL:** https://talkaflow-testlines.vercel.app/hepa

**Agent:** HEPA Maintenance
**Use Case:** Technical support, maintenance scheduling
**Try Saying:**
- "I need maintenance scheduled"
- "My HEPA filter needs replacing"
- "System troubleshooting help"
- "How often should filters be changed?"

---

### 7. 🦷 Dental Specialists
**URL:** https://talkaflow-testlines.vercel.app/dental

**Agent:** Dental Specialists
**Use Case:** Dental appointment booking, emergency dental care
**Try Saying:**
- "I'd like to book a dental appointment"
- "I have a toothache"
- "I need a dental checkup"
- "Do you offer emergency appointments?"

---

## ✅ What's Working

- ✅ **7 Different Voice Agents** - Each with unique configurations
- ✅ **Clean URLs** - Easy to share and embed (`/hotel`, `/clinic`, etc.)
- ✅ **Real-time Voice Conversations** - Powered by Ultravox SDK
- ✅ **TalkaFlow Branding** - Logo, custom color scheme, and styling
- ✅ **Dark Mode Toggle** - User preference saved in localStorage
- ✅ **Home Navigation** - Clickable logo and home button linking to talkaflow.com (same tab navigation)
- ✅ **Prominent Status Indicator** - Large, visible status display on main screen (Disconnected, Listening, AI Speaking, etc.)
- ✅ **User Speech Display** - Shows both user and AI messages
- ✅ **Serverless API Proxy** - Bypasses CORS restrictions
- ✅ **Production Deployment** - Hosted on Vercel
- ✅ **Server-Side Call Logging** - Automatic log collection for debugging call issues
- ✅ **Log Viewer Dashboard** - Web-based interface to view and analyze all call logs

## 🎨 UI Features

### TalkaFlow Brand Colors
- **Primary Blue:** `#116dff` - Main accent color, buttons, icons
- **Success Green:** `#008250` - Start call button, connected status
- **Alert Red:** `#df3131` - End call button, error states

### Dark Mode
- Toggle button in bottom-left corner (moon/sun icon)
- Automatic preference saving via localStorage
- Smooth transitions between light and dark themes
- Optimized contrast for readability

### Navigation
- **Logo:** Clickable link to https://www.talkaflow.com
- **Home Button:** Circular icon in header for easy navigation
- Both navigate in the same tab to return to the TalkaFlow homepage

### Status Indicator
- **Prominent Display:** Moved to main screen for better visibility
- **Real-time Updates:** Shows connection state (Disconnected, Connecting, Listening, AI Speaking)
- **Visual Feedback:** Color-coded status dot with descriptive text

## 📊 Call Logging & Monitoring

### Log Viewer Dashboard
**URL:** https://talkaflow-testlines.vercel.app/logs

Monitor and diagnose call issues in real-time with our comprehensive logging system:

### Features
- **Automatic Log Collection** - All client calls automatically send logs to the server
- **Real-time Monitoring** - View logs as they come in (auto-refresh every 30s)
- **Session Grouping** - Logs organized by unique session ID for easy tracking
- **Advanced Filtering:**
  - Filter by session ID
  - Filter by agent type (hotel, clinic, restaurant, etc.)
  - Filter by log type (errors, success, info)
- **Export Capability** - Download filtered logs as text file for analysis
- **Client Privacy** - Technology stack hidden (rebranded to "talkaflow-uvx")

### What Gets Logged
- **Call Events:** Session start, connection, disconnect, duration
- **Errors:** Connection failures, microphone issues, network problems
- **Network Info:** Client IP, browser type, connection type
- **Timestamps:** Server and client timestamps in ISO format
- **Disconnect Reasons:** Detailed information about why calls dropped

### Storage Options
1. **Default:** Logs visible in Vercel Function Logs (free)
2. **Upgrade:** Install `@vercel/kv` for persistent storage with web viewer

### Client-Side Features
Users can also download their own session logs:
- Click the debug icon (bug button) in bottom-right
- Click "Download Logs" to export session data
- Click "Clear Logs" to reset stored logs

## 🔧 Technical Architecture

```
User Browser → /hotel → voice-agent.html (loads hotel config)
                 ↓
            Agent Config (agents-config.json)
                 ↓
            /api/ultravox (serverless proxy)
                 ↓
            Ultravox API (creates call)
                 ↓
            WebSocket Connection (real-time voice)
                 ↓
            User ↔ AI Voice Conversation
                 ↓
        Call Logs → /api/submit-log (serverless logging)
                 ↓
        Vercel KV Storage / Function Logs
                 ↓
        Admin → /logs → view-logs.html (log viewer dashboard)
```

## 📁 Key Files

### Core Interface
- **`voice-agent.html`** - Main dynamic voice interface (supports all agents)
- **`agents-config.json`** - Agent configurations (names, IDs, icons, suggestions)
- **`talkaFlow_logo_only.png`** - TalkaFlow branding logo

### API Endpoints
- **`api/ultravox.js`** - Serverless API proxy for Ultravox calls
- **`api/submit-log.js`** - Receives and stores call logs from clients
- **`api/logs.js`** - Retrieves stored logs for viewing

### Logging & Monitoring
- **`view-logs.html`** - Web-based log viewer dashboard (accessible at `/logs`)

### Configuration
- **`vercel.json`** - Deployment config with URL routing and CORS

## 🚀 How to Embed in Your Website

### Option 1: Lightbox/Modal (Recommended)
```html
<button onclick="openVoiceAgent()">Talk to Support</button>

<script>
function openVoiceAgent() {
  window.open('https://talkaflow-testlines.vercel.app/aftersales',
    'Voice Agent',
    'width=800,height=600'
  );
}
</script>
```

### Option 2: iFrame Embed
```html
<iframe
  src="https://talkaflow-testlines.vercel.app/clinic"
  width="800"
  height="600"
  frameborder="0"
  allow="microphone">
</iframe>
```

### Option 3: Direct Link
```html
<a href="https://talkaflow-testlines.vercel.app/restaurant" target="_blank">
  Call Restaurant AI
</a>
```

## 📝 Adding New Agents

1. **Update `agents-config.json`** - Add new agent configuration
2. **Update `vercel.json`** - Add new route pattern
3. **Deploy** - Push to GitHub, Vercel auto-deploys

## 🔍 Troubleshooting Call Drop-Offs

When clients report that calls are dropping:

1. **Access the Log Viewer:** Go to https://talkaflow-testlines.vercel.app/logs
2. **Find the Session:**
   - Ask client when the call happened
   - Use time-based filtering or search for their session
   - Each call has a unique session ID
3. **Analyze the Logs:**
   - Look for "CALL DISCONNECTED" events
   - Check call duration (short calls <10s indicate timeout/mic issues)
   - Review disconnect reasons and network status
   - Check for error messages before disconnect
4. **Common Issues:**
   - **Short calls:** Usually microphone permission or agent timeout
   - **Network errors:** Check client's connection type and stability
   - **WebSocket errors:** May indicate firewall or network restrictions

### Enable Persistent Log Storage (Optional)

For better log retention and searchability:

```bash
# Install Vercel KV
npm install @vercel/kv

# Configure in Vercel Dashboard:
# 1. Go to your project → Storage → Create KV Database
# 2. Link to your project
# 3. Redeploy
```

With Vercel KV enabled, logs are stored persistently and accessible via the web viewer.

## 🔐 Security & Privacy

- **API Key Protection:** API key stored server-side in `api/ultravox.js` (not exposed to clients)
- **CORS Configuration:** Properly configured for cross-origin requests
- **Public Agent IDs:** Agent IDs are safe to expose (no sensitive data)
- **Technology Obfuscation:** Underlying technology (Ultravox) rebranded as "talkaflow-uvx" in client-facing logs
- **Client Privacy:** IP addresses and browser info logged only for debugging purposes
- **Log Access Control:** Log viewer should be protected (add authentication if needed)

## 📚 Documentation

- **`AGENT_URLS.md`** - Detailed guide for Wix embedding
- **`CLAUDE.md`** - Technical documentation for developers

---

**Live Demo:** https://talkaflow-testlines.vercel.app/

**Repository:** https://github.com/orainic/talkaflow_testlines

*Powered by TalkaFlow & Ultravox AI - October 2025*
