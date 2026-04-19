import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GENERATION_MESSAGES = [
    "Verifying credentials...",
    "Consulting the Grand Council of Grain...",
    "Embossing your name in breakfast history...",
];

function hashName(name: string): string {
    let hash = 0;
    for (const char of name) {
        hash = ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    }
    return `CSC-${String(Math.abs(hash) % 999999).padStart(6, '0')}`;
}

function formatDate(): string {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const ordinal = (n: number) => {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    const now = new Date();
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
        'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const year = now.getFullYear();
    const century = Math.floor(year / 100);
    const remainder = year % 100;
    const centuryWord = remainder < 20 ? ones[remainder] : `${tens[Math.floor(remainder / 10)]}${remainder % 10 ? '-' + ones[remainder % 10] : ''}`;
    const yearWord = `${ones[century] || century} Thousand ${centuryWord ? `and ${centuryWord}` : ''}`.trim();

    return `${months[now.getMonth()]} the ${ordinal(now.getDate())}, ${yearWord}`;
}

type Stage = 'input' | 'generating' | 'display';

export function Certificate() {
    const [stage, setStage] = useState<Stage>('input');
    const [name, setName] = useState('');
    const [generatingMsg, setGeneratingMsg] = useState(0);
    const [copied, setCopied] = useState(false);
    const certRef = useRef<HTMLDivElement>(null);

    const certNumber = useMemo(() => hashName(name), [name]);

    const handleGenerate = () => {
        if (!name.trim()) return;
        setStage('generating');
        let idx = 0;
        const interval = setInterval(() => {
            idx++;
            if (idx >= GENERATION_MESSAGES.length) {
                clearInterval(interval);
                setStage('display');
            } else {
                setGeneratingMsg(idx);
            }
        }, 900);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(
            `I am now a Certified Cereal Sommelier (Certificate #${certNumber}). Please address me accordingly. 🥄`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <AnimatePresence mode="wait">
                    {stage === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-10 md:p-14">
                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
                                <p className="text-gold/50 font-mono tracking-[0.3em] uppercase text-xs mb-4">
                                    The Certification Ceremony
                                </p>
                                <h1 className="text-4xl md:text-5xl font-heading text-gold mb-4">
                                    Become Certified
                                </h1>
                                <p className="text-cream/60 text-sm mb-10 max-w-md mx-auto">
                                    Few are called. Fewer respond. Even fewer spell their name correctly.
                                </p>

                                <div className="max-w-sm mx-auto mb-8">
                                    <label htmlFor="cert-name" className="block text-[10px] font-mono text-gold/60 uppercase tracking-widest mb-2 text-left">
                                        Your Legal(ish) Name
                                    </label>
                                    <input
                                        id="cert-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                        placeholder="Enter your name"
                                        className="w-full bg-white/[0.03] border-2 border-gold/30 rounded-xl px-5 py-4 text-cream text-center font-heading text-xl placeholder:text-cream/20 focus:outline-none focus:border-gold/60 transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={handleGenerate}
                                    disabled={!name.trim()}
                                    whileHover={name.trim() ? { scale: 1.05, y: -2 } : {}}
                                    whileTap={name.trim() ? { scale: 0.95 } : {}}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Begin Certification
                                </motion.button>

                                <p className="text-cream/25 text-[10px] font-mono mt-6">
                                    This certificate is recognized by 0 governing bodies worldwide
                                </p>
                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8" />
                            </div>
                        </motion.div>
                    )}

                    {stage === 'generating' && (
                        <motion.div
                            key="generating"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            {/* Wax seal spinner */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                className="w-24 h-24 rounded-full border-2 border-gold/30 border-t-gold mx-auto mb-8 flex items-center justify-center"
                            >
                                <span className="text-3xl">🔏</span>
                            </motion.div>
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={generatingMsg}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-lg font-mono text-gold/70"
                                >
                                    {GENERATION_MESSAGES[generatingMsg]}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {stage === 'display' && (
                        <motion.div
                            key="display"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* The Certificate */}
                            <div
                                ref={certRef}
                                className="certificate-printable bg-[#f5f0e1] rounded-xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
                                style={{
                                    border: '4px double #d4af37',
                                    boxShadow: '0 0 0 2px #f5f0e1, 0 0 0 4px #997b28, 0 20px 60px rgba(0,0,0,0.5)',
                                }}
                            >
                                {/* Corner ornaments */}
                                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                                    <div
                                        key={pos}
                                        className={`absolute w-16 h-16 ${
                                            pos === 'top-left' ? 'top-4 left-4' :
                                            pos === 'top-right' ? 'top-4 right-4 rotate-90' :
                                            pos === 'bottom-left' ? 'bottom-4 left-4 -rotate-90' :
                                            'bottom-4 right-4 rotate-180'
                                        }`}
                                        style={{
                                            borderTop: '2px solid #d4af37',
                                            borderLeft: '2px solid #d4af37',
                                        }}
                                    />
                                ))}

                                <div className="relative z-10">
                                    {/* Header */}
                                    <p className="text-[#997b28] font-mono text-[10px] uppercase tracking-[0.4em] mb-2">
                                        International Cereal Authority
                                    </p>
                                    <h2
                                        className="text-4xl md:text-5xl font-heading text-[#1a1a1a] mb-1"
                                        style={{
                                            background: 'linear-gradient(90deg, #997b28, #d4af37, #f0d060, #d4af37, #997b28)',
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            animation: 'shimmer 3s linear infinite',
                                        }}
                                    >
                                        The Sommelier's Spoon
                                    </h2>

                                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-6" />

                                    <p className="text-[#666] text-sm font-mono mb-1">This certifies that</p>

                                    <h3 className="text-3xl md:text-4xl font-heading text-[#1a1a1a] my-4 border-b-2 border-[#d4af37] inline-block pb-2 px-8">
                                        {name}
                                    </h3>

                                    <p className="text-[#666] text-sm font-mono mb-1 mt-4">
                                        has completed the rigorous* examination
                                    </p>
                                    <p className="text-[#666] text-sm font-mono mb-6">
                                        and is hereby granted the title of
                                    </p>

                                    <h4 className="text-2xl md:text-3xl font-heading text-[#d4af37] mb-1 uppercase tracking-wider">
                                        Certified Cereal Sommelier
                                    </h4>
                                    <p className="text-[#999] font-mono text-xs mb-8">Class of {new Date().getFullYear()}</p>

                                    {/* Rights */}
                                    <div className="text-left max-w-md mx-auto mb-8">
                                        <p className="text-[#666] text-xs font-mono mb-3 text-center">
                                            With all rights and privileges therein, including but not limited to:
                                        </p>
                                        <ul className="space-y-1.5 text-xs text-[#555] font-mono">
                                            <li>• Judging others' cereal choices silently</li>
                                            <li>• Requesting "the cereal list" at restaurants</li>
                                            <li>• Using the word "mouthfeel" unironically</li>
                                            <li>• Sniffing cereal boxes in public without explanation</li>
                                            <li>• Referring to milk as "the medium"</li>
                                        </ul>
                                    </div>

                                    {/* Signature and seal */}
                                    <div className="flex items-end justify-between gap-8 mt-8">
                                        <div className="flex-1 text-left">
                                            <div className="border-b border-[#d4af37] mb-2" />
                                            <p className="text-xs text-[#666] font-heading italic">Jacques Flakémont III</p>
                                            <p className="text-[10px] text-[#999] font-mono">Grand Sommelier & Founder</p>
                                        </div>

                                        {/* Wax seal */}
                                        <div
                                            className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-[#f5f0e1] text-xl font-heading font-bold"
                                            style={{
                                                background: 'radial-gradient(circle at 35% 35%, #b8860b, #8b6914, #6b4f12)',
                                                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.3)',
                                            }}
                                        >
                                            SS
                                        </div>

                                        <div className="flex-1 text-right">
                                            <div className="border-b border-[#d4af37] mb-2" />
                                            <p className="text-xs text-[#666] font-mono">Certificate No: {certNumber}</p>
                                            <p className="text-[10px] text-[#999] font-mono">{formatDate()}</p>
                                        </div>
                                    </div>

                                    <p className="text-[#bbb] text-[10px] font-mono mt-8">
                                        * rigor not guaranteed • Filed with the International Cereal Archives (a shoebox in Jacques' apartment)
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 print:hidden">
                                <motion.button
                                    type="button"
                                    onClick={handlePrint}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm"
                                >
                                    Print Certificate
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={handleShare}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl border border-gold/30 text-gold font-heading font-bold uppercase tracking-wider text-sm hover:border-gold/60"
                                >
                                    {copied ? 'Copied!' : 'Share Achievement'}
                                </motion.button>
                                <motion.button
                                    type="button"
                                    onClick={() => { setStage('input'); setName(''); }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-xl border border-cream/20 text-cream/60 font-heading font-bold uppercase tracking-wider text-sm hover:border-cream/40"
                                >
                                    Generate Another
                                </motion.button>
                            </div>

                            <p className="text-cream/25 text-[10px] font-mono mt-6 text-center print:hidden">
                                Pro tip: Print this and hang it in your office. Say nothing. Wait.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
