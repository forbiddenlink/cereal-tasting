import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { springs } from '../utils/motion';

interface KonamiOverlayProps {
    isActive: boolean;
    onDismiss: () => void;
}

const GOLD_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 4,
    delay: Math.random() * 2,
}));

export function KonamiOverlay({ isActive, onDismiss }: KonamiOverlayProps) {
    const [shaking, setShaking] = useState(false);

    useEffect(() => {
        if (isActive) {
            setShaking(true);
            const timer = setTimeout(() => setShaking(false), 600);
            return () => clearTimeout(timer);
        }
    }, [isActive]);

    return (
        <AnimatePresence>
            {isActive && (
                <>
                    <motion.div
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                    <motion.div
                        className="fixed inset-0 z-[201] flex items-center justify-center p-4 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={shaking ? {
                            animation: 'shake 0.5s ease-in-out',
                        } : undefined}
                    >
                        {/* Gold particles */}
                        {GOLD_PARTICLES.map((p) => (
                            <motion.div
                                key={p.id}
                                className="absolute rounded-full"
                                style={{
                                    left: `${p.x}%`,
                                    top: `${p.y}%`,
                                    width: p.size,
                                    height: p.size,
                                    background: 'radial-gradient(circle, #d4af37, #997b28)',
                                }}
                                animate={{
                                    y: [0, -60, 0],
                                    opacity: [0.2, 0.8, 0.2],
                                    scale: [1, 1.5, 1],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    delay: p.delay,
                                }}
                            />
                        ))}

                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={springs.bouncy}
                            className="relative w-full max-w-2xl rounded-3xl border-2 border-gold/50 bg-gradient-to-b from-merlot-dark/95 to-void/95 backdrop-blur-2xl p-8 md:p-12 text-center shadow-[0_0_80px_rgba(212,175,55,0.3)]"
                        >
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(212,175,55,0.1), transparent 70%)',
                                    animation: 'pulse-glow 2s ease-in-out infinite',
                                    color: '#d4af37',
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-6xl mb-6"
                                >
                                    🥣
                                </motion.div>

                                <h2 className="text-4xl md:text-5xl font-heading text-gold mb-4"
                                    style={{ textShadow: '0 0 30px rgba(212,175,55,0.5)' }}
                                >
                                    SECRET MENU UNLOCKED
                                </h2>

                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

                                <div className="glass-panel-heavy rounded-2xl border border-gold/30 p-6 md:p-8 mb-8 text-left">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-heading text-gold mb-1">The Forbidden Bowl</h3>
                                            <p className="text-[10px] font-mono text-berry/70 uppercase tracking-wider">
                                                Recalled 1986 • Classification: OMEGA-LEVEL CEREAL
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-heading text-slime">$∞</p>
                                            <p className="text-[10px] font-mono text-cream/40">per serving</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <p className="text-[10px] font-mono text-gold/60 uppercase tracking-widest mb-2">Tasting Notes</p>
                                            <ul className="space-y-1.5">
                                                <li className="text-sm text-cream/80 flex items-start gap-2">
                                                    <span className="text-gold">•</span>
                                                    "If you know, you know." — Every sommelier who's tasted it (there are three)
                                                </li>
                                                <li className="text-sm text-cream/80 flex items-start gap-2">
                                                    <span className="text-gold">•</span>
                                                    Last consumed by a Tibetan monk in 1986. He smiled once, then never spoke again.
                                                </li>
                                                <li className="text-sm text-cream/80 flex items-start gap-2">
                                                    <span className="text-gold">•</span>
                                                    Pairs with nothing. It pairs YOU.
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2">
                                                <p className="text-[10px] font-mono text-gold/60 uppercase">Region</p>
                                                <p className="text-sm text-cream/90">Classified</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2">
                                                <p className="text-[10px] font-mono text-gold/60 uppercase">Vintage</p>
                                                <p className="text-sm text-cream/90">Pre-history</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2">
                                                <p className="text-[10px] font-mono text-gold/60 uppercase">Rating</p>
                                                <p className="text-sm text-cream/90">6 / 5 ★</p>
                                            </div>
                                            <div className="bg-white/5 border border-white/5 rounded-md px-3 py-2">
                                                <p className="text-[10px] font-mono text-gold/60 uppercase">Status</p>
                                                <p className="text-sm text-berry/90">RECALLED</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-cream/40 italic text-center">
                                        "Some cereals are eaten. This one eats you." — Jacques Flakémont III, trembling
                                    </p>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={onDismiss}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm"
                                >
                                    Return to Reality
                                </motion.button>

                                <p className="text-[10px] text-cream/30 font-mono mt-6">
                                    ↑↑↓↓←→←→BA • You found the secret. Tell no one. (Or tell everyone. We're not your mom.)
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
