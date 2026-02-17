import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { springs } from '../utils/motion';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 py-16 border-t border-gold/10 bg-gradient-to-b from-void/50 to-merlot-dark/30 backdrop-blur-md">
            <div className="container mx-auto px-4">
                {/* Top decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-heading text-gold mb-3">The Sommelier's Spoon</h2>
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
                        <p>© {new Date().getFullYear()} The Sommelier's Spoon. All rights reserved.</p>
                        <p className="text-[10px] text-cream/25">
                            A satirical portfolio project. Please don't actually pay $2,100 for cereal.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-slime/30"></div>
                        <p className="text-xs text-slime/60 font-mono whitespace-nowrap">
                            Do not consume after midnight
                        </p>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-slime/30"></div>
                    </div>
                </div>

                {/* Bottom decorative line */}
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-12"></div>
            </div>
        </footer>
    );
};
