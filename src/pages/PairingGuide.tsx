import React, { useState } from 'react';
import { CEREALS, type Cereal } from '../data/mockData';
import { MILKS, type Milk } from '../data/milks';
import { MilkSelector } from '../components/MilkSelector';
import { PairingCard } from '../components/PairingCard';

export const PairingGuide: React.FC = () => {
    const [selectedCereal, setSelectedCereal] = useState<Cereal>(CEREALS[0]);
    const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);

    return (
        <div className="min-h-[80vh] container pt-20 pb-20">
            <header className="mb-16 text-center">
                <h1 className="text-5xl md:text-7xl font-heading text-gold mb-6">
                    The Sommelier's <br />
                    <span className="italic text-white opacity-80">Pairing Guide</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gold/60 font-mono text-sm leading-relaxed">
                    A precise calibration of viscosity against crunch. We simulate the degradation rate
                    of the cereal matrix when introduced to various solvents. Choose wisely.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Column: Cereal Selection */}
                <div className="lg:col-span-3 space-y-4">
                    <h3 className="text-xl font-heading text-gold mb-4">Select Vintage</h3>
                    <div className="flex flex-col gap-2">
                        {CEREALS.map((cereal) => (
                            <button
                                key={cereal.id}
                                onClick={() => {
                                    setSelectedCereal(cereal);
                                    setSelectedMilk(null); // Reset milk on cereal change
                                }}
                                className={`
                                    group p-4 text-left rounded-lg border transition-all duration-300 relative overflow-hidden
                                    ${selectedCereal.id === cereal.id
                                        ? 'bg-gradient-to-r from-merlot to-merlot-dark border-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-gold/30 hover:bg-white/10'}
                                `}
                            >
                                <div className="relative z-10">
                                    <span className={`font-heading text-lg block transition-colors ${selectedCereal.id === cereal.id ? 'text-gold' : 'group-hover:text-gold'}`}>
                                        {cereal.name}
                                    </span>
                                    <span className="text-xs font-mono opacity-50 block mt-1">Vintage {cereal.vintage}</span>
                                </div>

                                {/* Hover Gradient (Subtle) */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selectedCereal.id === cereal.id ? 'opacity-0' : ''}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Middle Column: The Stage */}
                <div className="lg:col-span-5">
                    <PairingCard cereal={selectedCereal} milk={selectedMilk} />
                </div>

                {/* Right Column: Milk Selection */}
                <div className="lg:col-span-4">
                    <MilkSelector
                        milks={MILKS}
                        selectedMilkId={selectedMilk?.id || null}
                        onSelect={setSelectedMilk}
                    />
                </div>
            </div>
        </div>
    );
};
