# AI Mock Interview Platform - Setup Guide

## Dependencies Overview

This project uses the following key dependencies:

### Authentication & Database
- **Clerk** - User authentication and management
- **Convex** - Real-time database and backend functions
- **Arcjet** - Rate limiting and security

### File Upload & AI
- **ImageKit** - Resume file uploads and storage
- **N8N** - AI workflow automation for question generation

### UI & Styling
- **Next.js 15** - React framework
- **Tailwind CSS** - Styling framework
- **Radix UI** - Component library
- **Lucide React** - Icons

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment-url.convex.cloud
CONVEX_DEPLOY_KEY=your_convex_deploy_key_here

# Arcjet Rate Limiting
ARCJET_KEY=your_arcjet_key_here

# ImageKit File Upload
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key_here
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id

# N8N Webhook URLs
N8N_WEBHOOK_URL=http://localhost:5678/webhook/generate-interview-question
N8N_FEEDBACK_WEBHOOK_URL=http://localhost:5678/webhook/generate-feedback

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Instructions

### 1. Clerk Authentication Setup
1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable key and secret key
4. Add them to your `.env.local` file

### 2. Convex Database Setup
1. Install Convex CLI: `npm install -g convex`
2. Run `convex dev` to initialize your project
3. Copy the deployment URL and deploy key
4. Add them to your `.env.local` file

### 3. Arcjet Rate Limiting Setup
1. Go to [arcjet.com](https://arcjet.com) and create an account
2. Create a new project
3. Copy the API key
4. Add it to your `.env.local` file

### 4. ImageKit File Upload Setup
1. Go to [imagekit.io](https://imagekit.io) and create an account
2. Create a new project
3. Copy the public key, private key, and URL endpoint
4. Add them to your `.env.local` file

### 5. N8N Workflow Setup
1. Install N8N: `npm install -g n8n`
2. Start N8N: `n8n start`
3. Create webhooks for:
   - Interview question generation
   - Feedback generation
4. Update the webhook URLs in your `.env.local` file

## Installation Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
my-app/
├── app/
│   ├── _Components/          # Reusable components
│   ├── (routes)/            # Route groups
│   ├── api/                  # API routes
│   └── globals.css          # Global styles
├── components/               # UI components
├── convex/                   # Database functions
├── lib/                      # Utilities
├── public/                   # Static assets
└── utils/                    # Helper functions
```

## Key Features Implemented

### Authentication
- ✅ Clerk integration for user management
- ✅ Protected routes and middleware
- ✅ User context and details

### Database
- ✅ Convex real-time database
- ✅ User table with subscription data
- ✅ Interview sessions table
- ✅ Payment and reminder tables

### AI Integration
- ✅ N8N webhook integration
- ✅ Question generation from resume/job description
- ✅ Feedback generation from interview data
- ✅ Face detection and analysis

### Payment System
- ✅ Subscription plans (Free, Monthly ₹4, Yearly ₹10)
- ✅ Payment methods (UPI, QR, Card)
- ✅ Usage tracking and limits
- ✅ Reminder system

### Mobile App
- ✅ Download popup
- ✅ Mobile app showcase page
- ✅ QR code integration
- ✅ App store links

### UI/UX
- ✅ Beautiful home page with animations
- ✅ Professional dashboard
- ✅ Interview interface with avatar
- ✅ Responsive design
- ✅ Glass morphism effects

## Troubleshooting

### Common Issues
1. **Environment variables not loading**: Make sure `.env.local` is in the root directory
2. **Convex connection issues**: Check your deployment URL and keys
3. **Clerk authentication errors**: Verify your publishable and secret keys
4. **ImageKit upload failures**: Check your ImageKit credentials
5. **N8N webhook errors**: Ensure N8N is running and webhooks are configured

### Development Tips
- Use `npm run dev` for development
- Check browser console for errors
- Verify all environment variables are set
- Test each integration separately
- Use Convex dashboard to monitor database
- Check N8N logs for webhook issues

## Production Deployment

1. Set up production environment variables
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure production URLs for webhooks
4. Set up monitoring and analytics
5. Test all features in production environment

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure all environment variables are correct
4. Test each service individually
5. Check the documentation for each service
