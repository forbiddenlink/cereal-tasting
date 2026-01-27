import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CEREALS, type Cereal } from '../data/mockData';
import { CerealCard } from '../components/CerealCard';
// Motion utilities available: springs, fadeInUp, staggerContainer
// Currently using inline animations for fine-grained control

interface HomeProps {
    onAddToCart: (cereal: Cereal) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    const { scrollY } = useScroll();

    // Parallax effects
    // Stable particles using useEffect
    const [particles, setParticles] = React.useState<Array<{ left: string, top: string, duration: number, delay: number }>>([]);

    React.useEffect(() => {
        setParticles([...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 2,
        })));
    }, []);

    // Parallax effects
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen pb-12 pt-20">
            {/* Hero Section */}
            <section className="relative h-[280px] md:h-[350px] flex items-center justify-center overflow-hidden">
                {/* Background with cereal-themed gradient */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-merlot via-void to-void" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {particles.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gold/30 rounded-full"
                            style={{
                                left: particle.left,
                                top: particle.top,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <motion.div
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="relative z-20 text-center px-4"
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading mb-4">
                            <span className="block text-gold drop-shadow-[0_4px_20px_rgba(212,175,55,0.5)]">Nostalgia.</span>
                            <span className="block text-3xl md:text-5xl lg:text-6xl font-serif italic text-cream/90 mt-2">Distilled.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm md:text-base text-gold/50 font-mono max-w-2xl mx-auto tracking-wider uppercase text-center"
                    >
                        A curated tasting experience for the discerning child at heart
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats Section - Fun Facts */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 -mt-16 mb-16"
            >
                <div className="container mx-auto px-4">
                    <div className="glass-panel-heavy rounded-2xl p-8 md:p-10 border border-gold/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Vintage Years', value: '1982-2003', symbol: '—' },
                                { label: 'Sugar Content', value: '12-22g', symbol: '◇' },
                                { label: 'Nostalgia Score', value: '99/100', symbol: '★' },
                                { label: 'Cavities Caused', value: '∞', symbol: '✦' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-center space-y-3 p-4"
                                >
                                    <div className="text-5xl font-heading text-gold/40">{stat.symbol}</div>
                                    <div className="text-3xl md:text-4xl font-heading text-gold tracking-tight">{stat.value}</div>
                                    <div className="text-xs text-cream/50 font-mono uppercase tracking-[0.15em] border-t border-gold/20 pt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Featured Collection */}
            <section className="container mx-auto px-4 relative z-10 mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-heading text-gold text-center mb-12 tracking-wide"
                >
                    THE COLLECTION
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
                    {CEREALS.map((cereal, index) => (
                        <motion.div
                            key={cereal.id}
                            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <CerealCard cereal={cereal} onAddToCart={onAddToCart} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
