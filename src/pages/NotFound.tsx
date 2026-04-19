import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { CEREALS } from '../data/mockData';
import { springs } from '../utils/motion';

interface PantryItem {
    emoji: string;
    label: string;
    description: string;
    type: 'cereal' | 'gross' | 'funny' | 'golden';
    cerealLink?: string;
}

function buildPantryItems(): PantryItem[] {
    const randomCereal = () => CEREALS[Math.floor(Math.random() * CEREALS.length)];
    const c1 = randomCereal();
    const c2 = randomCereal();

    const pool: PantryItem[] = [
        { emoji: '🥣', label: 'Vintage Box!', description: `A sealed ${c1.vintage} box of ${c1.name}. Technically edible. Spiritually priceless.`, type: 'cereal', cerealLink: '/' },
        { emoji: '🥣', label: 'Another Find!', description: `${c2.name} — the ${c2.region} edition. Someone was saving this.`, type: 'cereal', cerealLink: '/' },
        { emoji: '🕷️', label: 'Oh No', description: "A spider that has clearly been paying rent longer than you. Gerald says hi.", type: 'gross' },
        { emoji: '📜', label: 'Ancient Receipt', description: "A grocery receipt from 2003. Total: $4.27. Simpler times. Cheaper cereal.", type: 'funny' },
        { emoji: '🥛', label: 'Suspicious Milk', description: "Milk from... we're not going to check the date on this one. It's thicker than it should be.", type: 'gross' },
        { emoji: '🧀', label: 'Mystery Object', description: "This might have been cheese once. Or bread. Or hope. It's hard to say now.", type: 'gross' },
        { emoji: '📦', label: 'Empty Box', description: "An empty Grape-Nuts box. Someone ate $2,100 worth of gravel. Legend.", type: 'funny' },
        { emoji: '🪳', label: 'Roommate', description: "Oh, that's Gerald Jr. He lives here now. His father was the spider. It's a whole family.", type: 'gross' },
        { emoji: '🎫', label: 'Expired Coupon', description: "A coupon for 10¢ off. Expired in 1989. The pain is still fresh.", type: 'funny' },
        { emoji: '🗝️', label: 'Mysterious Key', description: "Opens... something? Maybe the door to the real page you wanted. Maybe just a drawer.", type: 'funny' },
        { emoji: '🧲', label: 'Cereal Prize', description: "A plastic magnifying glass from 1993. Still works. Still useless. Still brings joy.", type: 'funny' },
        { emoji: '🏆', label: 'THE GOLDEN SPOON!', description: "You found it! The legendary Golden Spoon! It does absolutely nothing, but congratulations!", type: 'golden' },
    ];

    // Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool;
}

export const NotFound: React.FC = () => {
    const items = useMemo(() => buildPantryItems(), []);
    const [revealed, setRevealedState] = useState<Set<number>>(new Set());
    const [foundGolden, setFoundGolden] = useState(false);
    const [lastRevealed, setLastRevealed] = useState<number | null>(null);
    const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string; angle: number }>>([]);

    const revealItem = (index: number) => {
        if (revealed.has(index)) return;

        const next = new Set(revealed);
        next.add(index);
        setRevealedState(next);
        setLastRevealed(index);

        if (items[index].type === 'golden') {
            setFoundGolden(true);
            // Spawn confetti
            const particles = Array.from({ length: 40 }, (_, i) => ({
                id: i,
                x: 50 + (Math.random() - 0.5) * 60,
                y: 40 + (Math.random() - 0.5) * 30,
                color: ['#d4af37', '#39ff14', '#ff10f0', '#00f9ff', '#fff01f'][Math.floor(Math.random() * 5)],
                angle: Math.random() * 360,
            }));
            setConfetti(particles);
            setTimeout(() => setConfetti([]), 3000);
        }
    };

    const allRevealed = revealed.size === items.length;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            {/* Confetti */}
            <AnimatePresence>
                {confetti.map((p) => (
                    <motion.div
                        key={p.id}
                        className="fixed pointer-events-none z-[100]"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: 8,
                            height: 8,
                            backgroundColor: p.color,
                            borderRadius: Math.random() > 0.5 ? '50%' : '0',
                        }}
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{
                            y: [0, -100 - Math.random() * 200, 400],
                            x: [(Math.random() - 0.5) * 200],
                            rotate: p.angle + 720,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 2 + Math.random(), ease: 'easeOut' }}
                    />
                ))}
            </AnimatePresence>

            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <p className="text-gold/50 font-mono tracking-[0.3em] uppercase text-xs mb-3">Error 404</p>
                    <h1 className="text-4xl md:text-6xl font-heading text-gold mb-4">
                        This Page Was Recalled in 1997
                    </h1>
                    <p className="text-cream/60 text-sm max-w-lg mx-auto">
                        But while you're here, let's see what's in the back of the pantry...
                    </p>
                </motion.div>

                {/* Counter */}
                <div className="text-center mb-6">
                    <p className="text-sm font-mono text-gold/60">
                        Items Found: <span className="text-gold">{revealed.size}</span> / {items.length}
                        {foundGolden && <span className="text-slime ml-2">🏆 Golden Spoon Found!</span>}
                    </p>
                </div>

                {/* Pantry Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                    {items.map((item, i) => {
                        const isRevealed = revealed.has(i);
                        const isGolden = item.type === 'golden' && isRevealed;

                        return (
                            <motion.button
                                key={i}
                                type="button"
                                onClick={() => revealItem(i)}
                                disabled={isRevealed}
                                whileHover={!isRevealed ? { scale: 1.05, borderColor: 'rgba(212,175,55,0.4)' } : {}}
                                whileTap={!isRevealed ? { scale: 0.95 } : {}}
                                className={`
                                    relative aspect-square rounded-xl border transition-all duration-300
                                    flex items-center justify-center text-4xl
                                    ${isRevealed
                                        ? isGolden
                                            ? 'border-gold/60 bg-gold/10 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                            : 'border-gold/20 bg-white/[0.03]'
                                        : 'border-gold/10 bg-merlot-dark/60 backdrop-blur-md cursor-pointer hover:bg-white/[0.05]'
                                    }
                                `}
                            >
                                <AnimatePresence mode="wait">
                                    {isRevealed ? (
                                        <motion.span
                                            key="revealed"
                                            initial={{ rotateY: 90, opacity: 0 }}
                                            animate={{ rotateY: 0, opacity: 1 }}
                                            transition={springs.bouncy}
                                        >
                                            {item.emoji}
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="hidden"
                                            exit={{ rotateY: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-gold/30 text-3xl font-heading"
                                        >
                                            ?
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Last revealed description */}
                <AnimatePresence mode="wait">
                    {lastRevealed !== null && (
                        <motion.div
                            key={lastRevealed}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`glass-panel-heavy rounded-xl border p-5 mb-8 text-center ${
                                items[lastRevealed].type === 'golden' ? 'border-gold/50' : 'border-gold/15'
                            }`}
                        >
                            <p className="text-2xl mb-2">{items[lastRevealed].emoji}</p>
                            <p className="text-lg font-heading text-gold mb-1">{items[lastRevealed].label}</p>
                            <p className="text-sm text-cream/70">{items[lastRevealed].description}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CTA */}
                {(foundGolden || allRevealed) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <p className="text-cream/60 text-sm mb-6">
                            {foundGolden
                                ? "You found the Golden Spoon! Your pantry-diving skills are unmatched."
                                : "You've explored every dark corner of the pantry. Brave soul."
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider hover:shadow-[0_8px_30px_rgba(212,175,55,0.5)] transition-all"
                            >
                                <span>✦</span> Return to The Cellar
                            </Link>
                            <Link
                                to="/quiz/"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gold/30 text-gold font-heading font-bold uppercase tracking-wider hover:border-gold/60 transition-all"
                            >
                                Take the Quiz Instead
                            </Link>
                        </div>
                    </motion.div>
                )}

                <p className="text-cream/25 text-[10px] font-mono mt-10 text-center">
                    No actual pantries were harmed in the making of this 404 page
                </p>
            </div>
        </div>
    );
};
