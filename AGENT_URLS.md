# TalkaFlow Voice AI Agent URLs

## Available Voice Agents

Each agent has a dedicated URL for easy embedding in your Wix website:

### 1. Hotel Guest Services
- **URL**: https://talkaflow-testlines.vercel.app/hotel
- **Agent**: DoubleTree Auckland Karaka
- **Use Case**: Hotel concierge services, room service, housekeeping

### 2. GP Clinic Reception
- **URL**: https://talkaflow-testlines.vercel.app/clinic
- **Agent**: Medical Clinic
- **Use Case**: Medical appointment booking, clinic inquiries

### 3. After-Sales Support
- **URL**: https://talkaflow-testlines.vercel.app/aftersales
- **Agent**: Powerbay Support
- **Use Case**: Product support, returns, technical assistance

### 4. Restaurant Reservations
- **URL**: https://talkaflow-testlines.vercel.app/restaurant
- **Agent**: Restaurant
- **Use Case**: Table bookings, menu inquiries, dining reservations

### 5. Hair Studio Booking
- **URL**: https://talkaflow-testlines.vercel.app/hairstudio
- **Agent**: L'Artisan Men's Hair Studio
- **Use Case**: Haircut appointments, salon services

### 6. HEPA Maintenance Support
- **URL**: https://talkaflow-testlines.vercel.app/hepa
- **Agent**: HEPA Maintenance
- **Use Case**: Technical support, maintenance scheduling

### 7. Dental Specialists
- **URL**: https://talkaflow-testlines.vercel.app/dental
- **Agent**: Dental Specialists
- **Use Case**: Dental appointment booking, emergency dental care

### 8. Superclinic Reception
- **URL**: https://talkaflow-testlines.vercel.app/superclinic
- **Agent**: St Germain Superclinic
- **Use Case**: Medical appointment booking, clinic inquiries

### 9. Hotel Booking (Little Hotelier)
- **URL**: https://talkaflow-testlines.vercel.app/littlehotelier
- **Agent**: Arkana Motel (Little Hotelier)
- **Use Case**: Room booking, availability checking, property info
- **Note**: Requires local `web_server.py` + ngrok running for tool endpoints

## How to Embed in Wix

### Option 1: Pop-up Lightbox (Recommended)

1. In Wix Editor, add a **Button** element
2. Click the button → **Link Settings** → **Lightbox**
3. Choose "Add Lightbox" → **Blank Lightbox**
4. Add an **iFrame** element to the lightbox
5. Set iFrame source to the agent URL (e.g., `https://talkaflow-testlines.vercel.app/hotel`)
6. Adjust lightbox size (recommended: 800x600 or larger)

### Option 2: Direct Link

Simply link any button/text to the agent URL. Opens in new tab.

### Option 3: Embedded iFrame

Add an iFrame element directly to your page and set the source to the agent URL.

## Customization

To modify agent configurations, edit `/agents-config.json`:
- `name`: Display name
- `title`: Subtitle description
- `description`: Longer description
- `icon`: FontAwesome icon class
- `suggestions`: Example questions shown to users
