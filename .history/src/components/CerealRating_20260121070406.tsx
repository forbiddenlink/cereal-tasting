import { motion } from 'framer-motion';
import { useState } from 'react';

interface CerealRatingProps {
    cerealId: string;
    initialRating?: number;
}

export const CerealRating: React.FC<CerealRatingProps> = ({ cerealId, initialRating = 0 }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleRate = (value: number) => {
        setRating(value);
        setSubmitted(true);
        
        // Reset submitted state after 2 seconds
        setTimeout(() => setSubmitted(false), 2000);
    };

    const ratingLabels = [
        "Soggy Disappointment",
        "Breakfast Regret",
        "Mediocre Morning",
        "Acceptable Crunch",
        "Nostalgic Perfection"
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => {
                    const filled = star <= (hoverRating || rating);
                    
                    return (
                        <motion.button
                            key={star}
                            onHoverStart={() => setHoverRating(star)}
                            onHoverEnd={() => setHoverRating(0)}
                            onClick={() => handleRate(star)}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative focus:outline-none"
                        >
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: filled ? [1, 1.2, 1] : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <svg
                                    className={`w-8 h-8 transition-colors ${
                                        filled ? 'text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-white/20'
                                    }`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </motion.div>
                        </motion.button>
                    );
                })}
            </div>
            
            {(hoverRating || rating) > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <p className="text-xs font-mono text-gold/80">
                        {ratingLabels[(hoverRating || rating) - 1]}
                    </p>
                </motion.div>
            )}
            
            {submitted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <span className="text-sm text-slime font-mono">
                        ✓ Your refined palate has been recorded
                    </span>
                </motion.div>
            )}
        </div>
    );
};
