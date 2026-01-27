# 🥣✨ The Sommelier's Spoon: Cereal Tasting Experience

> *"Nostalgia. Distilled."*  
> A satirical yet sophisticated web application that treats cereal tasting with the reverence of fine wine appreciation. Where breakfast meets pretension in the most delightful way.

**Live Demo**: [View on GitHub](https://github.com/forbiddenlink/cereal-tasting)

---

## 🌟 Overview

The Sommelier's Spoon is a premium cereal tasting platform featuring a curated collection of 9 vintage breakfast cereals, each with detailed tasting notes, vintage years, and expert milk pairing recommendations. Built as a portfolio project to demonstrate modern web development techniques with a noir-nostalgia aesthetic.

### The Experience

- 🏛️ **The Cellar** - Browse our exclusive collection of vintage cereals
- 🍷 **Pairing Guide** - Discover optimal cereal-milk synergies
- 📚 **About** - Learn about our satirical sommeliers and process

---

## ✨ Key Features

### 🎨 Premium Design System
- **Noir-Nostalgia Aesthetic** - Dark luxury theme with gold accents
- **Glassmorphism Effects** - Beautiful backdrop blur and transparency
- **Custom Color Palette** - Void black, merlot, gold, and neon highlights
- **Vintage Typography** - Playfair Display for that premium feel

### 🥣 Curated Cereal Collection (9 Varieties)
- **Captain's Reserve '97** - Nautical-themed vintage from the Suggary Isles
- **Count's Estate: Chocolate** - Gothic luxury from Transylvanian Mills
- **Loop de Fruit: Neon Edition** - Bright psychedelic loops with glowing effects
- **Frosted Flakes: Tony's Private Reserve** - Industrial sugar crystals
- **Cinnamon Toast Crunch: Millennium Edition** - Y2K nostalgic swirls
- **Lucky Charms: Leprechaun's Revenge** - Magically delicious with consequences
- **Cocoa Puffs: Sonny's Descent** - Existential chocolate experience
- **Trix: Silly Rabbit Reserve** - Geometrically impossible fruit shapes
- **Honey Nut Cheerios: Bee's Last Stand** - Environmental honey notes

### 🎯 Interactive Features
- **Advanced Filtering** - Filter by price range (Budget/Premium/Luxury)
- **Multi-Sort Options** - Sort by vintage, price, nostalgia score, or name
- **Smooth Animations** - Framer Motion powered interactions throughout
- **3D Card Effects** - Tilt and perspective transforms on hover
- **Floating Cart** - Track your tasting flight in real-time
- **Pairing Calculator** - Find optimal milk combinations

### 🎬 Enhanced Button Design
- Premium gold gradient with shine animation
- Smooth scale and shadow transitions
- Arrow animations on interaction
- "Added" confirmation with checkmark

### 📊 Detailed Specifications
Each cereal includes:
- Vintage year (1982-2003)
- Region of origin
- Price (comedically inflated)
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
- **Tailwind CSS v4** - Utility-first styling with @theme directive

### Animation & Motion
- **Framer Motion 12** - Production-ready animations
- **Custom spring physics** - Snappy, bouncy, and gentle variants
- **3D transforms** - Perspective and tilt effects
- **Motion values** - Real-time animation controls

### Styling Approach
- **Tailwind CSS** with custom design tokens
- **CSS Custom Properties** for color system
- **Glassmorphism** with backdrop-filter
- **Gradients** for premium button effects
- **Custom SVG** cereal box designs

---

## 📁 Project Structure

```
cereal-tasting/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CerealCard.tsx       # 3D tilt card with animations
│   │   ├── CerealRating.tsx     # Visual rating display
│   │   ├── FloatingCart.tsx     # Slide-in shopping cart
│   │   ├── Footer.tsx           # Site footer
│   │   ├── LoadingSpinner.tsx   # Animated loader
│   │   ├── MilkSelector.tsx     # Milk pairing selector
│   │   ├── Navbar.tsx           # Navigation with cart
│   │   └── PairingCard.tsx      # Synergy calculator display
│   │
│   ├── pages/               # Route pages
│   │   ├── Home.tsx             # Main cellar with filtering
│   │   ├── PairingGuide.tsx     # Interactive pairing tool
│   │   └── About.tsx            # Story and tech stack
│   │
│   ├── data/                # Data and types
│   │   ├── mockData.ts          # 9 cereals with full specs
│   │   └── milks.ts             # Milk varieties
│   │
│   ├── styles/              # Global styles
│   │   ├── index.css            # Tailwind + custom styles
│   │   └── variables.css        # CSS custom properties
│   │
│   ├── assets/              # Images and SVGs
│   │   ├── cereal-box-[1-9].svg # Custom cereal designs
│   │   └── hero-cellar.png      # Background image
│   │
│   └── utils/               # Utilities
│       └── motion.ts            # Spring configurations
│
├── public/                  # Static assets
├── index.html              # Entry HTML
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind setup
├── postcss.config.js       # PostCSS with Tailwind
└── tsconfig.json           # TypeScript config
```

---

## 🎨 Design System

### Color Palette
```css
--color-void: #050505        /* Deep black background */
--color-merlot: #1a050d      /* Dark wine accent */
--color-gold: #d4af37        /* Luxury gold */
--color-gold-dim: #997b28    /* Aged gold */
--color-cream: #f0f0e0       /* Vintage paper */
--color-slime: #39ff14       /* Neon green */
```

### Typography
- **Headings**: Playfair Display (serif luxury)
- **Body**: Inter (clean readability)  
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
- Image with error handling fallback
- Flavor profile visualization
- Enhanced "Add to Cart" button with shine effect

### Home (The Cellar)
- Hero section with parallax scrolling
- Stats section with animated counters
- **Filter by price** (All/Budget/Premium/Luxury)
- **Sort options** (Vintage/Price/Nostalgia/Name)
- Staggered card animations on scroll

### PairingGuide
- Interactive cereal selection
- Real-time synergy calculation
- Milk selector with descriptions
- Visual pairing result display

### About
- Brand story sections
- Sommelier introduction
- Process breakdown
- Tech stack showcase
- Legal disclaimer

---

## 🎭 The Satire

This project lovingly parodies:
- 🍷 Wine tasting culture and sommelier pretension
- 💰 Absurd luxury pricing ($450-$1500 for cereal)
- 📊 Overly technical product specifications
- 🎨 Premium branding for mundane products
- 🏛️ Vintage collection culture

**Disclaimer**: All cereals, prices, and tasting notes are fictional and satirical. No actual sommeliers were consulted (or exist for cereal). Please don't pay $1,500 for Lucky Charms.

---

## 🚀 Performance

- ⚡ Vite for instant HMR
- 📦 Code splitting with React lazy loading
- 🎨 Optimized SVG graphics
- 🔧 Production builds with tree-shaking
- 💨 Smooth 60fps animations

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
