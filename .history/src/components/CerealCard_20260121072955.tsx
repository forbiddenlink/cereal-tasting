import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Cereal } from '../data/mockData';
import React, { useRef, useState } from 'react';
import { CerealRating } from './CerealRating';

interface CerealCardProps {
    cereal: Cereal;
    onSelect?: (cereal: Cereal) => void;
    onAddToCart?: (cereal: Cereal) => void;
}

export const CerealCard: React.FC<CerealCardProps> = ({ cereal, onSelect, onAddToCart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [showDetails, setShowDetails] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(cereal);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        }
    };

    return (
        <motion.div
            ref={ref}
            style={{
                perspective: 1000,
            }}
            className="relative w-full max-w-xs mx-auto cursor-pointer group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
                setShowDetails(!showDetails);
                onSelect?.(cereal);
            }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative bg-merlot-dark/50 backdrop-blur-sm border border-gold/20 rounded-xl p-3 shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
                {/* Vintage Badge */}
                <div className="absolute -top-2 -right-2 z-20 bg-gold text-merlot font-heading font-bold px-2 py-0.5 text-xs rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                    Est. {cereal.vintage}
                </div>

                {/* Cereal Box Image */}
                <div
                    className="relative w-full max-w-[150px] mx-auto aspect-[3/4] mb-3 transform-style-3d group-hover:translate-z-10 transition-transform duration-500"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <img
                        src={`src/assets/${cereal.image}`}
                        alt={cereal.name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>

                {/* Content */}
                <div className="text-center transform-style-3d" style={{ transform: "translateZ(10px)" }}>
                    <h3 className="text-base font-heading text-gold mb-0.5 group-hover:text-cream transition-colors">
                        {cereal.name}
                    </h3>
                    <p className="text-[11px] font-mono text-zinc-400 mb-2">{cereal.region}</p>

                    <div className="flex justify-center gap-1.5 mb-2">
                        {cereal.tastingNotes.slice(0, 2).map((note, i) => (
                            <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-full text-cream/70">
                                {note}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-2">
                        <div className="text-left">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Price</p>
                            <p className="font-mono text-sm text-slime">${cereal.price.toFixed(2)}</p>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="relative bg-gradient-to-r from-gold to-gold-dim text-merlot px-3 py-2 rounded-lg font-bold text-xs hover:from-cream hover:to-gold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-gold/50 hover:scale-105"
                        >
                            {addedToCart ? (
                                <motion.span
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Added!
                                </motion.span>
                            ) : (
                                'Add to Cart'
                            )}
                        </button>
                    </div>

                    {/* Expandable Details */}
                    <motion.div
                        initial={false}
                        animate={{ height: showDetails ? 'auto' : 0, opacity: showDetails ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 mt-4 border-t border-white/10 space-y-4">
                            {/* Full Tasting Notes */}
                            <div>
                                <p className="text-xs text-gold/70 uppercase tracking-widest mb-2">Full Tasting Notes</p>
                                <ul className="space-y-1">
                                    {cereal.tastingNotes.map((note, i) => (
                                        <li key={i} className="text-xs text-cream/70 flex items-start gap-2">
                                            <span className="text-gold">•</span>
                                            {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technical Specs */}
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <p className="text-gold/70 uppercase tracking-widest mb-1">Decay Rate</p>
                                    <p className="text-cream font-mono">{cereal.specs.decayRate}s</p>
                                </div>
                                <div>
                                    <p className="text-gold/70 uppercase tracking-widest mb-1">Sugar</p>
                                    <p className="text-cream font-mono">{cereal.specs.sugarContent}g</p>
                                </div>
                            </div>

                            {/* Flavor Profile Bars */}
                            <div className="space-y-2">
                                <p className="text-xs text-gold/70 uppercase tracking-widest">Flavor Profile</p>
                                {Object.entries(cereal.flavor).map(([key, value]) => (
                                    <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-cream/60 capitalize">{key}</span>
                                            <span className="text-cream/90 font-mono">{value}</span>
                                        </div>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${value}%` }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-gold via-slime to-berry"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rating Component */}
                            <div className="pt-4">
                                <p className="text-xs text-gold/70 uppercase tracking-widest mb-3 text-center">Rate This Vintage</p>
                                <CerealRating cerealId={cereal.id} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};
