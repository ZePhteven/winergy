import { getAverage, naiveRound } from './math.functions';

describe('getAverage', () => {
  it('should return an average value', () => {
    const result = getAverage([1, 3]);

    expect(result).toBe(2);
  });
});

describe('naiveRound', () => {
  it('should return a round value', () => {
    const result = naiveRound(1.666, 2);

    expect(result).toBe(1.67);
  });
});
