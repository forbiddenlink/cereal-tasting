import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { FloatingCart } from './components/FloatingCart';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { CEREALS, type Cereal } from './data/mockData';
import type { CartItem } from './types/cart';
import { springs } from './utils/motion';

const Home = lazy(() => import('./pages/Home').then((module) => ({ default: module.Home })));
const PairingGuide = lazy(() => import('./pages/PairingGuide').then((module) => ({ default: module.PairingGuide })));
const About = lazy(() => import('./pages/About').then((module) => ({ default: module.About })));
const Contact = lazy(() => import('./pages/Contact').then((module) => ({ default: module.Contact })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy })));
const NotFound = lazy(() => import('./pages/NotFound').then((module) => ({ default: module.NotFound })));

const CART_STORAGE_KEY = 'cereal-cellar-cart-v1';
const SITE_URL = 'https://cereal-tasting.vercel.app';

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: "The Sommelier's Spoon | Vintage Cereal Tasting Experience",
    description: 'Browse collectible cereal vintages, compare flavor profiles, test pairings, and curate a nostalgia flight through a premium satirical tasting interface.',
  },
  '/pairings': {
    title: "Pairing Guide | The Sommelier's Spoon",
    description: 'Calibrate cereal and milk combinations with interactive synergy scoring, flavor rationale, and shareable tasting outcomes for every experimental pairing.',
  },
  '/about': {
    title: "About The Cellar | The Sommelier's Spoon",
    description: 'Meet the satirical brand story, product philosophy, and technical craft principles behind our premium cereal tasting cellar experience.',
  },
  '/contact': {
    title: "Contact | The Sommelier's Spoon",
    description: 'Reach the team for press, partnerships, collaboration inquiries, and premium nostalgia concept work related to this interactive portfolio product.',
  },
  '/privacy-policy': {
    title: "Privacy Policy | The Sommelier's Spoon",
    description: 'Learn how local browser data, preferences, and session-like state are handled transparently within this portfolio cereal tasting application.',
  },
};

interface CheckoutModalProps {
  isOpen: boolean;
  itemCount: number;
  total: number;
  onCancel: () => void;
  onConfirm: () => void;
}

interface CommandAction {
  id: string;
  label: string;
  subtitle?: string;
  keywords: string;
  run: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, itemCount, total, onCancel, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-modal-title"
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, filter: 'blur(3px)' }}
            transition={springs.smooth}
          >
            <div className="w-full max-w-md rounded-2xl border border-gold/20 bg-gradient-to-b from-merlot-dark to-void p-6 shadow-2xl">
              <h2 id="checkout-modal-title" className="text-2xl font-heading text-gold mb-3">
                Confirm Checkout
              </h2>
              <p className="text-cream/80 text-sm leading-relaxed mb-5">
                This portfolio checkout will clear your flight list. No real purchase is processed.
              </p>
              <div className="space-y-2 text-sm font-mono mb-6">
                <p className="text-gold/80">Items: {itemCount}</p>
                <p className="text-cream">Total: ${total.toFixed(2)}</p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg border border-gold/30 text-cream hover:border-gold/60 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="px-4 py-2 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold"
                >
                  Clear My Flight
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AmbientBackdrop: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-grid-overlay" />
    </div>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const RouteMetadata: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
    const metadata = ROUTE_METADATA[normalizedPath] ?? {
      title: 'Page Not Found | The Sommelier\'s Spoon',
      description: 'The requested page could not be found in the cereal cellar.',
    };

    document.title = metadata.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', metadata.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', metadata.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', metadata.description);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', metadata.title);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', metadata.description);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const suffix = normalizedPath === '/' ? '/' : `${normalizedPath}/`;
      canonical.setAttribute('href', `${SITE_URL}${suffix}`);
    }
  }, [pathname]);

  return null;
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 34, mass: 0.3 });
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandCursor, setCommandCursor] = useState(0);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cereal: Cereal) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cereal.id === cereal.id);
      if (existing) {
        return prev.map((item) =>
          item.cereal.id === cereal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { cereal, quantity: 1 }];
    });
  };

  const removeFromCart = (cerealId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cereal.id !== cerealId));
  };

  const updateCartQuantity = (cerealId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cerealId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.cereal.id === cerealId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const itemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.cereal.price * item.quantity), 0),
    [cartItems]
  );

  const handleConfirmCheckout = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setIsCheckoutModalOpen(false);
  };

  const topNostalgiaCereals = useMemo(
    () => [...CEREALS].sort((a, b) => b.flavor.nostalgia - a.flavor.nostalgia).slice(0, 3),
    []
  );

  const commandActions = useMemo<CommandAction[]>(() => {
    const core: CommandAction[] = [
      {
        id: 'go-home',
        label: 'Go to The Cellar',
        subtitle: 'Explore the full collection',
        keywords: 'home cellar collection',
        run: () => navigate('/'),
      },
      {
        id: 'go-pairings',
        label: 'Open Pairing Guide',
        subtitle: 'Build milk and cereal matches',
        keywords: 'pairing pairings guide milk',
        run: () => navigate('/pairings/'),
      },
      {
        id: 'go-about',
        label: 'View About',
        subtitle: 'Read the cellar story',
        keywords: 'about story brand',
        run: () => navigate('/about/'),
      },
      {
        id: 'open-cart',
        label: `Open Cart (${itemCount})`,
        subtitle: 'Review your current flight',
        keywords: 'cart checkout flight',
        run: () => setIsCartOpen(true),
      },
      {
        id: 'go-contact',
        label: 'Go to Contact',
        subtitle: 'Contact and partnerships',
        keywords: 'contact email press',
        run: () => navigate('/contact/'),
      },
    ];

    const cerealShortcuts = topNostalgiaCereals.map((cereal) => ({
      id: `add-${cereal.id}`,
      label: `Add ${cereal.name}`,
      subtitle: `Nostalgia ${cereal.flavor.nostalgia}/100`,
      keywords: `add cereal ${cereal.name.toLowerCase()} nostalgia`,
      run: () => {
        addToCart(cereal);
        setIsCartOpen(true);
      },
    }));

    if (itemCount > 0) {
      core.push({
        id: 'clear-cart',
        label: 'Clear Current Flight',
        subtitle: 'Remove all items from cart',
        keywords: 'clear reset cart',
        run: () => setIsCheckoutModalOpen(true),
      });
    }

    return [...core, ...cerealShortcuts];
  }, [itemCount, navigate, topNostalgiaCereals]);

  const filteredCommands = useMemo(() => {
    const normalized = commandQuery.trim().toLowerCase();
    if (!normalized) return commandActions;
    return commandActions.filter((action) =>
      `${action.label} ${action.subtitle ?? ''} ${action.keywords}`.toLowerCase().includes(normalized)
    );
  }, [commandActions, commandQuery]);

  const activeCommandIndex = filteredCommands.length === 0
    ? -1
    : Math.min(commandCursor, filteredCommands.length - 1);

  const openCommandPalette = () => {
    setCommandQuery('');
    setCommandCursor(0);
    setIsCommandPaletteOpen(true);
  };

  const closeCommandPalette = () => {
    setIsCommandPaletteOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsCommandPaletteOpen((prev) => {
          const next = !prev;
          if (next) {
            setCommandQuery('');
            setCommandCursor(0);
          }
          return next;
        });
      } else if (event.key === 'Escape') {
        closeCommandPalette();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!isCommandPaletteOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isCommandPaletteOpen]);

  const executeCommand = (action: CommandAction) => {
    action.run();
    closeCommandPalette();
  };

  return (
    <div className="bg-void min-h-screen text-cream font-body selection:bg-slime selection:text-black">
      <AmbientBackdrop />
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[90] bg-gradient-to-r from-slime via-gold to-berry origin-left"
        style={{ scaleX: scrollProgress }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:px-4 focus:py-2 focus:rounded-md focus:bg-gold focus:text-void focus:font-bold"
      >
        Skip to main content
      </a>

      <ScrollToTop />
      <RouteMetadata />
      <Navbar cartItemCount={itemCount} onOpenCart={() => setIsCartOpen(true)} />

      <main id="main-content" className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(5px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home onAddToCart={addToCart} />} />
                <Route path="/pairings" element={<PairingGuide />} />
                <Route path="/pairing" element={<Navigate to="/pairings/" replace />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />

      <FloatingCart
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => setIsCheckoutModalOpen(true)}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
      />
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        itemCount={itemCount}
        total={total}
        onCancel={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleConfirmCheckout}
      />
      <motion.button
        type="button"
        onClick={openCommandPalette}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="hidden md:flex fixed bottom-8 left-8 z-[72] items-center gap-2 rounded-lg border border-gold/25 bg-merlot-dark/80 backdrop-blur-md px-3 py-2 text-xs font-mono uppercase tracking-wider text-gold/75 hover:border-gold/55 hover:text-gold transition-colors"
        aria-label="Open command palette"
      >
        <span>Command</span>
        <span className="rounded border border-gold/30 px-1.5 py-0.5 text-[10px]">⌘K</span>
      </motion.button>
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[82] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCommandPalette}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-0 z-[83] flex items-start justify-center px-4 pt-24"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={springs.smooth}
            >
              <div
                className="w-full max-w-2xl rounded-2xl border border-gold/25 bg-gradient-to-b from-merlot-dark/95 to-void/95 shadow-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
              >
                <div className="px-5 py-4 border-b border-gold/15">
                  <label htmlFor="command-input" className="sr-only">Search commands</label>
                  <input
                    id="command-input"
                    autoFocus
                    value={commandQuery}
                    onChange={(event) => {
                      setCommandQuery(event.target.value);
                      setCommandCursor(0);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setCommandCursor((prev) => (
                          filteredCommands.length === 0
                            ? 0
                            : Math.min(prev + 1, filteredCommands.length - 1)
                        ));
                      } else if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setCommandCursor((prev) => Math.max(prev - 1, 0));
                      } else if (event.key === 'Enter') {
                        event.preventDefault();
                        const action = activeCommandIndex >= 0 ? filteredCommands[activeCommandIndex] : undefined;
                        if (action) executeCommand(action);
                      } else if (event.key === 'Escape') {
                        event.preventDefault();
                        closeCommandPalette();
                      }
                    }}
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="command-results"
                    aria-activedescendant={
                      activeCommandIndex >= 0 ? `command-option-${filteredCommands[activeCommandIndex]?.id}` : undefined
                    }
                    placeholder="Search actions, pages, cereals..."
                    className="w-full bg-transparent text-cream placeholder:text-cream/40 text-sm md:text-base font-mono outline-none"
                  />
                  <div className="mt-2 text-[10px] text-gold/45 font-mono uppercase tracking-widest">
                    Press Enter to execute • Esc to close • Cmd/Ctrl + K
                  </div>
                </div>
                <div id="command-results" role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
                  {filteredCommands.length === 0 && (
                    <div className="p-4 text-sm text-cream/60">No matching commands.</div>
                  )}
                  {filteredCommands.map((action, index) => (
                    <button
                      type="button"
                      id={`command-option-${action.id}`}
                      role="option"
                      aria-selected={index === activeCommandIndex}
                      key={action.id}
                      onMouseEnter={() => setCommandCursor(index)}
                      onClick={() => executeCommand(action)}
                      className={`w-full text-left rounded-xl px-4 py-3 border transition-colors mb-2 ${
                        index === activeCommandIndex
                          ? 'border-gold/50 bg-gold/10'
                          : 'border-transparent hover:border-gold/25 hover:bg-white/5'
                      }`}
                    >
                      <div className="text-sm font-heading text-gold">{action.label}</div>
                      {action.subtitle && (
                        <div className="text-xs font-mono text-cream/65 mt-1">{action.subtitle}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
