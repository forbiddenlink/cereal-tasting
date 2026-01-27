/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050505',
        'merlot': '#1a050d',
        'merlot-dark': '#0a0308',
        'velvet': '#3d0a1e',
        'gold': '#d4af37',
        'gold-dim': '#997b28',
        'cream': '#f0f0e0',
        'slime': '#39ff14',
        'zap': '#fff01f',
        'berry': '#ff10f0',
        'cyan': '#00f9ff',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
}
