/** Jacques Flakémont III — house sommelier, professional breakfast menace */

export const JACQUES_QUOTES = [
  'The crunch does not lie. People do.',
  'Milk is not a beverage. It is a medium.',
  'If your cereal lasts longer than 47 seconds, you have poured incorrectly.',
  'Nostalgia is a terroir. Sugar is the vintage.',
  'I once aged Cap\'n Crunch in a cheese cave. The restraining order was worth it.',
  'Dry cereal is valid. Saying so at dinner parties is a personality.',
  'Mouthfeel is not a joke. Your jaw knows this.',
  'A flight of three is a tasting. A flight of seven is a cry for help. Both are fine.',
];

export const CRUNCH_INDEX_TICKS = [
  'Captain\'s Reserve +2.4 · aggressive abrasion futures',
  'Count\'s Estate flat · cocoa dust consolidation',
  'Loop de Fruit −1.1 · neon acidity correction',
  'Tony\'s Reserve surge · motivational sugar bid',
  'Lucky Charms volatile · marshmallow fear index',
  'Grape-Nuts steady · gravel remains gravel',
  'Cinnamon Toast Y2K · swirl premium holding',
  'Honey Nut futures · bee labor dispute unresolved',
];

export function cerealOfTheDayIndex(date = new Date()): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start) / 86_400_000);
  return day;
}

export function truncateNote(note: string, max = 28): string {
  if (note.length <= max) return note;
  const cut = note.slice(0, max).replace(/\s+\S*$/, '');
  return `${cut}…`;
}

export function compareVerdict(a: {
  name: string;
  price: number;
  flavor: { crunch: number; sweetness: number; nostalgia: number; particulate: number };
  specs: { decayRate: number };
}, b: {
  name: string;
  price: number;
  flavor: { crunch: number; sweetness: number; nostalgia: number; particulate: number };
  specs: { decayRate: number };
}): { headline: string; body: string; winner: string } {
  const crunchDelta = a.flavor.crunch - b.flavor.crunch;
  const nostalgiaDelta = a.flavor.nostalgia - b.flavor.nostalgia;
  const sweetDelta = a.flavor.sweetness - b.flavor.sweetness;
  const decayDelta = a.specs.decayRate - b.specs.decayRate;
  const priceDelta = a.price - b.price;

  const score = (c: typeof a) =>
    c.flavor.crunch * 0.3 + c.flavor.nostalgia * 0.35 + c.flavor.sweetness * 0.2 + c.specs.decayRate * 0.15;

  const aScore = score(a);
  const bScore = score(b);
  const winner = aScore >= bScore ? a.name : b.name;
  const loser = aScore >= bScore ? b.name : a.name;

  if (Math.abs(crunchDelta) >= 20) {
    const louder = crunchDelta > 0 ? a.name : b.name;
    return {
      headline: 'Crunch Differential Declared a Public Hazard',
      body: `${louder} opens like a sommelier slap. ${loser} is still clearing its throat. Jacques recommends ear protection.`,
      winner: louder,
    };
  }

  if (Math.abs(nostalgiaDelta) >= 15) {
    const softer = nostalgiaDelta > 0 ? a.name : b.name;
    return {
      headline: 'Emotional Damage Favors the Archive',
      body: `${softer} hits the childhood lobe harder. ${loser} is charming, but it did not babysit you in 1994.`,
      winner: softer,
    };
  }

  if (Math.abs(sweetDelta) >= 18) {
    const sweeter = sweetDelta > 0 ? a.name : b.name;
    return {
      headline: 'Brix Scale Escalation',
      body: `${sweeter} is running a sugar surplus. Your dentist has already filed a complaint against ${loser} for being comparatively responsible.`,
      winner: sweeter,
    };
  }

  if (Math.abs(decayDelta) >= 15) {
    const sturdier = decayDelta > 0 ? a.name : b.name;
    return {
      headline: 'Sog Resistance Protocol',
      body: `${sturdier} holds structure under milk assault. ${loser} surrenders early — tragic, delicious, wet.`,
      winner: sturdier,
    };
  }

  if (Math.abs(priceDelta) >= 400) {
    const pricier = priceDelta > 0 ? a.name : b.name;
    return {
      headline: 'Price Is a Personality Trait',
      body: `${pricier} costs more because Jacques said so. ${loser} is the "sensible" choice, which is how you know nobody invited it to brunch.`,
      winner: pricier,
    };
  }

  return {
    headline: 'Dead Heat in the Bowl',
    body: `${winner} edges ${loser} by a margin thinner than a marshmallow. Flip a coin. Then eat both. Science demands it.`,
    winner,
  };
}

export function flightName(itemCount: number, total: number): string {
  if (itemCount === 0) return 'An Empty Promise';
  if (itemCount === 1) return 'The Solo Contemplation';
  if (itemCount === 2) return 'The Diplomatic Pairing';
  if (itemCount === 3) return 'The Classic Flight';
  if (itemCount <= 5) return 'The Weekend Unraveling';
  if (total >= 3000) return 'The Mortgage-Adjacent Collection';
  return 'The Intervention Waiting Room';
}

export function sogStatus(secondsLeft: number, decayRate: number): string {
  const pct = secondsLeft / decayRate;
  if (pct > 0.7) return 'Structural integrity: arrogant';
  if (pct > 0.4) return 'Crunch negotiating with milk';
  if (pct > 0.15) return 'Approaching tragic wetness';
  if (pct > 0) return 'Sog singularity imminent';
  return 'Fully surrendered. Serve with dignity.';
}
