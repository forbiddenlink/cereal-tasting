import type { Milk } from '../data/milks';
import type { Cereal } from '../data/mockData';

/** Synergy score 0-100 for a cereal and milk, 0 when no milk is poured. */
export function calculateSynergy(cereal: Cereal, milk: Milk | null): number {
  if (!milk) return 0;

  let score = 85; // Base high score

  // Bonus if it's the recommended pairing
  if (milk.bestPairedWith.includes(cereal.id) || cereal.recommendedMilkPairing === milk.id) {
    score += 10;
  }

  // Penalty logic (just for flavor)
  if (cereal.name.includes('Chocolate') && milk.name.includes('Strawberry')) {
    score = 12; // Disgusting
  }

  return Math.min(100, score);
}

export function synergyLabel(score: number): string {
  if (score === 0) return 'Awaiting Solvent...';
  if (score < 40) return 'Potentially Hazardous';
  if (score < 70) return 'Palatable';
  if (score < 90) return 'Harmonious';
  return 'Transcendental';
}
