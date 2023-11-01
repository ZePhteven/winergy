import { ComparatorType } from '../models/comparator-type';
import { ComparatorPrototype } from '../models/comparator.prototype';
import { BaseComparator, DateComparator, StringComparator } from '../models/comparators';

/**
 * Factory, to parse data as comparators
 */
export class ComparatorFactory {
  /**
   * Check if the given data can be parsed to a comparator
   * @param data Data to check
   * @returns If the given data can be parsed
   */
  public static canParse(data: any): data is ComparatorPrototype<any> {
    return typeof data !== 'string' && isNaN(data) && 'type' in data && 'data' in data;
  }

  /**
   * Parse the data to a comparator
   * @param data Data to parse
   * @returns Comparator constructed from the data
   */
  public static parse(data: ComparatorPrototype<any>): BaseComparator<any, any, any> {
    switch (data.type) {
      case ComparatorType.Date:
        return new DateComparator(data.data);
      case ComparatorType.String:
        return new StringComparator(data.data);
    }
  }
}
