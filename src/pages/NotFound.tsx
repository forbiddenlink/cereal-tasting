import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen pt-40 pb-20 px-4 flex items-center">
            <div className="container mx-auto max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7 }}
                    className="glass-panel-heavy rounded-2xl border border-gold/20 p-10 md:p-14"
                >
                    <p className="text-gold/50 font-mono tracking-[0.3em] uppercase text-xs mb-3">404</p>
                    <h1 className="text-5xl md:text-7xl font-heading text-gold mb-4">Lost In The Cellar</h1>
                    <p className="text-cream/70 mb-8">
                        The vintage you requested is not currently in stock.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider"
                    >
                        Return Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};
