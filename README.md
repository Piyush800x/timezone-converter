# TimeZonesNow - World Clock & Time Zone Converter

![TimeZonesNow Screenshot](https://timezone.piyushpaul.com/og-image.jpg)

A modern, responsive time zone converter and world clock application built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🌍 Real-time world clock with multiple time zones
- 🎨 Theme customization (light/dark modes with color variants)
- 🖼️ Dynamic wallpaper support
- 🔍 Search functionality for cities worldwide
- ⏱️ 12h/24h time format toggle
- 📱 Fully responsive design
- 🚀 Optimized performance and SEO

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: Custom built with Radix UI primitives
- **Fonts**: [Bricolage Grotesque](https://github.com/atelier-anchor/bricolage-grotesque) & [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/timezone-converter.git
   cd timezone-converter
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js app router files
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── CityTimeCard.tsx  # City time display cards
│   ├── MainClock.tsx     # Main clock component
│   ├── Navbar.tsx        # Navigation bar
│   └── ui/               # UI primitives
├── data/                 # Application data
│   └── mockData.ts       # Time zones and theme configurations
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=<your-site-url>
```

### Theming

The app supports multiple themes which can be configured in `src/data/mockData.ts`:

```typescript
export const themes = {
  light: {
    default: { /* theme config */ },
    orange: { /* theme config */ },
    blue: { /* theme config */ }
  },
  dark: {
    default: { /* theme config */ },
    purple: { /* theme config */ },
    green: { /* theme config */ }
  }
};
```

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/):

1. Push your code to a GitHub repository
2. Create a new project in Vercel and import your repository
3. Vercel will automatically detect Next.js and configure the deployment

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Piyush Paul - [@LinkedIn](www.linkedin.com/in/piyushpaul) - business@piyushpaul.com

Project Live Link: [https://timezone.piyushpaul.com/](https://timezone.piyushpaul.com/)