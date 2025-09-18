# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ClarksvilleTN.AI is a React-based website showcasing Clarksville, Tennessee's transformation into a cloud technology and AI innovation center. The site promotes the "Clarksville on the Cloud" initiative and features success stories from local businesses.

## Essential Commands

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint the codebase
npm run lint

# TypeScript type checking (runs automatically with build)
tsc -b
```

## Architecture & Code Structure

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Routing**: React Router v6 (BrowserRouter)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx + tailwind-merge for className management

### Key Architectural Patterns

1. **Component Organization**:
   - `components/layout/` - Page structure components (Header, Footer, Layout wrapper)
   - `components/sections/` - Reusable page sections (Hero, Features, CTA)
   - `components/ui/` - Atomic UI components with variant-based styling

2. **Routing Structure**:
   - All routes use a shared `<Layout/>` wrapper
   - Routes defined in `App.tsx` using nested route pattern
   - Pages in `src/pages/` directory

3. **Styling Approach**:
   - Custom Tailwind configuration with brand colors and typography
   - Utility-first CSS with custom design tokens
   - `cn()` utility function for conditional class merging (src/utils/cn.ts)
   - Component variants handled through props (see Button.tsx pattern)

4. **Type System**:
   - TypeScript interfaces in `src/types/index.ts`
   - Component props typed inline or as interfaces
   - Data models (e.g., Company) with optional nested structures

### Design System

**Brand Colors** (defined in tailwind.config.js):
- `river-blue`: #1e3a5f (Primary)
- `sunset-copper`: #b87333 (Accent)
- `fort-green`: #2d5016 (Supporting)
- `cloud-white`: #f8f9fa (Backgrounds)
- `tech-silver`: #e9ecef (Secondary backgrounds)

**Typography**:
- Headers: `font-serif` (Playfair Display)
- Body: `font-sans` (Inter)

### AWS Amplify Deployment

The project is configured for AWS Amplify deployment:
- Build configuration in `amplify.yml`
- Uses Node.js 20 (via nvm)
- Build output directory: `dist/`
- Automatic CI/CD from main branch

### Data Management

Static data is stored in `src/data/` as TypeScript modules. The `companies.ts` file contains showcase company information with optional case study details.

## Development Patterns to Follow

1. **Component Creation**: Follow existing patterns in `src/components/ui/Button.tsx` for variant-based components
2. **Routing**: Add new routes in `App.tsx` and create corresponding page components in `src/pages/`
3. **Styling**: Use Tailwind utility classes with custom design tokens; avoid inline styles
4. **Type Safety**: Define interfaces for complex data structures and component props
5. **Navigation**: Use React Router's `Link` component or the custom Button component with `href` prop