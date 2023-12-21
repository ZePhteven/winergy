import { ComparatorType } from './comparator-type';

/**
 * Represents the data to be parsed as a comparator
 */
export class ComparatorPrototype<TComparator> {
  /**
   * Comparator type
   */
  type: ComparatorType;

  /**
   * Comparator's data
   */
  data: TComparator;

  /**
   * Initialize a new instance of classe ComparatorPrototype
   */
  constructor(type: ComparatorType, data: TComparator) {
    this.data = data as TComparator;
    this.type = type;
  }
}
