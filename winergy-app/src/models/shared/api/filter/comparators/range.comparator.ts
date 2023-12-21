import { BaseComparator } from "./base.comparator";

export interface RangeComparator
  extends BaseComparator<RangeComparatorType, [number, number]> {
  type: RangeComparatorType;
  value: [number, number];
}

export enum RangeComparatorType {
  Includes = 0, // Default
  Excludes = 1,
}
