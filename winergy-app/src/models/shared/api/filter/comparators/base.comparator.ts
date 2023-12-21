/**
 * Representes a generic filter criteria
 */
export interface BaseComparator<TType, TValue> {
  /**
   * Comparison type
   */
  type: TType;

  /**
   * Value to compare to
   */
  value: TValue;
}
