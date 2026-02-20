import React from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CEREALS, type Cereal } from '../data/mockData';
import { CerealCard } from '../components/CerealCard';
// Motion utilities available: springs, fadeInUp, staggerContainer
// Currently using inline animations for fine-grained control

interface HomeProps {
    onAddToCart: (cereal: Cereal) => void;
}

type SortBy = 'price' | 'vintage' | 'nostalgia' | 'name';
type FilterPriceRange = 'all' | 'budget' | 'premium' | 'luxury';

const FILTER_OPTIONS: Array<{ value: FilterPriceRange; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'budget', label: '< $500' },
    { value: 'premium', label: '$500-$1000' },
    { value: 'luxury', label: '> $1000' },
];

const SORT_OPTIONS: Array<{ value: SortBy; label: string }> = [
    { value: 'vintage', label: 'Vintage' },
    { value: 'price', label: 'Price' },
    { value: 'nostalgia', label: 'Nostalgia' },
    { value: 'name', label: 'Name' },
];

const DEFAULT_SORT: SortBy = 'vintage';
const DEFAULT_FILTER: FilterPriceRange = 'all';

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
    const { scrollY } = useScroll();
    const shouldReduceMotion = useReducedMotion();
    const [searchParams, setSearchParams] = useSearchParams();
    const [spotlight, setSpotlight] = React.useState({ x: 50, y: 50 });

    // Filtering, sorting, and compare mode state
    const [compareMode, setCompareMode] = React.useState(false);
    const [compareSelection, setCompareSelection] = React.useState<string[]>([]);

    const sortBy: SortBy = React.useMemo(() => {
        const candidate = searchParams.get('sort');
        if (SORT_OPTIONS.some((option) => option.value === candidate)) {
            return candidate as SortBy;
        }
        return DEFAULT_SORT;
    }, [searchParams]);

    const filterPriceRange: FilterPriceRange = React.useMemo(() => {
        const candidate = searchParams.get('price');
        if (FILTER_OPTIONS.some((option) => option.value === candidate)) {
            return candidate as FilterPriceRange;
        }
        return DEFAULT_FILTER;
    }, [searchParams]);

    const updateSearchParam = (key: 'sort' | 'price', value: SortBy | FilterPriceRange) => {
        const next = new URLSearchParams(searchParams);
        next.set(key, value);
        setSearchParams(next, { replace: true });
    };

    React.useEffect(() => {
        if (!compareMode) {
            setCompareSelection([]);
        }
    }, [compareMode]);

    // Stable particles using useEffect
    const [particles, setParticles] = React.useState<Array<{ left: string, top: string, duration: number, delay: number }>>([]);

    React.useEffect(() => {
        if (shouldReduceMotion) {
            setParticles([]);
            return;
        }

        setParticles([...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 2,
        })));
    }, [shouldReduceMotion]);

    // Filter and sort cereals
    const filteredCereals = React.useMemo(() => {
        let filtered = [...CEREALS];

        // Apply price filter
        if (filterPriceRange !== 'all') {
            filtered = filtered.filter(c => {
                if (filterPriceRange === 'budget') return c.price < 500;
                if (filterPriceRange === 'premium') return c.price >= 500 && c.price < 1000;
                if (filterPriceRange === 'luxury') return c.price >= 1000;
                return true;
            });
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'vintage') return a.vintage - b.vintage;
            if (sortBy === 'nostalgia') return b.flavor.nostalgia - a.flavor.nostalgia;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            return 0;
        });

        return filtered;
    }, [sortBy, filterPriceRange]);

    const selectedCompareCereals = React.useMemo(
        () => CEREALS.filter((cereal) => compareSelection.includes(cereal.id)),
        [compareSelection]
    );

    const toggleCompareSelection = (cerealId: string) => {
        setCompareSelection((prev) => {
            if (prev.includes(cerealId)) {
                return prev.filter((id) => id !== cerealId);
            }

            if (prev.length >= 2) {
                return [prev[1], cerealId];
            }

            return [...prev, cerealId];
        });
    };

    // Parallax effects
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen py-24">
            {/* Hero Section */}
            <section
                className="relative min-h-[450px] flex flex-col items-center justify-center overflow-hidden"
                onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    setSpotlight({ x, y });
                }}
                onMouseLeave={() => setSpotlight({ x: 50, y: 50 })}
            >
                {/* Background with cereal-themed gradient */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-merlot via-void to-void" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent" />
                    <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                            background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(212, 175, 55, 0.22), transparent 38%)`,
                        }}
                    />
                </div>

                {/* Floating particles */}
                {!shouldReduceMotion && (
                    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                        {particles.map((particle, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-gold/30 rounded-full"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                }}
                                animate={{
                                    y: [0, -100, 0],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{
                                    duration: particle.duration,
                                    repeat: Infinity,
                                    delay: particle.delay,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Floating Banner (Moved Above Title) */}
                <div className="relative w-full bg-gradient-to-r from-merlot-dark/80 via-merlot/50 to-merlot-dark/80 border-y border-gold/10 py-2 z-30 overflow-hidden mb-8">
                    <div className="marquee-track">
                        <span>Vintage Crunch Index</span>
                        <span>•</span>
                        <span>Laboratory Pairings</span>
                        <span>•</span>
                        <span>Collector Editions</span>
                        <span>•</span>
                        <span>Peak Nostalgia Assurance</span>
                        <span>•</span>
                        <span aria-hidden="true">Vintage Crunch Index</span>
                        <span aria-hidden="true">•</span>
                        <span aria-hidden="true">Laboratory Pairings</span>
                        <span aria-hidden="true">•</span>
                        <span aria-hidden="true">Collector Editions</span>
                        <span aria-hidden="true">•</span>
                        <span aria-hidden="true">Peak Nostalgia Assurance</span>
                        <span aria-hidden="true">•</span>
                    </div>
                </div>

                {/* Content */}
                <motion.div
                    style={shouldReduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
                    className="relative z-20 text-center px-4"
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading mb-4">
                            <span className="block text-cream/90 drop-shadow-2xl">Nostalgia.</span>
                            <span className="block text-3xl md:text-5xl lg:text-6xl font-serif italic text-gold mt-2">Distilled.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm md:text-base text-gold/50 font-mono max-w-2xl mx-auto tracking-wider uppercase text-center"
                    >
                        A curated tasting experience for the discerning child at heart
                    </motion.p>
                </motion.div>
            </section>

            {/* Stats Section - Fun Facts */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 -mt-16 mb-16"
            >
                <div className="w-full border-y border-white/5 bg-void py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Vintage Years', value: '1982-2003', symbol: '—' },
                                { label: 'Sugar Content', value: '12-22g', symbol: '◇' },
                                { label: 'Nostalgia Score', value: '99/100', symbol: '★' },
                                { label: 'Cavities Caused', value: '∞', symbol: '✦' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-center space-y-3 p-4"
                                >
                                    <div className="text-5xl font-heading text-gold/40">{stat.symbol}</div>
                                    <div className="text-3xl md:text-4xl font-heading text-gold tracking-tight">{stat.value}</div>
                                    <div className="text-xs text-cream/50 font-mono uppercase tracking-[0.15em] border-t border-gold/20 pt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Filters and Sorting */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 mb-12"
            >
                <div className="p-8 flex flex-wrap gap-4 items-center justify-between bg-merlot-dark/40 backdrop-blur-md rounded-xl border border-gold/10">
                    {/* Price Filter */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-gold/60 text-sm font-mono uppercase tracking-wider mr-2 self-center">Filter:</span>
                        {FILTER_OPTIONS.map((filter) => (
                            <motion.button
                                key={filter.value}
                                onClick={() => updateSearchParam('price', filter.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide transition-all duration-300 border ${
                                    filterPriceRange === filter.value
                                        ? 'border-gold text-gold bg-gold/10'
                                        : 'border-white/10 text-cream/70 hover:border-gold/30 hover:text-gold bg-transparent'
                                }`}
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {filter.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Sort Options */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-gold/60 text-sm font-mono uppercase tracking-wider mr-2 self-center">Sort:</span>
                        {SORT_OPTIONS.map((sort) => (
                            <motion.button
                                key={sort.value}
                                onClick={() => updateSearchParam('sort', sort.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide transition-all duration-300 border ${
                                    sortBy === sort.value
                                        ? 'border-gold text-gold bg-gold/10'
                                        : 'border-white/10 text-cream/70 hover:border-gold/30 hover:text-gold bg-transparent'
                                }`}
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {sort.label}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Compare Mode */}
            <section className="container mx-auto px-4 mb-10">
                <div className="glass-panel-heavy rounded-xl border border-gold/15 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-heading text-gold mb-1">Collector Compare Mode</h3>
                        <p className="text-xs font-mono text-cream/60 uppercase tracking-wider">
                            Select up to two cereals and compare crunch, sweetness, nostalgia, and price
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setCompareMode((prev) => !prev)}
                        className={`px-4 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wide border transition-all ${
                            compareMode
                                ? 'bg-gold/20 text-gold border-gold/50'
                                : 'bg-merlot-dark/50 text-gold/70 border-gold/25 hover:border-gold/50'
                        }`}
                    >
                        {compareMode ? 'Exit Compare' : 'Enable Compare'}
                    </button>
                </div>
            </section>

            {compareMode && selectedCompareCereals.length === 2 && (
                <section className="container mx-auto px-4 mb-12">
                    <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-6 md:p-8">
                        <h3 className="text-2xl font-heading text-gold mb-6 text-center">Head-to-Head Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {selectedCompareCereals.map((cereal) => (
                                <div key={cereal.id} className="rounded-xl border border-gold/20 bg-merlot-dark/30 p-5">
                                    <h4 className="text-xl font-heading text-gold mb-1">{cereal.name}</h4>
                                    <p className="text-xs font-mono text-gold/60 mb-4">Vintage {cereal.vintage}</p>
                                    <p className="text-sm text-cream/75 mb-4">${cereal.price.toFixed(2)}</p>
                                    <div className="space-y-2 text-xs font-mono text-cream/70">
                                        <p>Crunch: {cereal.flavor.crunch}</p>
                                        <p>Sweetness: {cereal.flavor.sweetness}</p>
                                        <p>Nostalgia: {cereal.flavor.nostalgia}</p>
                                        <p>Particulate: {cereal.flavor.particulate}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-cream/55 font-mono uppercase tracking-wider">
                            Difference in price: $
                            {Math.abs(selectedCompareCereals[0].price - selectedCompareCereals[1].price).toFixed(2)}
                        </p>
                    </div>
                </section>
            )}

            {/* Featured Collection */}
            <section className="container mx-auto px-4 relative z-10 mb-16 mt-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-heading text-gold text-center mb-12 tracking-wide"
                >
                    THE COLLECTION
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
                    {filteredCereals.map((cereal, index) => (
                        <motion.div
                            key={cereal.id}
                            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {compareMode && (
                                <button
                                    type="button"
                                    onClick={() => toggleCompareSelection(cereal.id)}
                                    className={`w-full mb-3 px-3 py-2 rounded-md text-[10px] font-mono uppercase tracking-wider border transition-colors ${
                                        compareSelection.includes(cereal.id)
                                            ? 'border-gold text-gold bg-gold/10'
                                            : 'border-gold/30 text-gold/60 hover:border-gold/60'
                                    }`}
                                >
                                    {compareSelection.includes(cereal.id) ? 'Selected For Compare' : 'Select For Compare'}
                                </button>
                            )}
                            <CerealCard cereal={cereal} onAddToCart={onAddToCart} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};
