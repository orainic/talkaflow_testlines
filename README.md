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
- ✅ **TalkaFlow Branding** - Logo and custom styling
- ✅ **User Speech Display** - Shows both user and AI messages
- ✅ **Serverless API Proxy** - Bypasses CORS restrictions
- ✅ **Production Deployment** - Hosted on Vercel

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
```

## 📁 Key Files

- **`voice-agent.html`** - Main dynamic voice interface (supports all agents)
- **`agents-config.json`** - Agent configurations (names, IDs, icons, suggestions)
- **`api/ultravox.js`** - Serverless API proxy for Ultravox calls
- **`vercel.json`** - Deployment config with URL routing
- **`talkaFlow_logo_only.png`** - TalkaFlow branding logo

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

## 🔐 Security

- API key stored server-side in `api/ultravox.js` (not exposed to clients)
- CORS properly configured for cross-origin requests
- Agent IDs are public (safe to expose)

## 📚 Documentation

- **`AGENT_URLS.md`** - Detailed guide for Wix embedding
- **`CLAUDE.md`** - Technical documentation for developers

---

**Live Demo:** https://talkaflow-testlines.vercel.app/

**Repository:** https://github.com/orainic/talkaflow_testlines

*Powered by TalkaFlow & Ultravox AI - October 2025*
