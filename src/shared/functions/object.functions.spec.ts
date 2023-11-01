import { BaseFilter } from '../models/dto';
import { isChildOf } from './object.functions';

describe('isChildOf', () => {
  it('should return True', () => {
    const result = isChildOf({ id: [1] }, BaseFilter);

    expect(result).toBeTruthy();
  });

  it('should return False', () => {
    const result = isChildOf(1, BaseFilter);

    expect(result).toBeFalsy();
  });
});
