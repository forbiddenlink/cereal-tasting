import React from 'react';
import { motion } from 'framer-motion';
import { springs } from '../utils/motion';

export const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 py-12 border-t border-white/5 bg-void/50 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-heading text-gold mb-2">Cereal Tasting</h2>
                        <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                            Established 2026 • The Cellar
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-6">
                        {['Instagram', 'Twitter', 'Newsletter'].map((link) => (
                            <motion.a
                                key={link}
                                href="#"
                                whileHover={{ scale: 1.05, color: 'var(--color-slime)', transition: springs.snappy }}
                                className="text-sm font-mono text-cream/60"
                            >
                                {link}
                            </motion.a>
                        ))}
                    </div>

                    {/* Copyright */}
                    <div className="text-xs text-zinc-600 font-mono">
                        © {new Date().getFullYear()} Nostalgia Corp. <br />
                        <span className="opacity-50">Do not consume after midnight.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
