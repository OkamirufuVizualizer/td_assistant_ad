# Admin Dashboard

A modern admin dashboard built with React, TypeScript, and Supabase.

## Features

- 🌙 Dark/Light mode
- 🔒 Secure authentication
- 📝 Content management for:
  - School courses
  - Inspiration projects
  - Techniques
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time updates
- 📱 Responsive design

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/admin-dashboard.git
   cd admin-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then fill in your Supabase credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Setup

Make sure to set up the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Database Setup

Run the SQL scripts in the `src/sql` directory to set up your database:

1. `setup.sql` - Creates the admin table and security policies
2. `add-admin.sql` - Adds the initial admin user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.