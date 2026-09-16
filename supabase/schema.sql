-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Registrations Table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    team_size INT NOT NULL CHECK (team_size >= 2 AND team_size <= 4),
    registration_type VARCHAR(20) NOT NULL CHECK (registration_type IN ('FREE', 'PAID')),
    mulearn_eligible BOOLEAN NOT NULL DEFAULT FALSE,
    karma_eligible BOOLEAN NOT NULL DEFAULT FALSE,
    domain VARCHAR(100) NOT NULL,
    payment_transaction_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    member_number INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    college VARCHAR(255) NOT NULL,
    experience_level VARCHAR(50) NOT NULL,
    muid VARCHAR(255),
    UNIQUE(registration_id, email),
    UNIQUE(registration_id, member_number)
);

-- Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon (we'll rely on server action for validation)
CREATE POLICY "Allow anonymous inserts for registrations" ON registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts for team_members" ON team_members FOR INSERT TO anon WITH CHECK (true);

-- Only allow selects if authenticated (for admin dashboard, assuming anon for public submission)
-- In a real prod setup with simple password auth, we might just use the service_role key to bypass RLS in the server actions to read data for admin dashboard.
