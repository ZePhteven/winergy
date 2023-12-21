import { BaseComparator } from "./base.comparator";

export interface StringComparator
  extends BaseComparator<StringComparatorType, string> {
  type: StringComparatorType;
  value: string;
}

export enum StringComparatorType {
  Is = 0, // Default
  Contains = 1,
  StartWith = 2,
  EndWith = 3,
}
