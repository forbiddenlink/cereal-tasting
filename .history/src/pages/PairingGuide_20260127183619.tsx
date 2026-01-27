import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CEREALS, type Cereal } from '../data/mockData';
import { MILKS, type Milk } from '../data/milks';
import { MilkSelector } from '../components/MilkSelector';
import { PairingCard } from '../components/PairingCard';

export const PairingGuide: React.FC = () => {
    const [selectedCereal, setSelectedCereal] = useState<Cereal>(CEREALS[0]);
    const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);

    return (
        <div className="min-h-screen pt-40 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-block mb-6">
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-6 leading-tight">
                        The Sommelier's <br className="md:hidden"/>
                        <span className="italic text-cream">Pairing Guide</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gold/60 font-mono text-sm md:text-base leading-relaxed px-4">
                        A precise calibration of viscosity against crunch. We simulate the degradation rate
                        of the cereal matrix when introduced to various solvents. Choose wisely.
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8"></div>
                </motion.header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Cereal Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3"
                    >
                        <div className="glass-panel-heavy p-6 rounded-2xl border-2 border-gold/20 sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-lg text-void font-heading font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-heading text-gold">Select Vintage</h3>
                            </div>
                            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
                                {CEREALS.map((cereal) => (
                                    <motion.button
                                        key={cereal.id}
                                        onClick={() => {
                                            setSelectedCereal(cereal);
                                            setSelectedMilk(null);
                                        }}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`
                                            w-full group p-4 text-left rounded-lg border-2 transition-all duration-300 relative overflow-hidden
                                            ${selectedCereal.id === cereal.id
                                                ? 'bg-gradient-to-br from-gold/20 to-gold-dim/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                                                : 'bg-merlot-dark/30 border-gold/10 hover:border-gold/30 hover:bg-merlot/40'}
                                        `}
                                    >
                                        <div className="relative z-10">
                                            <span className={`font-heading text-base block mb-1 transition-colors ${selectedCereal.id === cereal.id ? 'text-gold' : 'text-cream/80 group-hover:text-gold'}`}>
                                                {cereal.name}
                                            </span>
                                            <span className="text-xs font-mono text-gold/50">Vintage {cereal.vintage}</span>
                                        </div>
                                        {selectedCereal.id === cereal.id && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <div className="w-2 h-2 rounded-full bg-gold"></div>
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Middle Column: The Stage */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-5"
                    >
                        <PairingCard cereal={selectedCereal} milk={selectedMilk} />
                    </motion.div>

                    {/* Right Column: Milk Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-4"
                    >
                        <div className="glass-panel-heavy p-6 rounded-2xl border-2 border-gold/20 sticky top-24">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center">
                                    <span className="text-lg text-void font-heading font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-heading text-gold">Select Your Solvent</h3>
                            </div>
                            <MilkSelector
                                milks={MILKS}
                                selectedMilkId={selectedMilk?.id || null}
                                onSelect={setSelectedMilk}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
