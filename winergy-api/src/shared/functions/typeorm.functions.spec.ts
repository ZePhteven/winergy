import { BottlesFilter } from '../../bottles/dto';
import { ComparatorType, SearchRequest } from '../models';
import { DateComparatorType, StringComparatorType } from '../models/comparators';
import { NOT_NULL_FILTER, NULL_FILTER, getFilterFromSearchRequest } from './typeorm.functions';

describe('getFilterFromSearchRequest', () => {
  it('should return a simple boolean filter', () => {
    const result = getFilterFromSearchRequest({
      filter: { isActive: true },
    } as SearchRequest<any>);

    expect(result).toMatchObject({
      isActive: true,
    });
  });

  describe('datecomparator', () => {
    it('should return an "MORE THAN OR EQUAL" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: { type: DateComparatorType.Includes, value: { dateStart: new Date(1970, 1, 1), dateEnd: null } },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'moreThanOrEqual',
          _value: new Date(1970, 1, 1),
        },
      });
    });

    it('should return an "LESS THAN" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: { type: DateComparatorType.Includes, value: { dateStart: null, dateEnd: new Date(1970, 1, 1) } },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'lessThan',
          _value: new Date(1970, 1, 1),
        },
      });
    });

    it('should return an "BETWEEN" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: {
              type: DateComparatorType.Includes,
              value: { dateStart: new Date(1970, 1, 1), dateEnd: new Date(1970, 1, 2) },
            },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'between',
          _value: [new Date(1970, 1, 1), new Date(1970, 1, 2)],
        },
      });
    });

    it('should return an "LESS THAN" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: { type: DateComparatorType.Excludes, value: { dateStart: new Date(1970, 1, 1), dateEnd: null } },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'lessThan',
          _value: new Date(1970, 1, 1),
        },
      });
    });

    it('should return an "MORE THAN OR EQUAL" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: { type: DateComparatorType.Excludes, value: { dateStart: null, dateEnd: new Date(1970, 1, 1) } },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'moreThanOrEqual',
          _value: new Date(1970, 1, 1),
        },
      });
    });

    it('should return an "BETWEEN" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          createdAt: {
            type: ComparatorType.Date,
            data: {
              type: DateComparatorType.Excludes,
              value: { dateStart: new Date(1970, 1, 1), dateEnd: new Date(1970, 1, 2) },
            },
          },
        },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        createdAt: {
          _type: 'not',
          _value: {
            _type: 'between',
            _value: [new Date(1970, 1, 1), new Date(1970, 1, 2)],
          },
        },
      });
    });
  });

  describe('stringcomparator', () => {
    it('should return an "EXACT MATCH" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: { name: { type: ComparatorType.String, data: { type: StringComparatorType.Is, value: 'string' } } },
      } as SearchRequest<BottlesFilter>);

      expect(result).toMatchObject({
        name: 'string',
      });
    });

    it('should return a "CONTAINS" (like) operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          name: { type: ComparatorType.String, data: { type: StringComparatorType.Contains, value: 'string' } },
        },
      } as SearchRequest<BottlesFilter>);

      expect(result).toMatchObject({
        name: {
          _type: 'ilike',
          _value: '%string%',
        },
      });
    });

    it('should return a "STARTWITH" (like) operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          name: { type: ComparatorType.String, data: { type: StringComparatorType.StartWith, value: 'string' } },
        },
      } as SearchRequest<BottlesFilter>);

      expect(result).toMatchObject({
        name: {
          _type: 'ilike',
          _value: 'string%',
        },
      });
    });

    it('should return a "ENDWITH" (like) operator', () => {
      const result = getFilterFromSearchRequest({
        filter: {
          name: { type: ComparatorType.String, data: { type: StringComparatorType.EndWith, value: 'string' } },
        },
      } as SearchRequest<BottlesFilter>);

      expect(result).toMatchObject({
        name: {
          _type: 'ilike',
          _value: '%string',
        },
      });
    });

    it('should return a "is null" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: { countryId: NULL_FILTER },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        countryId: {
          _type: 'isNull',
          _value: undefined,
        },
      });
    });

    it('should return a "is not null" operator', () => {
      const result = getFilterFromSearchRequest({
        filter: { countryId: NOT_NULL_FILTER as unknown },
      } as SearchRequest<any>);

      expect(result).toMatchObject({
        countryId: {
          _type: 'not',
          _value: {
            _type: 'isNull',
            _value: undefined,
          },
        },
      });
    });
  });
});
