# 🥣✨ The Sommelier's Spoon: Cereal Tasting Experience

> *"Nostalgia. Distilled."*  
> A satirical yet sophisticated web application that treats cereal tasting with the reverence of fine wine appreciation. Where breakfast meets pretension in the most delightful way.

**Live Demo**: [View on GitHub](https://github.com/forbiddenlink/cereal-tasting)

---

## 🌟 Overview

The Sommelier's Spoon is a premium cereal tasting platform featuring a curated collection of **15 vintage breakfast cereals**, each with detailed tasting notes, vintage years, and expert milk pairing recommendations. Built as a portfolio project to demonstrate modern web development techniques with a "Noir-Nostalgia" aesthetic.

### The Experience

- 🏛️ **The Cellar** - Browse our exclusive collection of vintage cereals
- 🍷 **Pairing Guide** - Discover optimal cereal-milk synergies with interactive calculator
- 📚 **About** - Learn about our satirical sommeliers and process
- 📧 **Contact** - Get in touch with the sommelier team
- 🔒 **Privacy Policy** - Your data, our commitment

---

## ✨ Key Features

### 🎨 Premium "Noir-Nostalgia" Design System
- **Dark Luxury Aesthetic** - Deep void backgrounds with merlot and gold accents
- **Glassmorphism Effects** - Beautiful backdrop blur and transparency throughout
- **Custom Color Palette** - Void black, merlot burgundy, gold foil, neon slime, electric zap
- **Premium Typography** - Playfair Display serif paired with JetBrains Mono
- **Noise Texture** - Subtle grain overlay for vintage authenticity
- **Custom Scrollbar** - Themed scrollbar with gold accents

### 🥣 Curated Cereal Collection (15 Varieties)
- **Captain's Reserve '97** - Peanut Butter Terroir from the Suggary Isles
- **Count's Estate: Chocolate** - Transylvanian Chocolate Notes (1982 vintage)
- **Loop de Fruit: Neon Edition** - Citrus & Berry Fusion with holographic finish
- **Frosted Flakes: Tony's Private Reserve** - Corn Plains Terroir with motivational notes
- **Cinnamon Toast Crunch: Millennium Edition** - Y2K Valley Vintage with cinnamon swirls
- **Lucky Charms: Leprechaun's Revenge** - Enchanted Marshlands with magical consequences
- **Cocoa Puffs: Sonny's Descent** - Chocolate Quarries existential experience
- **Trix: Silly Rabbit Reserve** - Fruit Shape Factory geometric impossibilities
- **Honey Nut Cheerios: Bee's Last Stand** - Endangered Apiaries environmental notes
- **Grape-Nuts: The Forbidden Gravel** - Quarry of Despair (requires dental insurance)
- **Reese's Puffs: Breakfast Candy Legitimized** - Chocolate Peanut Butter Nexus
- **Cookie Crisp: The Cookie Heist Collection** - Cookie Jar Underworld criminal energy
- **Apple Jacks: The Flavor Paradox** - Non-Apple Orchards existential crisis
- **Fruity Pebbles: Bedrock's Finest** - Prehistoric Quarry rainbow sludge
- **Corn Pops: The Golden Sphere Vintage** - Spherical Corn Fields geometric perfection

### 🎯 Interactive Features
- **Milk Pairing Calculator** - Real-time synergy scoring with 4 milk varieties
- **Custom Milk Bottle Animation** - CSS-animated bottle that fills with selected milk
- **Smooth Animations** - Framer Motion powered interactions throughout
- **3D Card Effects** - Tilt and perspective transforms on hover
- **Staggered Grid Animations** - Cards enter with dramatic timing
- **Parallax Hero** - Immersive entrance to The Cellar
- **Active Navigation States** - Smooth underline animations

### 🎬 Premium Visual Details
- **Vintage Cereal Box Artwork** - 15 custom-generated boxes with wine label aesthetics
- **Glassmorphism Panels** - Heavy and light variants for depth
- **Dynamic Synergy Feedback** - Color-coded pairing results (Hazardous/Acceptable/Transcendent)
- **Responsive Layout** - Mobile-first design that scales beautifully

### 📊 Detailed Specifications
Each cereal includes:
- Vintage year (1978-2003)
- Region of origin (satirical terroir)
- Price (comedically inflated: $325-$2,100)
- Tasting notes (satirical yet detailed)
- Decay rate (seconds until soggy)
- Sugar content (grams per serving)
- Flavor profile (crunch/sweetness/nostalgia/particulate)
- Recommended milk pairing

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone git@github.com:forbiddenlink/cereal-tasting.git
cd cereal-tasting

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with improved hooks
- **TypeScript** - Full type safety throughout
- **Vite 7.3** - Lightning-fast build tool and dev server
- **Vanilla CSS** - Custom CSS with variables and utilities

### Animation & Motion
- **Framer Motion 12** - Production-ready animations
- **Custom spring physics** - Snappy, bouncy, and gentle variants
- **3D transforms** - Perspective and tilt effects
- **Motion values** - Real-time animation controls

### Styling Approach
- **CSS Custom Properties** for comprehensive color system
- **Glassmorphism** with backdrop-filter
- **Custom utility classes** for reusable patterns
- **Noise texture overlay** for vintage aesthetic
- **Custom scrollbar styling**

### Deployment
- **Vercel** - Optimized for serverless deployment
- **Static prerendering** - 7 routes prerendered for SEO

---

## 📁 Project Structure

```
cereal-tasting/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CerealCard.tsx       # 3D tilt card with vintage badge
│   │   ├── Footer.tsx           # Site footer
│   │   ├── MilkSelector.tsx     # Milk pairing selector
│   │   ├── Navbar.tsx           # Navigation with glassmorphism
│   │   └── PairingCard.tsx      # Synergy calculator with milk bottle
│   │
│   ├── pages/               # Route pages
│   │   ├── Home.tsx             # The Cellar with hero and collection
│   │   ├── PairingGuide.tsx     # Interactive pairing tool
│   │   ├── About.tsx            # Story and philosophy
│   │   ├── Contact.tsx          # Contact form
│   │   ├── PrivacyPolicy.tsx    # Privacy policy
│   │   └── NotFound.tsx         # 404 page
│   │
│   ├── data/                # Data and types
│   │   ├── mockData.ts          # 15 cereals with full specs
│   │   └── milks.ts             # 4 milk varieties
│   │
│   ├── styles/              # Global styles
│   │   └── index.css            # Complete design system
│   │
│   └── App.tsx              # Main app with routing
│
├── public/                  # Static assets
│   └── cereals/             # 15 vintage cereal box images
│
├── scripts/                 # Build scripts
│   └── prerender-routes.mjs # Static route prerendering
│
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── vercel.json             # Vercel deployment config
└── tsconfig.json           # TypeScript config
```

---

## 🎨 Design System

### Color Palette
```css
--color-void: #050505        /* Deep black background */
--color-merlot: #2b0a16      /* Dark burgundy wine */
--color-gold: #d4af37        /* Luxury gold foil */
--color-gold-dim: #997b28    /* Aged gold */
--color-cream: #fffdf0       /* Vintage cream */
--color-slime: #39ff14       /* Neon slime green */
--color-zap: #00d4ff         /* Electric blue */
--color-berry: #8b2f5e       /* Deep berry */
```

### Typography
- **Headings**: Playfair Display (serif luxury)
- **Body**: System fonts (clean readability)  
- **Mono**: JetBrains Mono (technical specs)

### Animation Springs
- **Snappy**: Quick, responsive feedback
- **Bouncy**: Playful overshooting
- **Gentle**: Smooth, elegant transitions

---

## 📝 Available Scripts

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production (dist/)
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

---

## 🎯 Key Components

### CerealCard
- 3D tilt effect using motion values
- Vintage badge with year
- Flavor profile visualization
- Constrained image sizing (max 260px)
- Premium hover effects

### Home (The Cellar)
- Parallax hero section with dramatic entrance
- Staggered card animations on scroll
- 15 vintage cereals in responsive grid
- Reduced background opacity for text focus

### PairingGuide
- Interactive cereal selection with premium buttons
- Real-time synergy calculation
- Custom CSS milk bottle animation
- Dynamic color-coded results
- 4 milk varieties with detailed properties

### PairingCard
- Animated milk bottle that fills on selection
- Synergy score with dynamic styling
- Flavor compatibility breakdown
- Premium glassmorphism design

---

## 🎭 The Satire

This project lovingly parodies:
- 🍷 Wine tasting culture and sommelier pretension
- 💰 Absurd luxury pricing ($325-$2,100 for cereal)
- 📊 Overly technical product specifications
- 🎨 Premium branding for mundane products
- 🏛️ Vintage collection culture
- 🌍 Terroir and regional authenticity

**Disclaimer**: All cereals, prices, and tasting notes are fictional and satirical. No actual sommeliers were consulted (or exist for cereal). Please don't pay $2,100 for Grape-Nuts.

---

## 🚀 Performance

- ⚡ Vite for instant HMR
- 📦 Optimized production builds
- 🎨 Custom CSS (no framework overhead)
- 🔧 Tree-shaking and code splitting
- 💨 Smooth 60fps animations
- 📄 7 prerendered routes for SEO

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome! Feel free to:
- Report bugs via Issues
- Suggest new cereal varieties
- Propose UX improvements
- Submit pull requests

---

## 📄 License

MIT License - Feel free to use this project for learning and inspiration!

---

## 🙏 Acknowledgments

- All cereal brands mentioned are property of their respective trademark holders
- Used purely for satirical and educational purposes
- Design inspired by luxury wine tasting experiences
- Built with 💚 and excessive amounts of nostalgia

---

**Made by a developer who takes breakfast very seriously**  
⭐ Star this repo if you appreciate the absurdity!
