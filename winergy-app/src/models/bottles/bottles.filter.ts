import {
  ComparatorPrototype,
  RangeComparator,
  StringComparator,
} from "@app/models/shared/api";
import { BaseFilter } from "@app/models/shared/entities";

export interface BottlesFilter extends BaseFilter {
  name?: ComparatorPrototype<StringComparator>;

  year?: number[];

  note?: ComparatorPrototype<RangeComparator>;

  price?: ComparatorPrototype<RangeComparator>;
}
