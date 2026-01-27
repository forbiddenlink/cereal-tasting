import React from 'react';
import type { Milk } from '../data/milks';

interface MilkSelectorProps {
    milks: Milk[];
    selectedMilkId: string | null;
    onSelect: (milk: Milk) => void;
}

export const MilkSelector: React.FC<MilkSelectorProps> = ({ milks, selectedMilkId, onSelect }) => {
    return (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent">
                {milks.map((milk) => (
                    <button
                        key={milk.id}
                        onClick={() => onSelect(milk)}
                        className={`
                            w-full group relative p-6 rounded-lg text-left transition-all duration-500 overflow-hidden
                            ${selectedMilkId === milk.id
                                ? 'bg-gradient-to-r from-merlot to-merlot-dark border border-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                                : 'bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-white/10'}
                        `}
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <span className={`font-heading text-lg transition-colors duration-300 ${selectedMilkId === milk.id ? 'text-gold' : 'text-cream group-hover:text-gold'}`}>
                                    {milk.name}
                                </span>
                                <div className="flex gap-3 text-[10px] font-mono mt-1 opacity-70">
                                    <span className="text-gold/80">FAT: {milk.fatContent}</span>
                                    <span className="text-gold/80">VISC: {milk.viscosity}</span>
                                </div>
                            </div>
                            {milk.type === 'experimental' && (
                                <span className="text-[10px] uppercase tracking-wider text-slime border border-slime/50 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                                    Exp.
                                </span>
                            )}
                        </div>

                        <p className="relative z-10 text-xs text-zinc-400 italic mt-3 border-t border-white/5 pt-2 group-hover:text-zinc-300 transition-colors">
                            "{milk.flavorNotes}"
                        </p>

                        {/* Hover Gradient Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${selectedMilkId === milk.id ? 'opacity-0' : ''}`} />
                    </button>
                ))}
        </div>
    );
};
