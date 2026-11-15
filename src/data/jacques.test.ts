import { describe, expect, it } from 'vitest';
import { cerealOfTheDayIndex, sogStatus, truncateNote } from './jacques';

describe('truncateNote', () => {
  it('leaves short notes alone', () => {
    expect(truncateNote('short', 28)).toBe('short');
  });

  it('cuts at a word boundary and adds an ellipsis', () => {
    expect(truncateNote('alpha beta gamma delta', 12)).toBe('alpha beta…');
  });

  it('keeps a note exactly at the limit', () => {
    expect(truncateNote('12345', 5)).toBe('12345');
  });
});

describe('sogStatus', () => {
  it.each([
    [100, 100, 'Structural integrity: arrogant'],
    [50, 100, 'Crunch negotiating with milk'],
    [20, 100, 'Approaching tragic wetness'],
    [5, 100, 'Sog singularity imminent'],
    [0, 100, 'Fully surrendered. Serve with dignity.'],
  ])('%i of %i seconds left: %s', (left, rate, text) => {
    expect(sogStatus(left, rate)).toBe(text);
  });
});

describe('cerealOfTheDayIndex', () => {
  it('is day 1 on 1 January UTC', () => {
    expect(cerealOfTheDayIndex(new Date(Date.UTC(2026, 0, 1, 12)))).toBe(1);
  });

  it('advances by one per UTC day', () => {
    const a = cerealOfTheDayIndex(new Date(Date.UTC(2026, 5, 10, 0, 1)));
    const b = cerealOfTheDayIndex(new Date(Date.UTC(2026, 5, 11, 23, 59)));
    expect(b - a).toBe(1);
  });
});
