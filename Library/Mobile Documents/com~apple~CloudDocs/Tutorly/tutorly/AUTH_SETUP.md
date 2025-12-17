# Add these to your .env.local file

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# Google OAuth (Get from: https://console.cloud.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth (Get from: https://developer.apple.com/)
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret

## Setup Instructions

### 1. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Copy the output and paste as NEXTAUTH_SECRET

### 2. Google OAuth Setup
1. Go to https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret

### 3. Apple OAuth Setup
1. Go to https://developer.apple.com/account/resources/identifiers/list
2. Create a new identifier → App IDs
3. Enable "Sign in with Apple"
4. Create Services ID
5. Configure redirect URL: `http://localhost:3000/api/auth/callback/apple`
6. Generate and download private key
7. Create JWT token for client secret

### 4. Production Setup
For production, update redirect URIs to your production domain:
- Google: `https://yourdomain.com/api/auth/callback/google`
- Apple: `https://yourdomain.com/api/auth/callback/apple`
