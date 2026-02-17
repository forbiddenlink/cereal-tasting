import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CEREALS } from '../data/mockData';
import { useState } from 'react';

export const NotFound: React.FC = () => {
    // Pick a random cereal to recommend (memoized to avoid re-renders)
    const [randomCereal] = useState(() => CEREALS[Math.floor(Math.random() * CEREALS.length)]);

    return (
        <div className="min-h-screen pt-40 pb-20 px-4 flex items-center">
            <div className="container mx-auto max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7 }}
                    className="glass-panel-heavy rounded-2xl border-2 border-gold/20 p-10 md:p-14 relative overflow-hidden group"
                >
                    {/* Decorative background orbs */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-berry/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        {/* Top decorative line */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>

                        <p className="text-gold/50 font-mono tracking-[0.3em] uppercase text-xs mb-3">Error 404</p>
                        <h1 className="text-5xl md:text-7xl font-heading text-gold mb-6">
                            Lost In The Cellar
                        </h1>
                        
                        <div className="space-y-4 mb-8">
                            <p className="text-cream/80 text-lg">
                                The vintage you requested has been discontinued.
                            </p>
                            <p className="text-cream/60 text-sm">
                                This cereal box has been misplaced somewhere between the 1990s and your childhood memories.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent my-8"></div>

                        {/* Suggested Alternative */}
                        <div className="mb-8">
                            <p className="text-gold/70 font-mono text-xs uppercase tracking-wider mb-4">
                                The Sommelier Suggests
                            </p>
                            <div className="glass-panel rounded-lg border border-gold/10 p-6 hover:border-gold/30 transition-all duration-300">
                                <h3 className="text-xl font-heading text-gold mb-2">{randomCereal.name}</h3>
                                <p className="text-cream/60 text-sm mb-3">Vintage {randomCereal.vintage} • {randomCereal.region}</p>
                                <p className="text-cream/70 text-xs italic">
                                    "{randomCereal.tastingNotes[0]}"
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all duration-300"
                            >
                                <span>✦</span>
                                Return to The Cellar
                            </Link>
                            <Link
                                to="/pairings/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gold/30 text-gold font-heading font-bold uppercase tracking-wider hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
                            >
                                Explore Pairings
                            </Link>
                        </div>

                        {/* Bottom decorative line */}
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>

                        {/* Humorous footnote */}
                        <p className="text-cream/40 text-xs font-mono mt-6">
                            (This page is like finding an empty cereal box in the pantry)
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
