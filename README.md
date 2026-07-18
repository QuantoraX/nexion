# Nexion Solutions — Modern Digital Agency Website

Nexion Solutions is a premium, remote-first software development and digital product engineering agency based in Colombo, Sri Lanka. This repository houses the codebase for our official professional company website, engineered for lightning-fast loading speeds, responsiveness, and premium modern aesthetics.

## ✨ Key Features & Experience

- **Visual Continuity & Premium Dark Theme:** Incorporates high-resolution background overlays, dark-themed canvas backgrounds, and consistent typography using variable-weight Google Fonts.
- **Dynamic Case Studies & Portfolio:** Categorized project filters (SaaS, Mobile App, E-Commerce, AI / ML) mapped to full-length detailed case studies highlighting client challenges, technical specifications, and key features delivered.
- **Nexion Insights Blog:** A clean, modern typography-based article system with custom neon-glowing border hover states mapped to categories (Engineering, Design, Productivity, Startup) instead of loading heavy visual imagery.
- **Budget-Interactive Contact Form:** A conversion-optimized layout featuring custom project budget range selection, requirements checkboxes, and animated glow inputs.
- **Smooth Momentum Scrolling:** Implemented using Lenis Scroll to achieve comfortable reading flows.
- **Fluid Layout Animations:** Powered by Framer Motion container transitions and micro-interactions.

---

## 🛠️ Technology Stack

- **Core Framework:** React 18 & Vite (TypeScript)
- **Styling Engine:** Tailwind CSS v4
- **Animation Suite:** Framer Motion (v11)
- **Scroll Engineering:** Lenis (Smooth scroll wrapper)
- **Routing Engine:** React Router DOM (v6)
- **Icon Assets:** Lucide React

---

## 📂 Codebase Directory Layout

```text
nexion/
├── client/
│   ├── public/              # Static assets (Favicons, background patterns)
│   ├── src/
│   │   ├── assets/          # Compressed brand icons and illustration assets
│   │   ├── components/      # Shared layout UI (Navbar, Footer, Smooth Scroll)
│   │   ├── data/            # Localized static data schemas (Services, Portfolio, Blog)
│   │   ├── pages/           # Page views (Home, About, Services, Portfolio, Blog, Contact)
│   │   ├── sections/        # Modular page layout sections
│   │   ├── App.tsx          # Main React router routes registration
│   │   └── main.tsx         # Application entry point
│   ├── vercel.json          # SPA rewrite rules for routing resolution
│   ├── package.json         # Dependency configuration
│   └── tsconfig.json        # TypeScript configuration settings
└── README.md                # Project documentation
```

---

## 🚀 Local Development Setup

To run the application locally on your machine, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) installed on your system.

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd client
   ```

2. Install the package dependencies:
   ```bash
   npm install
   ```

3. Run the hot-reloading development server:
   ```bash
   npm run dev
   ```
   The local environment will boot up on [http://localhost:5173](http://localhost:5173).

### Building for Production

To compile a highly optimized build bundle for hosting deployments:
```bash
npm run build
```
The production bundle will be generated under the `dist/` directory.

---

## 🌐 Production Deployment

The project is pre-configured for hosting on [Vercel](https://vercel.com). The `client/vercel.json` file handles rewrite rules to enable direct access to nested paths (e.g., `/portfolio`, `/blog`, `/services`) without throwing 404 errors on browser reloads.

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```
When connecting your Git repository to Vercel, set the **Root Directory** setting to `client` and keep the default build commands.
