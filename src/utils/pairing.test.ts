import { describe, expect, it } from 'vitest';
import type { Cereal } from '../data/mockData';
import type { Milk } from '../data/milks';
import { calculateSynergy, synergyLabel } from './pairing';

const cereal = (over: Partial<Cereal>): Cereal => ({ id: 'cx', name: 'Plain Flakes', recommendedMilkPairing: 'none', ...over }) as Cereal;
const milk = (over: Partial<Milk>): Milk => ({ id: 'mx', name: 'Plain Milk', bestPairedWith: [], ...over }) as Milk;

describe('calculateSynergy', () => {
  it('is 0 with no milk poured', () => {
    expect(calculateSynergy(cereal({}), null)).toBe(0);
  });

  it('starts at 85 for an unrecommended pairing', () => {
    expect(calculateSynergy(cereal({}), milk({}))).toBe(85);
  });

  it('adds 10 when the milk lists the cereal', () => {
    expect(calculateSynergy(cereal({ id: 'c1' }), milk({ bestPairedWith: ['c1'] }))).toBe(95);
  });

  it('adds 10 when the cereal recommends the milk', () => {
    expect(calculateSynergy(cereal({ recommendedMilkPairing: 'm9' }), milk({ id: 'm9' }))).toBe(95);
  });

  it('does not stack both bonuses', () => {
    const c = cereal({ id: 'c1', recommendedMilkPairing: 'm9' });
    expect(calculateSynergy(c, milk({ id: 'm9', bestPairedWith: ['c1'] }))).toBe(95);
  });

  it('keeps the chocolate with strawberry milk penalty', () => {
    expect(calculateSynergy(cereal({ name: 'Chocolate Crunch' }), milk({ name: 'Strawberry Dream' }))).toBe(12);
  });
});

describe('synergyLabel', () => {
  it.each([
    [0, 'Awaiting Solvent...'],
    [12, 'Potentially Hazardous'],
    [39, 'Potentially Hazardous'],
    [40, 'Palatable'],
    [69, 'Palatable'],
    [70, 'Harmonious'],
    [89, 'Harmonious'],
    [90, 'Transcendental'],
    [100, 'Transcendental'],
  ])('score %i is %s', (score, label) => {
    expect(synergyLabel(score)).toBe(label);
  });
});
