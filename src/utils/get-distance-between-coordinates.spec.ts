import { getDistanceBetweenCoordinate } from './get-distance-between-coordinates';

describe('Coordinate Calculate', () => {
  it('should be able to calculate distance between two coordinates in km', () => {
    const from = {
      latitude: 0,
      longitude: 0,
    };

    const to = {
      latitude: 0.0123,
      longitude: 0.0123,
    };

    const result = getDistanceBetweenCoordinate(from, to);
    expect(result).toBe(1.9341234292209395);
  });
});
