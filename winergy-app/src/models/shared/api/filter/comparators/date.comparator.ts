import { BaseComparator } from './base.comparator';

/**
 * Representes a filter criteria, to check if a date is included in a given range
 */
export interface DateComparator extends BaseComparator<DateComparatorType, DateComparatorValue> {}

/**
 * Comparison type
 */
export enum DateComparatorType {
  Includes = 0, // Default
  Excludes = 1
}

/**
 * Value to compare to
 */
export interface DateComparatorValue {
  dateEnd: Date | null;
  dateStart: Date | null;
}
