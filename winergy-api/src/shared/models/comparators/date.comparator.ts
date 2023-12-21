import { Between, FindOperator, LessThan, MoreThan, MoreThanOrEqual, Not } from 'typeorm';

import { BaseComparator } from './base.comparator';

/**
 * Representes a filter criteria, to check if a date is included in a given range
 */
export class DateComparator extends BaseComparator<DateComparatorType, DateComparatorValue, FindOperator<any>> {
  /**
   * Returns the filter to pass to typeorm
   */
  override apply() {
    switch (this.type) {
      case DateComparatorType.Excludes:
        if (!this.value.dateEnd) {
          if (!this.value.dateStart) {
            return undefined;
          }

          return LessThan(this.value.dateStart);
        }

        if (!this.value.dateStart) {
          return MoreThanOrEqual(this.value.dateEnd);
        }

        return Not(Between(this.value.dateStart, this.value.dateEnd));

      case DateComparatorType.Includes:
      default:
        if (!this.value.dateEnd) {
          if (!this.value.dateStart) {
            return undefined;
          }

          return MoreThanOrEqual(this.value.dateStart);
        }

        if (!this.value.dateStart) {
          return LessThan(this.value.dateEnd);
        }

        return Between(this.value.dateStart, this.value.dateEnd);
    }
  }
}

/**
 * Comparison type
 */
export enum DateComparatorType {
  Includes = 0, // Default
  Excludes = 1,
}

/**
 * Value to compare to
 */
export class DateComparatorValue {
  dateEnd: Date | null;
  dateStart: Date | null;
}
