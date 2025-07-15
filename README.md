# ClarksvilleTN.AI - Cloud & AI Innovation Hub

A sophisticated website showcasing Clarksville, Tennessee's transformation into a cloud technology and AI innovation center. Built with modern web technologies to represent the city's tech-forward mindset while honoring its rich heritage.

## 🚀 Features

- **Modern Design**: Blends Clarksville's historic charm with cutting-edge technology aesthetics
- **Campaign Hub**: "Clarksville on the Cloud" initiative to showcase local business transformations
- **Success Stories**: Interactive showcase of local companies leveraging cloud and AI
- **Responsive**: Fully optimized for all devices
- **Performance**: Built with Vite for lightning-fast load times

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🎨 Design System

### Colors
- **River Blue**: `#1e3a5f` - Primary brand color representing the Cumberland River
- **Sunset Copper**: `#b87333` - Accent color for warmth and innovation
- **Fort Green**: `#2d5016` - Supporting color honoring Fort Campbell
- **Cloud White**: `#f8f9fa` - Clean backgrounds
- **Tech Silver**: `#e9ecef` - Secondary backgrounds

### Typography
- **Headers**: Playfair Display (serif) - Trustworthy and established
- **Body**: Inter (sans-serif) - Modern and readable

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AltivumInc-Admin/clarksvilletn-ai.git
cd clarksvilletn-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Deployment to AWS Amplify

### Prerequisites
- AWS Account
- Domain configured in Cloudflare (clarksvilletn.ai)

### Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **AWS Amplify Setup**:
   - Log into AWS Console
   - Navigate to AWS Amplify
   - Click "New app" > "Host web app"
   - Connect to GitHub repository
   - Select branch: `main`
   - Build settings will auto-detect Vite

3. **Configure Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Domain Setup**:
   - In Amplify Console, go to "Domain management"
   - Add domain: clarksvilletn.ai
   - Follow Cloudflare DNS configuration instructions
   - Set up SSL certificate

5. **Environment Variables** (if needed):
   ```
   VITE_API_URL=your-api-url
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/      # Header, Footer, Layout wrapper
│   ├── sections/    # Page sections (Hero, Features, CTA)
│   ├── ui/          # Reusable UI components
│   └── showcase/    # Showcase-specific components
├── pages/           # Route pages
├── data/            # Static data (companies, etc.)
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── App.tsx          # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Pages

1. **Home** - Hero section with campaign introduction
2. **Campaign** - "Clarksville on the Cloud" details
3. **Showcase** - Success stories from local businesses
4. **Services** - Cloud migration and AI integration offerings
5. **About** - Vision for Tennessee's first AI store
6. **Contact** - Get in touch for consultations

## 🤝 Contributing

This project represents Clarksville's tech community. Contributions that enhance the showcase of local businesses or improve the user experience are welcome.

## 📄 License

© 2025 ClarksvilleTN.AI. All rights reserved.

---

Built with ❤️ for Clarksville, Tennessee - Clarksville's Gateway to Cloud & AI Innovation