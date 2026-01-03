# Samudra Art Center - Sacred Sculptures Online

A modern e-commerce platform for handcrafted Buddha statues and sculptures from Sri Lanka.

## Project Overview

Samudra Art Center is a Next.js-based e-commerce website showcasing premium handcrafted Buddha statues and custom sculptures. Built with modern web technologies for a seamless shopping experience.

## Technologies Used

This project is built with:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React** - UI library
- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/bun)
- Git

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd sacred-sculptures-online

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop pages
│   ├── product/           # Product detail pages
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── layout/       # Layout components
│   │   ├── home/         # Home page components
│   │   ├── shop/         # Shop components
│   │   ├── payment/      # Payment components
│   │   └── ui/           # UI components
│   ├── data/             # Data files
│   └── lib/              # Utility functions
└── public/               # Static assets
```

## Features

- 🛍️ Product catalog with filtering
- 💳 Advanced payment modal with 50% advance payment option
- 📱 Fully responsive design
- 🎨 Modern UI with animations
- 🔍 Product search and filtering
- 📧 Contact forms
- 🖼️ Gallery showcase
- 📦 Custom order requests

## Deployment

Build the project for production:

```sh
npm run build
npm start
```

For deployment platforms like Vercel, Netlify, or others, follow their respective deployment guides.

## License

© 2024 Samudra Art Center. All rights reserved.
