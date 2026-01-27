import React from 'react';
import { motion } from 'framer-motion';
import { CEREALS, type Cereal } from '../data/mockData';
import { CerealCard } from '../components/CerealCard';

interface HomeProps {
    onAddToCart: (cereal: Cereal) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    return (
        <div className="min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-void)_90%)] z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=2623&auto=format&fit=crop"
                        alt="The Cereal Cellar"
                        className="w-full h-full object-cover opacity-10 filter blur-[2px]"
                    />
                </motion.div>

                {/* Content */}
                <div className="relative z-20 text-center px-4">
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
                </div>
            </section>

            {/* Featured Collection */}
            <section className="container mx-auto px-4 relative z-10 -mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
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
