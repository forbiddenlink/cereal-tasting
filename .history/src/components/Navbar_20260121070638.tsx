import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
    onNavigate: (page: 'home' | 'pairing' | 'about') => void;
    currentPage: 'home' | 'pairing' | 'about';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-6 glass-panel-heavy">
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
                        <h1 className="text-xl md:text-2xl font-heading text-gold tracking-wider uppercase group-hover:text-cream transition-colors duration-300">
                            The Sommelier's Spoon
                        </h1>
                        <p className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase">
                            Est. Saturday Morning
                        </p>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-8 font-heading text-cream/60 text-lg">
                    {[
                        { id: 'home', label: 'The Cellar' },
                        { id: 'pairing', label: 'Pairings' },
                        { id: 'about', label: 'About' }
                    ].map((item) => (
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
