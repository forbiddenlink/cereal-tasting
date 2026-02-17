import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import type { Cereal } from '../data/mockData';
import React, { useEffect, useRef, useState } from 'react';
import { CerealRating } from './CerealRating';
import { springs } from '../utils/motion';
import cerealFallback from '../assets/cereal-fallback.svg';

interface CerealCardProps {
    cereal: Cereal;
    onSelect?: (cereal: Cereal) => void;
    onAddToCart?: (cereal: Cereal) => void;
}

export const CerealCard: React.FC<CerealCardProps> = ({ cereal, onSelect, onAddToCart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const addedToCartTimeoutRef = useRef<number | null>(null);
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
            if (addedToCartTimeoutRef.current !== null) {
                window.clearTimeout(addedToCartTimeoutRef.current);
            }
            addedToCartTimeoutRef.current = window.setTimeout(() => {
                setAddedToCart(false);
                addedToCartTimeoutRef.current = null;
            }, 2000);
        }
    };

    useEffect(() => {
        return () => {
            if (addedToCartTimeoutRef.current !== null) {
                window.clearTimeout(addedToCartTimeoutRef.current);
            }
        };
    }, []);

    const handleCardToggle = () => {
        setShowDetails((prev) => !prev);
        onSelect?.(cereal);
    };

    return (
        <motion.div
            ref={ref}
            className="relative w-full h-full cursor-pointer group [perspective:1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardToggle}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardToggle();
                }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={showDetails}
            aria-controls={`details-${cereal.id}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    padding: '1.5rem',
                }}
                className="relative bg-gradient-to-br from-merlot/80 to-void/90 backdrop-blur-sm border border-gold/20 rounded-xl shadow-2xl group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] h-full flex flex-col"
                whileHover={{ boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}
                transition={springs.smooth}
            >
                {/* Vintage Badge */}
                <div className="absolute -top-3 -right-3 z-20 bg-gold text-void font-heading font-bold px-3 py-1 text-xs rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5)] border-2 border-void/20 transform rotate-12 group-hover:rotate-0 transition-all duration-300 group-hover:scale-110">
                    {cereal.vintage}
                </div>

                {/* Cereal Box Image */}
                <div
                    className="relative w-full h-48 mx-auto mb-3 flex items-center justify-center overflow-hidden"
                >
                    <img
                        src={cereal.image}
                        alt={cereal.name}
                        className="max-w-[160px] max-h-[180px] w-auto h-auto object-contain drop-shadow-2xl"
                        onError={(e) => {
                            e.currentTarget.src = cerealFallback;
                        }}
                    />
                </div>

                {/* Content */}
                <div className="text-center transform-style-3d transform-[translateZ(10px)] flex-1 flex flex-col">
                    <h3 className="text-lg font-heading text-gold mb-2 group-hover:text-cream transition-colors leading-tight tracking-wide">
                        {cereal.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gold/40 uppercase tracking-wider mb-4">{cereal.region}</p>

                    <div className="flex justify-center gap-2 mb-5 flex-wrap">
                        {cereal.tastingNotes.slice(0, 2).map((note, i) => (
                            <span key={`note-${cereal.id}-${i}`} className="text-[9px] bg-gold/10 border border-gold/20 px-2 py-1 rounded-md text-cream/80 font-mono">
                                {note}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-gold/10 pt-4 mt-auto">
                        <div className="text-left">
                            <p className="text-[9px] text-gold/40 uppercase tracking-widest font-mono mb-0.5">Price</p>
                            <p className="font-mono text-base text-slime font-bold">${cereal.price.toFixed(2)}</p>
                        </div>
                        <motion.button
                            onClick={handleAddToCart}
                            className="relative z-30 transform-[translateZ(30px)] bg-gradient-to-br from-gold via-gold-dim to-[#8B7000] text-void px-5 py-3 rounded-lg font-heading font-bold text-sm uppercase tracking-wider overflow-hidden shadow-[0_8px_24px_rgba(212,175,55,0.5)] border-2 border-gold-dim/40 hover:border-gold transition-all duration-300"
                            whileHover={{ 
                                scale: 1.08, 
                                y: -2,
                                boxShadow: '0 12px 40px rgba(212,175,55,0.7)',
                                borderColor: 'rgba(212,175,55,0.8)'
                            }}
                            whileTap={{ scale: 0.96, y: 0 }}
                            transition={springs.snappy}
                        >
                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                            />
                            <AnimatePresence mode="wait">
                                {addedToCart ? (
                                    <motion.span
                                        key="added"
                                        initial={{ y: 12, opacity: 0, filter: 'blur(4px)' }}
                                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ y: -12, opacity: 0, filter: 'blur(4px)' }}
                                        transition={springs.snappy}
                                        className="flex items-center justify-center gap-2 relative z-10"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="font-extrabold">Added!</span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="add"
                                        initial={{ y: 12, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -12, opacity: 0 }}
                                        transition={springs.snappy}
                                        className="flex items-center justify-center gap-2 relative z-10"
                                    >
                                        <span className="font-extrabold">Add to Cart</span>
                                        <motion.span
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 3 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Expandable Details */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: showDetails ? 'auto' : 0,
                            opacity: showDetails ? 1 : 0,
                        }}
                        transition={springs.smooth}
                        className="overflow-hidden"
                        id={`details-${cereal.id}`}
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
                                                animate={{ width: showDetails ? `${value}%` : 0 }}
                                                transition={{ ...springs.bouncy, delay: 0.15 }}
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
