import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CEREALS, type Cereal } from '../data/mockData';
import { CerealCard } from '../components/CerealCard';
import {
    CRUNCH_INDEX_TICKS,
    JACQUES_QUOTES,
    cerealOfTheDayIndex,
    compareVerdict,
} from '../data/jacques';

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

    const compareResult = React.useMemo(() => {
        if (selectedCompareCereals.length !== 2) return null;
        return compareVerdict(selectedCompareCereals[0], selectedCompareCereals[1]);
    }, [selectedCompareCereals]);

    const dailyCereal = React.useMemo(() => {
        const idx = cerealOfTheDayIndex() % CEREALS.length;
        return CEREALS[idx];
    }, []);

    const jacquesLine = React.useMemo(
        () => JACQUES_QUOTES[cerealOfTheDayIndex() % JACQUES_QUOTES.length],
        []
    );

    const [tickerIndex, setTickerIndex] = React.useState(0);
    React.useEffect(() => {
        if (shouldReduceMotion) return;
        const id = window.setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % CRUNCH_INDEX_TICKS.length);
        }, 3200);
        return () => window.clearInterval(id);
    }, [shouldReduceMotion]);

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
                    {shouldReduceMotion ? (
                        <div className="text-center text-[11px] font-mono text-gold/70 uppercase tracking-wider px-4">
                            {CRUNCH_INDEX_TICKS[tickerIndex]}
                        </div>
                    ) : (
                        <div className="marquee-track">
                            {[...CRUNCH_INDEX_TICKS, ...CRUNCH_INDEX_TICKS].map((tick, i) => (
                                <React.Fragment key={`${tick}-${i}`}>
                                    <span aria-hidden={i >= CRUNCH_INDEX_TICKS.length}>{tick}</span>
                                    <span aria-hidden="true">•</span>
                                </React.Fragment>
                            ))}
                        </div>
                    )}
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
                        We age breakfast like wine and price it like regret
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="mt-5 text-xs text-cream/40 font-mono italic max-w-lg mx-auto"
                    >
                        “{jacquesLine}” — Jacques
                    </motion.p>
                </motion.div>
            </section>

            {/* Cereal of the Day */}
            <section className="container mx-auto px-4 relative z-20 -mt-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel-heavy rounded-2xl border border-gold/20 p-5 md:p-7 flex flex-col md:flex-row items-center gap-6"
                >
                    <img
                        src={dailyCereal.image}
                        alt={dailyCereal.name}
                        className="w-24 h-24 object-contain drop-shadow-xl"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-[10px] font-mono text-slime uppercase tracking-[0.25em] mb-1">
                            Today&apos;s Mandated Bowl
                        </p>
                        <h2 className="text-2xl md:text-3xl font-heading text-gold mb-1">{dailyCereal.name}</h2>
                        <p className="text-xs font-mono text-gold/50 mb-2">
                            Vintage {dailyCereal.vintage} · {dailyCereal.region}
                        </p>
                        <p className="text-sm text-cream/65 max-w-xl">
                            {dailyCereal.tastingNotes[0]}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => onAddToCart(dailyCereal)}
                            className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-xs"
                        >
                            Claim Today&apos;s Bowl
                        </button>
                        <Link
                            to="/quiz/"
                            className="px-5 py-2.5 rounded-lg border border-gold/30 text-gold font-heading font-bold uppercase tracking-wider text-xs text-center hover:border-gold/60 transition-colors"
                        >
                            Or Find Your Soul
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Stats folded into ticker — keep hero lean */}

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
                                type="button"
                                aria-pressed={filterPriceRange === filter.value}
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
                                type="button"
                                aria-pressed={sortBy === sort.value}
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
                        <h3 className="text-lg font-heading text-gold mb-1">Duel of the Bowls</h3>
                        <p className="text-xs font-mono text-cream/60 uppercase tracking-wider">
                            Pick two. Jacques will declare a winner. Feelings may be hurt.
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
                        {compareMode ? 'Sheathe the Spoons' : 'Begin the Duel'}
                    </button>
                </div>
            </section>

            {compareMode && selectedCompareCereals.length === 2 && compareResult && (
                <section className="container mx-auto px-4 mb-12">
                    <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-6 md:p-8">
                        <h3 className="text-2xl font-heading text-gold mb-2 text-center">Head-to-Head Analysis</h3>
                        <p className="text-center text-xs font-mono text-slime uppercase tracking-wider mb-6">
                            Winner: {compareResult.winner}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {selectedCompareCereals.map((cereal) => (
                                <div
                                    key={cereal.id}
                                    className={`rounded-xl border p-5 ${
                                        cereal.name === compareResult.winner
                                            ? 'border-gold/50 bg-gold/10'
                                            : 'border-gold/20 bg-merlot-dark/30'
                                    }`}
                                >
                                    <h4 className="text-xl font-heading text-gold mb-1">{cereal.name}</h4>
                                    <p className="text-xs font-mono text-gold/60 mb-4">Vintage {cereal.vintage}</p>
                                    <p className="text-sm text-cream/75 mb-4">${cereal.price.toFixed(2)}</p>
                                    <div className="space-y-2 text-xs font-mono text-cream/70">
                                        <p>Crunch: {cereal.flavor.crunch}</p>
                                        <p>Sweetness: {cereal.flavor.sweetness}</p>
                                        <p>Nostalgia: {cereal.flavor.nostalgia}</p>
                                        <p>Particulate: {cereal.flavor.particulate}</p>
                                        <p>Sog clock: {cereal.specs.decayRate}s</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-xl border border-gold/15 bg-white/[0.03] p-5 text-center">
                            <p className="text-lg font-heading text-cream mb-2">{compareResult.headline}</p>
                            <p className="text-sm text-cream/70 leading-relaxed max-w-2xl mx-auto">{compareResult.body}</p>
                            <p className="text-[10px] font-mono text-gold/40 mt-4 uppercase tracking-wider">
                                Price gap: $
                                {Math.abs(selectedCompareCereals[0].price - selectedCompareCereals[1].price).toFixed(2)}
                                {' '}· filed with the Bureau of Breakfast Grievances
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {compareMode && selectedCompareCereals.length < 2 && (
                <p className="container mx-auto px-4 mb-8 text-center text-xs font-mono text-gold/50 uppercase tracking-wider">
                    Select {2 - selectedCompareCereals.length} more cereal{selectedCompareCereals.length === 1 ? '' : 's'} to force a verdict
                </p>
            )}

            {/* Featured Collection */}
            <section className="container mx-auto px-4 relative z-10 mb-16 mt-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-heading text-gold text-center mb-4 tracking-wide"
                >
                    THE COLLECTION
                </motion.h2>
                <p className="text-center text-xs font-mono text-cream/40 uppercase tracking-wider mb-12">
                    {filteredCereals.length} vintage{filteredCereals.length === 1 ? '' : 's'} currently uncorked
                </p>
                {filteredCereals.length === 0 ? (
                    <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-10 text-center max-w-xl mx-auto">
                        <p className="text-2xl font-heading text-gold mb-3">The Cellar Rejects Your Filter</p>
                        <p className="text-sm text-cream/60 mb-6">
                            No boxes survived that combination of snobbery. Jacques suggests lowering your standards or raising your budget.
                        </p>
                        <button
                            type="button"
                            onClick={() => updateSearchParam('price', 'all')}
                            className="px-5 py-2.5 rounded-lg border border-gold/40 text-gold text-xs font-heading font-bold uppercase tracking-wider hover:bg-gold/10 transition-colors"
                        >
                            Show All Vintages
                        </button>
                    </div>
                ) : (
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
                                    {compareSelection.includes(cereal.id) ? 'In the Arena' : 'Challenge'}
                                </button>
                            )}
                            <CerealCard cereal={cereal} onAddToCart={onAddToCart} />
                        </motion.div>
                    ))}
                </div>
                )}
            </section>
        </div>
    );
};
