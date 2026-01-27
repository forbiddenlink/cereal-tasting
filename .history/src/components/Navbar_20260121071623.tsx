import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    onNavigate: (page: 'home' | 'pairing' | 'about') => void;
    currentPage: 'home' | 'pairing' | 'about';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'The Cellar' },
        { id: 'pairing', label: 'Pairings' },
        { id: 'about', label: 'About' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 glass-panel-heavy">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Area */}
                <div
                    className="flex items-center gap-4 cursor-pointer group"
                    onClick={() => onNavigate('home')}
                >
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="text-3xl text-gold filter drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                    >
                        🥄
                    </motion.div>
                    <div>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-heading text-gold tracking-wider uppercase group-hover:text-cream transition-colors duration-300">
                            The Sommelier's Spoon
                        </h1>
                        <p className="text-[8px] md:text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
                            Est. Saturday Morning
                        </p>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-gold hover:text-cream transition-colors z-50"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Navigation Links - Desktop */}
                <div className="hidden md:flex gap-8 font-heading text-cream/60 text-lg">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id as 'home' | 'pairing' | 'about')}
                            className={`
                                relative py-2 transition-all duration-300 hover:text-white
                                ${currentPage === item.id ? 'text-gold' : ''}
                            `}
                        >
                            {item.label}
                            {currentPage === item.id && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-gold shadow-[0_0_10px_#d4af37]"
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 right-0 glass-panel-heavy border-t border-gold/20 py-4"
                    >
                        <div className="flex flex-col gap-2 px-4">
                            {menuItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => {
                                        onNavigate(item.id as 'home' | 'pairing' | 'about');
                                        setMobileMenuOpen(false);
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        text-left py-3 px-4 rounded-lg font-heading text-lg transition-all
                                        ${currentPage === item.id 
                                            ? 'bg-gold/20 text-gold' 
                                            : 'text-cream/60 hover:bg-white/5 hover:text-cream'
                                        }
                                    `}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* User Actions */}
                <div className="flex items-center gap-6">
                    <button className="text-sm font-mono text-gold border border-gold/30 px-4 py-2 rounded-full hover:bg-gold hover:text-merlot transition-colors">
                        My Flight (0)
                    </button>
                </div>
            </div>
        </nav>
    );
};
