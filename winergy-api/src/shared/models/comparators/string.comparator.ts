import { FindOperator, ILike } from 'typeorm';

import { BaseComparator } from './base.comparator';

export class StringComparator extends BaseComparator<StringComparatorType, string, FindOperator<any> | string> {
  /**
   * Returns the filter to pass to typeorm
   */
  override apply() {
    switch (this.type) {
      case StringComparatorType.EndWith:
        return ILike(`%${this.value}`);

      case StringComparatorType.StartWith:
        return ILike(`${this.value}%`);

      case StringComparatorType.Contains:
        return ILike(`%${this.value}%`);

      case StringComparatorType.Is:
      default:
        return this.value;
    }
  }
}

export enum StringComparatorType {
  Is = 0, // Default
  Contains = 1,
  StartWith = 2,
  EndWith = 3,
}
