# Security Configuration

## ⚠️ IMPORTANT: API Key Setup

The Ultravox API key is **NOT** stored in this repository for security reasons. You must configure it as an environment variable in Vercel.

## Setting Up Environment Variables in Vercel

### Step 1: Get Your API Key
- Log in to your Ultravox account
- Navigate to API settings
- Copy your API key (format: `Sid4RoQc.XXXXXXXXXXXXXXX`)

### Step 2: Add to Vercel
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select the `talkaflow_testlines` project
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - **Key**: `ULTRAVOX_API_KEY`
   - **Value**: Your Ultravox API key
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Click the three dots (**...**) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Verifying the Setup

After redeploying, test a voice agent:
- If it works → ✅ API key configured correctly
- If you get error "API key not configured" → ❌ Check environment variable setup

## Security Best Practices

✅ **DO:**
- Store API keys in Vercel environment variables
- Use different API keys for dev/staging/production if available
- Rotate API keys periodically
- Monitor API usage in Ultravox dashboard

❌ **DON'T:**
- Commit API keys to GitHub
- Share API keys publicly
- Hardcode keys in source code
- Use production keys in development

## Current API Key (Hidden)

The API key was previously: `Sid4RoQc.3uuN493Jc06KqobeqBZaD5YNedjXQnXF`

**⚠️ SECURITY NOTICE:** This key has been removed from the codebase. If you're seeing this message, you should:
1. **Rotate the API key** in Ultravox dashboard (generate a new one)
2. Update the environment variable in Vercel with the new key
3. Delete the old key from Ultravox

## For Local Development

Create a `.env` file in the project root (not committed to git):

```bash
ULTRAVOX_API_KEY=your_api_key_here
```

Note: `.env` is already in `.gitignore` to prevent accidental commits.
