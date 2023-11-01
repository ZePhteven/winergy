/**
 * Representes a generic filter criteria
 */
export abstract class BaseComparator<TType, TValue, TFilter> {
  /**
   * Comparison type
   */
  type: TType;

  /**
   * Value to compare to
   */
  value: TValue;

  /**
   * Initialize a new instance of class BaseComparator
   * @param data Initialization data
   */
  constructor(data: { type: TType; value: TValue }) {
    this.type = data.type;
    this.value = data.value;
  }

  /**
   * Returns the filter to pass to typeorm
   */
  abstract apply(): TFilter;
}
