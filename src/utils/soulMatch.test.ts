import { describe, expect, it } from 'vitest';
import { CEREALS } from '../data/mockData';
import { compareVerdict, flightName } from '../data/jacques';
import { buildPairingShareUrl, buildQuizShareUrl, matchCereal } from '../utils/soulMatch';

describe('matchCereal', () => {
  it('prefers high-nostalgia cereals when nostalgia dominates', () => {
    const result = matchCereal(
      { sweetness: 2, crunch: 2, nostalgia: 12, chaos: 1 },
      CEREALS,
    );
    expect(result.flavor.nostalgia).toBeGreaterThanOrEqual(85);
  });

  it('returns a cereal from the catalog', () => {
    const result = matchCereal(
      { sweetness: 5, crunch: 5, nostalgia: 5, chaos: 5 },
      CEREALS,
    );
    expect(CEREALS.some((c) => c.id === result.id)).toBe(true);
  });
});

describe('share URL builders', () => {
  it('builds quiz result deep links', () => {
    expect(buildQuizShareUrl('https://cereal-tasting.vercel.app', 'c2')).toBe(
      'https://cereal-tasting.vercel.app/quiz/?result=c2',
    );
  });

  it('builds pairing links with optional milk', () => {
    expect(buildPairingShareUrl('https://cereal-tasting.vercel.app', 'c1', 'm2')).toContain(
      'cereal=c1',
    );
    expect(buildPairingShareUrl('https://cereal-tasting.vercel.app', 'c1', 'm2')).toContain(
      'milk=m2',
    );
    expect(buildPairingShareUrl('https://cereal-tasting.vercel.app', 'c1')).not.toContain('milk=');
  });
});

describe('jacques helpers', () => {
  it('names flights by bowl count', () => {
    expect(flightName(0, 0)).toBe('An Empty Promise');
    expect(flightName(3, 900)).toBe('The Classic Flight');
  });

  it('declares a compare winner', () => {
    const a = CEREALS[0];
    const b = CEREALS[1];
    const verdict = compareVerdict(a, b);
    expect([a.name, b.name]).toContain(verdict.winner);
    expect(verdict.headline.length).toBeGreaterThan(5);
  });
});
