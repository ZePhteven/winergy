import {
  ComparatorPrototype,
  ComparatorType,
  RangeComparator,
  RangeComparatorType,
  StringComparator,
  StringComparatorType,
} from "@app/models/shared/api";

/**
 * Get a filter criteria, to check if a text contains the given value
 * @param value String to search for
 * @returns Constructed filter criteria
 */
export function getStringContainsFilter(value: string) {
  if (!value) {
    return undefined;
  }

  return new ComparatorPrototype<StringComparator>(ComparatorType.String, {
    type: StringComparatorType.Contains,
    value: value,
  });
}

export function getRangeIncludesFilter(value: [number, number]) {
  if (!value) {
    return undefined;
  }

  return new ComparatorPrototype<RangeComparator>(ComparatorType.Range, {
    type: RangeComparatorType.Includes,
    value: value,
  });
}
