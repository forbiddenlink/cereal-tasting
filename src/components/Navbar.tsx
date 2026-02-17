import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { springs, dropDown } from '../utils/motion';

interface NavbarProps {
    cartItemCount: number;
    onOpenCart: () => void;
}

const menuItems = [
    { to: '/', label: 'The Cellar', end: true },
    { to: '/pairings/', label: 'Pairings' },
    { to: '/about/', label: 'About' },
    { to: '/contact/', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ cartItemCount, onOpenCart }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    React.useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-3 md:py-4 px-4 md:px-6 glass-panel-heavy border-b border-gold/10" aria-label="Primary">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Area */}
                <Link
                    className="flex items-center gap-3 md:gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-lg p-2 -ml-2"
                    to="/"
                    aria-label="Go to home"
                >
                    <motion.div
                        whileHover={{ scale: 1.05, transition: springs.bouncy }}
                        className="text-3xl md:text-4xl font-heading text-gold"
                    >
                        ✦
                    </motion.div>
                    <div>
                        <h1 className="text-base md:text-lg lg:text-xl font-heading text-gold tracking-wider group-hover:text-cream transition-colors duration-300">
                            THE SOMMELIER'S SPOON
                        </h1>
                        <p className="text-[9px] md:text-[10px] font-mono text-gold/40 tracking-[0.25em] uppercase">
                            Est. Saturday Morning
                        </p>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={springs.snappy}
                    className="md:hidden text-gold hover:text-cream transition-colors z-50 p-2 rounded-lg hover:bg-gold/10"
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-primary-menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </motion.button>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex gap-6 lg:gap-8 items-center">
                    {menuItems.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.end}>
                            {({ isActive }) => (
                                <motion.span
                                    whileHover={{ scale: 1.05, y: -1 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={springs.snappy}
                                    className={`
                                        relative py-2 px-3 font-heading text-sm lg:text-base tracking-wider uppercase transition-all duration-300 rounded-md inline-flex
                                        ${isActive ? 'text-gold bg-gold/5' : 'text-cream/70 hover:text-cream hover:bg-white/5'}
                                    `}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                                        />
                                    )}
                                </motion.span>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* User Actions */}
                <div className="hidden md:flex items-center gap-6">
                    <motion.button
                        type="button"
                        onClick={onOpenCart}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={springs.snappy}
                        className="relative text-xs lg:text-sm font-heading text-void bg-gradient-to-br from-gold via-gold to-gold-dim px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-300 shadow-[0_4px_14px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.5)] tracking-wide uppercase font-bold border border-gold-dim/30 hover:border-gold/50"
                        aria-label={`Open cart with ${cartItemCount} items`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <span className="text-gold-dim">✦</span>
                            My Flight ({cartItemCount})
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        variants={dropDown}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        id="mobile-primary-menu"
                        className="md:hidden absolute top-full left-0 right-0 glass-panel-heavy border-t border-gold/20 py-4"
                    >
                        <div className="flex flex-col gap-2 px-4">
                            {menuItems.map((item) => (
                                <NavLink key={item.to} to={item.to} end={item.end}>
                                    {({ isActive }) => (
                                        <motion.span
                                            whileTap={{ scale: 0.95, transition: springs.snappy }}
                                            className={`
                                                text-left py-3 px-4 rounded-lg font-heading text-lg transition-all block
                                                ${isActive
                                                    ? 'bg-gold/20 text-gold'
                                                    : 'text-cream/60 hover:bg-white/5 hover:text-cream'
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </NavLink>
                            ))}
                            <motion.button
                                type="button"
                                onClick={onOpenCart}
                                whileTap={{ scale: 0.95, transition: springs.snappy }}
                                className="text-left py-3 px-4 rounded-lg font-heading text-lg transition-all text-cream/80 hover:bg-white/5 hover:text-cream"
                            >
                                My Flight ({cartItemCount})
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
