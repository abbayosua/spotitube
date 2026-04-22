<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" width="120" alt="YouTube Logo" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width="100" alt="Spotify Logo" />
</p>

<h1 align="center">SpotiTube</h1>

<p align="center">
  A modern YouTube video search and streaming web application built with Next.js
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-endpoints">API</a>
</p>

---

## Features

- **Video Search** — Search for any video on YouTube with instant results
- **Video Details** — View video metadata including title, channel, and description
- **Video Player** — Embedded YouTube player for seamless playback
- **Responsive Design** — Works beautifully on desktop, tablet, and mobile
- **Dark Mode** — Built-in dark mode support via Tailwind CSS

---

## Tech Stack

| Technology | Description |
|------------|-------------|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [React 19](https://react.dev) | UI library |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS |
| [YouTube Search API](https://www.npmjs.com/package/youtube-search-api) | YouTube data fetching |
| [TypeScript](https://www.typescriptlang.org) | Type safety |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/abbayosua/spotitube.git
cd spotitube

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:4890](http://localhost:4890) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search?q={query}&limit={limit}` | Search videos by keyword |
| `GET` | `/api/video?id={videoId}` | Get video details by ID |

---

## Project Structure

```
spotitube/
├── src/
│   └── app/
│       ├── api/
│       │   ├── search/route.ts    # Search API endpoint
│       │   └── video/route.ts     # Video details endpoint
│       ├── video/[id]/
│       │   └── page.tsx           # Video detail page
│       ├── globals.css            # Global styles
│       ├── layout.tsx             # Root layout
│       └── page.tsx               # Home/Search page
├── public/                       # Static assets
├── package.json
└── README.md
```

---

## License

MIT License