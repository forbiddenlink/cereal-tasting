import type { Cereal } from '../data/mockData';

export interface SoulTraits {
  sweetness: number;
  crunch: number;
  nostalgia: number;
  chaos: number;
}

export function matchCereal(
  traits: SoulTraits,
  cereals: Cereal[],
): Cereal {
  const maxVal = Math.max(traits.sweetness, traits.crunch, traits.nostalgia, traits.chaos, 1);
  const norm = {
    sweetness: (traits.sweetness / maxVal) * 100,
    crunch: (traits.crunch / maxVal) * 100,
    nostalgia: (traits.nostalgia / maxVal) * 100,
    chaos: (traits.chaos / maxVal) * 100,
  };

  let bestCereal = cereals[0];
  let bestDist = Infinity;

  for (const cereal of cereals) {
    const f = cereal.flavor;
    const dist = Math.sqrt(
      (f.sweetness - norm.sweetness) ** 2 +
        (f.crunch - norm.crunch) ** 2 +
        (f.nostalgia - norm.nostalgia) ** 2 +
        (f.particulate - norm.chaos) ** 2,
    );
    if (dist < bestDist) {
      bestDist = dist;
      bestCereal = cereal;
    }
  }

  return bestCereal;
}

export function buildQuizShareUrl(origin: string, cerealId: string): string {
  const base = origin.replace(/\/+$/, '');
  return `${base}/quiz/?result=${encodeURIComponent(cerealId)}`;
}

export function buildPairingShareUrl(
  origin: string,
  cerealId: string,
  milkId?: string | null,
): string {
  const url = new URL('/pairings/', origin.endsWith('/') ? origin : `${origin}/`);
  url.searchParams.set('cereal', cerealId);
  if (milkId) url.searchParams.set('milk', milkId);
  return url.toString();
}
