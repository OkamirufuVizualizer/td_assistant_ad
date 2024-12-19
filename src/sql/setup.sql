-- Create admin_dash table with proper structure and constraints
CREATE TABLE IF NOT EXISTS public.admin_dash (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_admin_dash_updated_at
    BEFORE UPDATE ON public.admin_dash
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.admin_dash ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_dash table
CREATE POLICY "Allow authenticated users to read admin_dash"
ON public.admin_dash
FOR SELECT
TO authenticated
USING (auth.jwt()->>'email' = email);

CREATE POLICY "Allow admins to update their own data"
ON public.admin_dash
FOR UPDATE
TO authenticated
USING (auth.jwt()->>'email' = email)
WITH CHECK (auth.jwt()->>'email' = email);

-- Insert a default admin user (replace with your email)
INSERT INTO public.admin_dash (email, role)
VALUES ('admin@example.com', 'admin')
ON CONFLICT (email) DO NOTHING;