# Nextify - Spotify Web Client

A modern Spotify web application built with Next.js, React, and the Spotify Web API.

## Features

- 🎵 Search for artists
- 📀 Browse artist albums
- 🎧 Preview album tracks
- 👤 View user profile and playlists
- 🔐 Secure OAuth authentication with Spotify

## Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Spotify Developer Account

## Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd next-spotify
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Spotify API credentials**

   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new application
   - Add `http://localhost:8080/spotify` to the Redirect URIs
   - Copy your Client ID and Client Secret

4. **Create environment file**

```bash
cp .env.example .env
```

Edit `.env` and add your Spotify credentials:

```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
NODE_ENV=development
PORT=8080
BASE_URL=http://localhost:8080
```

## Running the Application

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm run build
npm start
```

The application will be available at `http://localhost:8080`

## Technologies Used

- **Next.js 14** - React framework for server-side rendering
- **React 18** - UI library
- **Express** - Node.js web server
- **React Player** - Audio preview player
- **Bootstrap 5** - CSS framework
- **Spotify Web API** - Music data and authentication

## Security Improvements

- ✅ Environment variables for sensitive data
- ✅ Proper error handling for API calls
- ✅ Token validation and checks
- ✅ Updated dependencies to latest versions
- ✅ ESLint for code quality

## Project Structure

```
├── api/              # API utility functions
├── components/       # Reusable React components
├── pages/            # Next.js pages and routes
├── .env.example      # Environment variables template
├── .eslintrc.json    # ESLint configuration
├── server.js         # Express server configuration
└── package.json      # Project dependencies
```

## License

ISC