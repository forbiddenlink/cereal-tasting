import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
    "Consulting the ancient grain oracle...",
    "Negotiating with Tony the Tiger's agent...",
    "Carbon-dating this vintage box...",
    "Calibrating the crunch-o-meter...",
    "Summoning the ghost of breakfast past...",
    "Decanting the milk (yes, really)...",
    "Polishing the commemorative spoons...",
    "Verifying the marshmallow provenance...",
    "Cross-referencing the Geneva Cereal Convention...",
    "Waiting for the Count to finish counting...",
    "Interrogating a leprechaun about his charms...",
    "Alphabetizing the artificial colors...",
];

export const LoadingSpinner: React.FC = () => {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-void">
            <div className="text-center space-y-8">
                {/* Animated Spoon */}
                <motion.div
                    animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-8xl"
                >
                    🥄
                </motion.div>

                {/* Loading Text */}
                <div className="h-16">
                    <h2 className="text-2xl font-heading text-gold mb-2">
                        Curating your experience...
                    </h2>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={messageIndex}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm font-mono text-cream/60"
                        >
                            {LOADING_MESSAGES[messageIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Animated Dots */}
                <div className="flex gap-2 justify-center">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-3 h-3 bg-gold rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
