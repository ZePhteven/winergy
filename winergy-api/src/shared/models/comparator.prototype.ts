import { ComparatorType } from './comparator-type';
import { BaseComparator } from './comparators';

/**
 * Represents the data to be parsed as a comparator
 */
export class ComparatorPrototype<TComparator extends BaseComparator<any, any, any>> {
  /**
   * Comparator type
   */
  type: ComparatorType;

  /**
   * Comparator's data
   */
  data: TComparator;
}
