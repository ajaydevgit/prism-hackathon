# PRISM: THROUGH THE DIMENSIONS — HACKATHON '26

This is a production-quality, premium hackathon registration platform built with Next.js (App Router), Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Premium UI:** Dark theme with subtle gradients, glassmorphism, and smooth animations using Framer Motion.
- **Dynamic Multi-step Registration:** Conditional routing based on team eligibility (MuLearn and Karma).
- **Server-Side Validation:** Zod and Next.js Server Actions ensure the data and registration type (Free vs Paid) is secure and strictly verified on the backend.
- **Admin Dashboard:** A protected dashboard to view stats and manage registrations.

## Prerequisites

1. Node.js 18+
2. A Supabase project (for the PostgreSQL database)

## Setup Instructions

### 1. Database Setup

1. Create a new project in [Supabase](https://supabase.com).
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it to create the necessary tables and Row Level Security policies.

### 2. Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Dashboard Password (Default is admin123 if not set)
ADMIN_PASSWORD=your_secure_admin_password
```

### 3. Installation

Install the dependencies:

```bash
npm install
```

### 4. Running the Development Server

Start the server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Navigation

- **Landing Page:** `/`
- **Registration Form:** `/register`
- **Admin Dashboard:** `/admin` (Password protected, default: `admin123`)

## Testing the Logic Paths

As required, you can test the following paths in the registration form:

- **Path A:** 2 members → MuLearn YES → Karma YES → Enter MUIDs → Domain → FREE Registration
- **Path B:** 3 members → MuLearn YES → Karma NO → Domain → Paid (₹200) Registration
- **Path C:** 4 members → MuLearn NO → Domain → Paid (₹200) Registration

The server action independently verifies the FREE/PAID logic to ensure frontend values aren't manipulated.
