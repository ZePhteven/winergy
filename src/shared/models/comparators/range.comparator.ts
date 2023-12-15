import { Between, FindOperator, Not } from 'typeorm';

import { BaseComparator } from './base.comparator';

export class RangeComparator extends BaseComparator<RangeComparatorType, [number, number], FindOperator<any>> {
  /**
   * Returns the filter to pass to typeorm
   */
  override apply() {
    switch (this.type) {
      case RangeComparatorType.Excludes:
        return Not(Between(this.value[0], this.value[1]));

      case RangeComparatorType.Includes:
      default:
        return Between(this.value[0], this.value[1]);
    }
  }
}

export enum RangeComparatorType {
  Includes = 0, // Default
  Excludes = 1,
}
