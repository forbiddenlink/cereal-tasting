import React from 'react';
import type { Cereal } from '../data/mockData';
import type { Milk } from '../data/milks';
import { motion, AnimatePresence } from 'framer-motion';
import cerealFallback from '../assets/cereal-fallback.svg';

interface PairingCardProps {
    cereal: Cereal;
    milk: Milk | null;
}

export const PairingCard: React.FC<PairingCardProps> = ({ cereal, milk }) => {
    // Calculate synergy score (simple logic for now)
    const calculateSynergy = () => {
        if (!milk) return 0;

        let score = 85; // Base high score

        // Bonus if it's the recommended pairing
        if (milk.bestPairedWith.includes(cereal.id)) {
            score += 10;
        } else if (cereal.recommendedMilkPairing === milk.id) {
            score += 10;
        }

        // Penalty logic (just for flavor)
        if (cereal.name.includes("Chocolate") && milk.name.includes("Strawberry")) {
            score = 12; // Disgusting
        }

        return Math.min(100, score);
    };

    const synergy = calculateSynergy();

    const getSynergyLabel = (score: number) => {
        if (score === 0) return "Awaiting Solvent...";
        if (score < 40) return "Potentially Hazardous";
        if (score < 70) return "Palatable";
        if (score < 90) return "Harmonious";
        return "Transcendental";
    };

    const getScoreColor = (score: number) => {
        if (score > 80) return 'border-slime/50 text-slime bg-slime/5';
        if (score < 40) return 'border-berry/50 text-berry bg-berry/5';
        return 'border-gold/50 text-gold bg-gold/5';
    }

    return (
        <div style={{ padding: 'clamp(2rem, 8vw, 4rem)' }} className="glass-panel-heavy rounded-2xl relative overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col justify-center">
            <div className="relative z-10 text-center">
                <motion.div
                    key={cereal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading text-gold mb-2 drop-shadow-md">{cereal.name}</h2>
                    <div className="flex justify-center items-center gap-2 md:gap-3 text-xs md:text-sm font-mono text-gold/60 mb-8 md:mb-12 uppercase tracking-[0.2em]">
                        <span>Vintage {cereal.vintage}</span>
                        <span className="w-1 h-1 bg-gold rounded-full" />
                        <span>{cereal.region}</span>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 md:mb-12">
                    {/* Dynamic Cereal Visual */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-32 h-44 sm:w-40 sm:h-52 bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 rounded-lg flex items-center justify-center shadow-2xl relative overflow-hidden group">
                        <img 
                            src={cereal.image}
                            alt={cereal.name} 
                            className="w-full h-full object-contain p-4 z-10 max-w-[120px] max-h-[160px]"
                            onError={(e) => {
                                e.currentTarget.src = cerealFallback;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />
                    </motion.div>

                    <motion.span
                        animate={{ rotate: milk ? 0 : 90, scale: milk ? 1 : 0.5 }}
                        className="text-4xl text-gold/30 font-thin"
                    >
                        +
                    </motion.span>

                    {/* Milk Visual - CSS Bottle */}
                    <div className="relative w-28 h-40 group">
                        {/* Bottle Shape */}
                        <div className={`
                            absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-32 
                            border-2 border-white/20 rounded-b-xl rounded-t-md
                            before:content-[''] before:absolute before:-top-6 before:left-1/2 before:-translate-x-1/2 before:w-10 before:h-6 before:border-2 before:border-b-0 before:border-white/20 before:rounded-t-sm
                            after:content-[''] after:absolute after:-top-8 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-2 after:bg-white/20 after:rounded-full
                            overflow-hidden transition-all duration-500
                            ${milk ? 'border-cream/40 shadow-[0_0_20px_rgba(255,253,240,0.1)]' : 'border-dashed border-white/10'}
                        `}>
                            {/* Milk Liquid */}
                            <AnimatePresence>
                                {milk && (
                                    <motion.div
                                        initial={{ height: "0%" }}
                                        animate={{ height: "85%" }}
                                        exit={{ height: "0%" }}
                                        transition={{ duration: 1, type: "spring", bounce: 0.2 }}
                                        className="absolute bottom-0 left-0 right-0 bg-cream opacity-90 w-full"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 blur-sm" />
                                        {/* Bubbles */}
                                        <motion.div
                                            animate={{ y: [-10, -30], opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                            className="absolute bottom-4 left-4 w-2 h-2 bg-white/50 rounded-full"
                                        />
                                        <motion.div
                                            animate={{ y: [-10, -40], opacity: [0, 1, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                                            className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-white/50 rounded-full"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!milk && (
                                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/20 font-mono text-center">
                                    Select<br />Solvent
                                </div>
                            )}
                        </div>

                        {milk && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 left-0 right-0 text-center"
                            >
                                <div className="text-[10px] font-mono text-cream uppercase tracking-wide">{milk.type}</div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {milk && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="space-y-4 mt-8"
                        >
                            <div className="relative inline-block">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    className={`h-px w-full absolute -bottom-2 left-0 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50`}
                                />
                                <div className="text-xs uppercase tracking-[0.3em] text-gold/70 mb-2">Calculated Synergy</div>
                                <div className={`text-7xl font-heading ${synergy > 80 ? 'text-slime' : synergy < 40 ? 'text-berry' : 'text-cream'} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}>
                                    {synergy}<span className="text-3xl text-gold/50">/100</span>
                                </div>
                            </div>

                            <div>
                                <div className={`
                                    inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-widest rounded-full border
                                    ${getScoreColor(synergy)}
                                `}>
                                    {getSynergyLabel(synergy)}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
