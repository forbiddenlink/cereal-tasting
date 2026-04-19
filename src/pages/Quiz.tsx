import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CEREALS } from '../data/mockData';
import { springs } from '../utils/motion';

interface TraitScores {
    sweetness: number;
    crunch: number;
    nostalgia: number;
    chaos: number;
}

interface Answer {
    text: string;
    traits: Partial<TraitScores>;
}

interface Question {
    question: string;
    answers: Answer[];
}

const QUESTIONS: Question[] = [
    {
        question: "It's 3am. You open the fridge. The light hits your face. What are you feeling?",
        answers: [
            { text: "The weight of existence", traits: { nostalgia: 3, crunch: 1 } },
            { text: "Absolutely unhinged joy", traits: { sweetness: 3, chaos: 2 } },
            { text: "Nothing. I am beyond feeling.", traits: { crunch: 3, chaos: 1 } },
            { text: "I shouldn't be here but here I am", traits: { nostalgia: 2, sweetness: 1 } },
        ],
    },
    {
        question: "Your ex texts you. You respond with:",
        answers: [
            { text: '"New phone, who dis"', traits: { crunch: 2, chaos: 2 } },
            { text: '"I\'ve been meaning to tell you about this cereal..."', traits: { sweetness: 3, nostalgia: 1 } },
            { text: "Screenshot and send to group chat", traits: { chaos: 3, crunch: 1 } },
            { text: '"I forgive you. The cereal doesn\'t."', traits: { nostalgia: 3, sweetness: 1 } },
        ],
    },
    {
        question: "Pick a controversial breakfast opinion:",
        answers: [
            { text: "Cereal is soup", traits: { chaos: 3, crunch: 1 } },
            { text: "Milk goes first", traits: { chaos: 3, sweetness: 1 } },
            { text: "Dry cereal is valid", traits: { crunch: 3, nostalgia: 1 } },
            { text: "Cereal for dinner is self-care", traits: { nostalgia: 3, sweetness: 2 } },
        ],
    },
    {
        question: "Your Uber rating is:",
        answers: [
            { text: '4.2 — "I ask too many questions"', traits: { nostalgia: 1, chaos: 2 } },
            { text: "4.95 — I'm a delight", traits: { sweetness: 3 } },
            { text: "3.7 — I once ate cereal in the backseat", traits: { chaos: 3, crunch: 1 } },
            { text: "I don't take Ubers, I have a vintage bicycle", traits: { nostalgia: 2, crunch: 2 } },
        ],
    },
    {
        question: "Which would you hang on your wall?",
        answers: [
            { text: "A framed cereal box, obviously", traits: { nostalgia: 3, sweetness: 1 } },
            { text: "A color-field painting that matches my mood ring", traits: { sweetness: 2, chaos: 1 } },
            { text: "Nothing. Walls are a construct.", traits: { chaos: 3 } },
            { text: "A certificate proving I can ID 47 cereals blindfolded", traits: { crunch: 3, nostalgia: 1 } },
        ],
    },
    {
        question: 'Your therapist asks how you\'re doing. You say:',
        answers: [
            { text: '"Better since I found my vintage cereal collection"', traits: { nostalgia: 3, sweetness: 1 } },
            { text: '"I\'ve achieved inner peace through sugar"', traits: { sweetness: 3, chaos: 1 } },
            { text: '"We need to talk about the crunch deficit in modern cereals"', traits: { crunch: 3, nostalgia: 1 } },
            { text: '"I brought a cereal pairing chart" (unfolds it)', traits: { chaos: 2, crunch: 2 } },
        ],
    },
    {
        question: "Choose your last meal:",
        answers: [
            { text: "A bowl of my childhood cereal with whole milk, in a sunlit kitchen", traits: { nostalgia: 3, sweetness: 2 } },
            { text: "Something with 47 ingredients I can't pronounce", traits: { chaos: 2, sweetness: 2 } },
            { text: "Three bowls. Different cereals. No explanation needed.", traits: { crunch: 2, chaos: 2 } },
            { text: "Water. I've transcended.", traits: { crunch: 3, chaos: 1 } },
        ],
    },
];

const CALCULATING_MESSAGES = [
    "Consulting the grain elders...",
    "Cross-referencing your soul with the Zurich Cereal Database...",
    "Your results surprised even us...",
    "Calibrating the nostalgia resonance chamber...",
    "The spoon is trembling...",
];

function matchCereal(traits: TraitScores) {
    const maxVal = Math.max(traits.sweetness, traits.crunch, traits.nostalgia, traits.chaos, 1);
    const norm = {
        sweetness: (traits.sweetness / maxVal) * 100,
        crunch: (traits.crunch / maxVal) * 100,
        nostalgia: (traits.nostalgia / maxVal) * 100,
        chaos: (traits.chaos / maxVal) * 100,
    };

    let bestCereal = CEREALS[0];
    let bestDist = Infinity;

    for (const cereal of CEREALS) {
        const f = cereal.flavor;
        const dist = Math.sqrt(
            (f.sweetness - norm.sweetness) ** 2 +
            (f.crunch - norm.crunch) ** 2 +
            (f.nostalgia - norm.nostalgia) ** 2 +
            (f.particulate - norm.chaos) ** 2
        );
        if (dist < bestDist) {
            bestDist = dist;
            bestCereal = cereal;
        }
    }

    return bestCereal;
}

function getSommelierNote(traits: TraitScores) {
    const sorted = Object.entries(traits).sort(([, a], [, b]) => b - a);
    const dominant = sorted[0][0] as keyof TraitScores;
    const secondary = sorted[1][0] as keyof TraitScores;

    const headlines: Record<string, string> = {
        'sweetness-nostalgia': 'The Sentimental Sugar Seeker',
        'sweetness-crunch': 'The Textural Hedonist',
        'sweetness-chaos': 'The Unhinged Optimist',
        'crunch-nostalgia': 'The Disciplined Romantic',
        'crunch-sweetness': 'The Calculated Indulger',
        'crunch-chaos': 'The Crunchy Anarchist',
        'nostalgia-sweetness': 'The Tender Archivist',
        'nostalgia-crunch': 'The Vintage Purist',
        'nostalgia-chaos': 'The Chaotic Rememberer',
        'chaos-sweetness': 'The Sweet Disruptor',
        'chaos-crunch': 'The Agent of Breakfast Entropy',
        'chaos-nostalgia': 'The Nostalgic Wildcard',
    };

    const notes: Record<string, string> = {
        'sweetness-nostalgia': "You chase comfort through sugar, and honestly? It works. Your breakfast bowl is a time machine that runs on glucose.",
        'sweetness-crunch': "You demand both pleasure and structure. Every bite must be both soft and sharp. You contain multitudes.",
        'sweetness-chaos': "You'd put candy in a cereal bowl and call it innovation. The world isn't ready for you. Neither is your dentist.",
        'crunch-nostalgia': "You miss the old days, but you refuse to compromise on texture. Your jaw is both strong and wistful.",
        'crunch-sweetness': "You want the crunch, but you won't suffer for it. Strategic sugar deployment. You'd be great in logistics.",
        'crunch-chaos': "You eat Grape-Nuts at 2am and call it 'a vibe.' Your teeth are afraid of you. Respect.",
        'nostalgia-sweetness': "Every bowl is a memorial service for your childhood, sweetened to taste. Bittersweet, emphasis on sweet.",
        'nostalgia-crunch': "You remember exactly how the cereal of 1994 crunched and you will accept no substitutes. Time is your enemy.",
        'nostalgia-chaos': "You remember the past but you remember it wrong, and that's what makes you dangerous and interesting.",
        'chaos-sweetness': "Rules mean nothing to you, but sugar means everything. You'd put Pop-Tarts in cereal. You probably already have.",
        'chaos-crunch': "You combine cereals that were never meant to meet. You eat standing up. You are the breakfast equivalent of a flash mob.",
        'chaos-nostalgia': "You miss something, but you can't remember what. So you eat cereal about it. Valid.",
    };

    const key = `${dominant}-${secondary}`;
    return {
        headline: headlines[key] ?? 'The Cereal Enigma',
        body: notes[key] ?? "The algorithm has no category for you. You have transcended cereal personality types. Jacques is both concerned and impressed.",
        sommelierNote: `Based on our proprietary 7-question assessment, your breakfast soul resonates at a frequency of ${traits.sweetness + traits.crunch + traits.nostalgia + traits.chaos} Cereal Hertz. This is ${traits.chaos > 8 ? 'alarming' : 'within acceptable parameters'}.`,
    };
}

type Stage = 'intro' | 'quiz' | 'calculating' | 'result';

export function Quiz() {
    const [stage, setStage] = useState<Stage>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [calcMsgIndex, setCalcMsgIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    const traits = useMemo<TraitScores>(() => {
        const sum: TraitScores = { sweetness: 0, crunch: 0, nostalgia: 0, chaos: 0 };
        answers.forEach((answerIdx, qIdx) => {
            const t = QUESTIONS[qIdx]?.answers[answerIdx]?.traits;
            if (t) {
                sum.sweetness += t.sweetness ?? 0;
                sum.crunch += t.crunch ?? 0;
                sum.nostalgia += t.nostalgia ?? 0;
                sum.chaos += t.chaos ?? 0;
            }
        });
        return sum;
    }, [answers]);

    const resultCereal = useMemo(() => matchCereal(traits), [traits]);
    const note = useMemo(() => getSommelierNote(traits), [traits]);

    const handleAnswer = (answerIdx: number) => {
        const next = [...answers, answerIdx];
        setAnswers(next);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setStage('calculating');
            let msgIdx = 0;
            const interval = setInterval(() => {
                msgIdx++;
                if (msgIdx >= CALCULATING_MESSAGES.length) {
                    clearInterval(interval);
                    setStage('result');
                } else {
                    setCalcMsgIndex(msgIdx);
                }
            }, 800);
        }
    };

    const reset = () => {
        setStage('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setCalcMsgIndex(0);
        setCopied(false);
    };

    const share = () => {
        navigator.clipboard.writeText(
            `I am a ${resultCereal.name} person. The spoon has spoken. 🥄\n\nTake the quiz: ${window.location.href}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="container mx-auto max-w-2xl">
                <AnimatePresence mode="wait">
                    {stage === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-10 md:p-14">
                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
                                <p className="text-gold/50 font-mono tracking-[0.3em] uppercase text-xs mb-4">
                                    The Sommelier's Assessment
                                </p>
                                <h1 className="text-4xl md:text-6xl font-heading text-gold mb-6">
                                    What Cereal<br />Matches Your Soul?
                                </h1>
                                <p className="text-cream/60 text-sm mb-2 max-w-md mx-auto">
                                    7 questions stand between you and self-knowledge.
                                </p>
                                <p className="text-cream/40 text-xs font-mono mb-10">
                                    Estimated time: 2 minutes. Emotional recovery time: varies.
                                </p>

                                <motion.button
                                    type="button"
                                    onClick={() => setStage('quiz')}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                                >
                                    Begin the Assessment
                                </motion.button>

                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-10" />
                                <p className="text-cream/30 text-[10px] font-mono mt-4">
                                    Results are scientifically meaningless but emotionally devastating
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {stage === 'quiz' && (
                        <motion.div
                            key={`q-${currentQuestion}`}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Progress bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-[10px] font-mono text-gold/50 uppercase tracking-wider mb-2">
                                    <span>Milk Fill Level</span>
                                    <span>{currentQuestion + 1} / {QUESTIONS.length}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-gold/10">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-gold via-gold to-gold-dim rounded-full"
                                        animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                                        transition={springs.smooth}
                                    />
                                </div>
                            </div>

                            <div className="glass-panel-heavy rounded-2xl border border-gold/20 p-8 md:p-10">
                                <p className="text-[10px] font-mono text-gold/40 uppercase tracking-widest mb-4">
                                    Question {currentQuestion + 1}
                                </p>
                                <h2 className="text-2xl md:text-3xl font-heading text-gold mb-8 leading-tight">
                                    {QUESTIONS[currentQuestion].question}
                                </h2>

                                <div className="space-y-3">
                                    {QUESTIONS[currentQuestion].answers.map((answer, idx) => (
                                        <motion.button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleAnswer(idx)}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.08 }}
                                            whileHover={{
                                                scale: 1.02,
                                                borderColor: 'rgba(212,175,55,0.5)',
                                                backgroundColor: 'rgba(212,175,55,0.08)',
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full text-left px-5 py-4 rounded-xl border border-gold/15 bg-white/[0.02] text-cream/80 text-sm md:text-base font-mono transition-colors hover:text-cream"
                                        >
                                            <span className="text-gold/50 mr-3">{String.fromCharCode(65 + idx)}.</span>
                                            {answer.text}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {stage === 'calculating' && (
                        <motion.div
                            key="calc"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="text-center py-20"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="w-20 h-20 border-2 border-gold/30 border-t-gold rounded-full mx-auto mb-8"
                            />
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={calcMsgIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-lg font-mono text-gold/70"
                                >
                                    {CALCULATING_MESSAGES[calcMsgIndex]}
                                </motion.p>
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {stage === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="glass-panel-heavy rounded-2xl border-2 border-gold/30 p-8 md:p-12 text-center">
                                <p className="text-[10px] font-mono text-gold/50 uppercase tracking-[0.3em] mb-2">
                                    The Spoon Has Spoken
                                </p>
                                <h2 className="text-3xl md:text-4xl font-heading text-gold mb-2">
                                    You Are...
                                </h2>

                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, ...springs.bouncy }}
                                >
                                    <img
                                        src={resultCereal.image}
                                        alt={resultCereal.name}
                                        className="w-40 h-40 object-contain mx-auto my-6"
                                    />
                                </motion.div>

                                <h3 className="text-4xl md:text-5xl font-heading text-gold mb-2"
                                    style={{ textShadow: '0 0 20px rgba(212,175,55,0.3)' }}
                                >
                                    {resultCereal.name}
                                </h3>
                                <p className="text-sm font-mono text-gold/50 mb-1">
                                    Vintage {resultCereal.vintage} • {resultCereal.region}
                                </p>
                                <p className="text-lg font-heading text-slime mb-8">
                                    ${resultCereal.price.toFixed(2)}
                                </p>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-8" />

                                <h4 className="text-2xl font-heading text-cream mb-3">{note.headline}</h4>
                                <p className="text-cream/70 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                                    {note.body}
                                </p>

                                {/* Trait bars */}
                                <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto text-left">
                                    {Object.entries(traits).map(([key, value]) => (
                                        <div key={key}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-cream/50 capitalize font-mono">{key}</span>
                                                <span className="text-cream/80 font-mono">{value}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((value / 15) * 100, 100)}%` }}
                                                    transition={{ delay: 0.5, ...springs.bouncy }}
                                                    className="h-full rounded-full bg-gradient-to-r from-gold to-slime"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Sommelier's note */}
                                <div className="bg-white/[0.03] border border-gold/10 rounded-xl p-5 mb-8 text-left">
                                    <p className="text-[10px] font-mono text-gold/50 uppercase tracking-widest mb-2">
                                        Sommelier's Note
                                    </p>
                                    <p className="text-sm text-cream/70 italic leading-relaxed">
                                        "{note.sommelierNote}"
                                    </p>
                                    <p className="text-xs text-gold/40 font-mono mt-3 text-right">
                                        — Jacques Flakémont III
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <motion.button
                                        type="button"
                                        onClick={share}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 rounded-xl bg-gradient-to-br from-gold via-gold to-gold-dim text-void font-heading font-bold uppercase tracking-wider text-sm"
                                    >
                                        {copied ? 'Copied!' : 'Share Result'}
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={reset}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 rounded-xl border border-gold/30 text-gold font-heading font-bold uppercase tracking-wider text-sm hover:border-gold/60"
                                    >
                                        Retake Quiz
                                    </motion.button>
                                </div>

                                <p className="text-[10px] text-cream/25 font-mono mt-8">
                                    This assessment is recognized by 0 academic institutions and 1 cereal-obsessed Frenchman
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
