import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { springs } from '../utils/motion';

const MIDNIGHT_MESSAGES = [
    "Do not consume after midnight",
    "Okay, maybe a little after midnight",
    "Fine, 2am. But that's the limit.",
    "You know what, live your truth. Cereal has no curfew.",
];

const FOUNDING_STORY = `Founded in 2024 when our founder, Jacques Flakémont III, was forcibly removed from a Whole Foods for attempting to age cereal boxes in the cheese cave. What started as a restraining order became a movement. Today, The Sommelier's Spoon operates from an undisclosed location that is definitely not Jacques' mother's basement. The cheese cave incident remains under appeal.`;

export const Footer: React.FC = () => {
    const [showFoundingStory, setShowFoundingStory] = useState(false);
    const [midnightIndex, setMidnightIndex] = useState(0);
    const [showHoverTip, setShowHoverTip] = useState(false);
    const hoverTimerRef = useRef<number | null>(null);

    const handleMidnightClick = () => {
        setMidnightIndex((prev) => (prev + 1) % MIDNIGHT_MESSAGES.length);
    };

    const handleBrandHoverStart = () => {
        hoverTimerRef.current = window.setTimeout(() => {
            setShowHoverTip(true);
        }, 3000);
    };

    const handleBrandHoverEnd = () => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
        setShowHoverTip(false);
    };

    return (
        <footer className="relative z-10 py-16 border-t border-gold/10 bg-gradient-to-b from-void/50 to-merlot-dark/30 backdrop-blur-md">
            <div className="container mx-auto px-4">
                {/* Top decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <div
                            className="relative inline-block"
                            onMouseEnter={handleBrandHoverStart}
                            onMouseLeave={handleBrandHoverEnd}
                        >
                            <h2 className="text-3xl font-heading text-gold mb-3">The Sommelier's Spoon</h2>
                            <AnimatePresence>
                                {showHoverTip && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -top-8 left-0 right-0 text-center"
                                    >
                                        <span className="text-[10px] font-mono text-slime/70 bg-void/80 px-2 py-1 rounded whitespace-nowrap">
                                            You're still here? Go eat some cereal.
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className="text-xs font-mono text-gold/50 uppercase tracking-[0.3em] mb-4">
                            Est. Saturday Morning
                        </p>
                        <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
                            Where breakfast meets pretension in the most delightful way possible.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-sm font-heading text-gold/70 uppercase tracking-wider mb-4">Navigate</h3>
                        <div className="flex flex-col gap-3">
                            {[
                                { label: 'The Cellar', to: '/' },
                                { label: 'Pairings', to: '/pairings/' },
                                { label: 'Soul Quiz', to: '/quiz/' },
                                { label: 'Get Certified', to: '/certificate/' },
                                { label: 'About', to: '/about/' },
                                { label: 'Contact', to: '/contact/' },
                                { label: 'Privacy', to: '/privacy-policy/' },
                            ].map((link) => (
                                <motion.div
                                    key={link.label}
                                    whileHover={{ x: 3, color: 'var(--color-gold)', transition: springs.snappy }}
                                    className="text-sm font-mono text-cream/60"
                                >
                                    <Link to={link.to}>{link.label}</Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications & Humor */}
                    <div className="text-center md:text-right">
                        <h3 className="text-sm font-heading text-gold/70 uppercase tracking-wider mb-4">Certified By</h3>
                        <div className="space-y-2 text-xs text-cream/50 font-mono leading-relaxed">
                            <p>International Cereal Sommelier Association</p>
                            <p className="text-[10px] text-cream/30">(which doesn't exist)</p>
                            <p className="mt-4">Vintage Breakfast Preservation Society</p>
                            <p className="mt-4">Bureau of Nostalgia Regulation</p>
                            <p className="text-[10px] text-cream/30">(also fictional)</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <div className="text-xs text-cream/40 font-mono space-y-1">
                        <p>
                            ©{' '}
                            <button
                                type="button"
                                onClick={() => setShowFoundingStory((p) => !p)}
                                className="hover:text-gold transition-colors cursor-pointer underline decoration-dotted decoration-gold/30 underline-offset-2"
                            >
                                {new Date().getFullYear()}
                            </button>{' '}
                            The Sommelier's Spoon. All rights reserved.
                        </p>
                        <p className="text-[10px] text-cream/25">
                            A satirical portfolio project. Please don't actually pay $2,100 for cereal.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-slime/30"></div>
                        <button
                            type="button"
                            onClick={handleMidnightClick}
                            className="text-xs text-slime/60 font-mono whitespace-nowrap hover:text-slime/90 transition-colors cursor-pointer"
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={midnightIndex}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {MIDNIGHT_MESSAGES[midnightIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-slime/30"></div>
                    </div>
                </div>

                {/* Founding Story Easter Egg */}
                <AnimatePresence>
                    {showFoundingStory && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={springs.smooth}
                            className="overflow-hidden"
                        >
                            <div className="mt-6 p-5 rounded-xl border border-gold/15 bg-white/[0.02]">
                                <p className="text-[10px] font-mono text-gold/50 uppercase tracking-widest mb-2">
                                    The True Origin Story
                                </p>
                                <p className="text-xs text-cream/60 leading-relaxed italic">
                                    "{FOUNDING_STORY}"
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bottom decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-12"></div>
            </div>
        </footer>
    );
};
