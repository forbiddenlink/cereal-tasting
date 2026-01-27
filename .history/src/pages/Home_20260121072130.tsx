import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CEREALS, type Cereal } from '../data/mockData';
import { CerealCard } from '../components/CerealCard';

interface HomeProps {
    onAddToCart: (cereal: Cereal) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    const { scrollY } = useScroll();
    
    // Parallax effects
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 500], [1, 1.2]);
    
    return (
        <div className="min-h-screen pb-20 pt-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <motion.div
                    style={{ scale: heroScale }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_90%)] z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=2623&auto=format&fit=crop"
                        alt="The Cereal Cellar"
                        className="w-full h-full object-cover opacity-20 filter blur-sm"
                    />
                </motion.div>

                {/* Floating particles */}
                <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gold/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
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
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-7xl md:text-9xl font-heading text-transparent bg-clip-text bg-gradient-to-b from-gold via-gold to-gold-dim drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] mb-8">
                            Nostalgia. <br />
                            <span className="font-serif italic text-cream bg-clip-text text-transparent bg-gradient-to-r from-cream to-white">Distilled.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gold/60 font-mono max-w-2xl mx-auto mb-16 tracking-wide"
                    >
                        A curated tasting experience for the discerning child at heart.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="animate-bounce text-gold/30 text-4xl">↓</div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats Section - Fun Facts */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 -mt-20 mb-12"
            >
                <div className="container mx-auto px-4">
                    <div className="glass-panel-heavy rounded-2xl p-6 md:p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Vintage Years', value: '1982-2003', icon: '🕰️' },
                                { label: 'Sugar Content', value: '12-22g', icon: '🍬' },
                                { label: 'Nostalgia Score', value: '99/100', icon: '💫' },
                                { label: 'Cavities Caused', value: '∞', icon: '🦷' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center space-y-2"
                                >
                                    <div className="text-4xl">{stat.icon}</div>
                                    <div className="text-2xl md:text-3xl font-heading text-gold">{stat.value}</div>
                                    <div className="text-xs md:text-sm text-cream/60 font-mono uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Featured Collection */}
            <section className="container mx-auto px-4 relative z-10 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CEREALS.map((cereal, index) => (
                        <motion.div
                            key={cereal.id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <CerealCard cereal={cereal} onAddToCart={onAddToCart} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
