import { flattenObject, nestedAssignObject, unflattenObject } from './object.functions';

describe('flattenObject', () => {
  it('should return flattened object', () => {
    const obj = { ids: { familyId: 1 }, names: { familyName: 'family', firstName: 'first' }, value: 'string' };
    const result = flattenObject(obj);

    expect(result).toMatchObject({
      'ids.familyId': 1,
      'names.familyName': 'family',
      'names.firstName': 'first',
      value: 'string',
    });
  });
});

describe('nestedAssignObject', () => {
  it('should return merged object', () => {
    type TObject = {
      id?: number;
      name?: string;
      valueSource?: string;
      valueTarget?: string;
    };

    const target: TObject = { id: 1, name: 'before', valueTarget: 'string' };
    const source: TObject = { name: 'after', valueSource: 'string' };
    const result = nestedAssignObject(target, source);

    expect(result).toMatchObject({ id: 1, name: 'after', valueSource: 'string', valueTarget: 'string' });
  });
});

describe('unflattenObject', () => {
  it('should return merged object', () => {
    const obj = {
      'ids.familyId': 1,
      'names.familyName': 'family',
      'names.firstName': 'first',
      value: 'string',
    };
    const result = unflattenObject(obj);

    expect(result).toMatchObject({
      ids: { familyId: 1 },
      names: { familyName: 'family', firstName: 'first' },
      value: 'string',
    });
  });
});
