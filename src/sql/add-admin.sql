-- Insert the admin user with the specified email
INSERT INTO public.admin_dash (email, role)
VALUES ('bioxrabbit.social@gmail.com', 'admin')
ON CONFLICT (email) 
DO UPDATE SET 
  role = 'admin',
  updated_at = TIMEZONE('utc'::text, NOW());