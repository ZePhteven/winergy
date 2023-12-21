import { ComparatorPrototype, StringComparator } from "@app/models/shared/api";

/**
 * Represents the basic filtering criteria to search for any entity
 */
export interface BaseFilter {
  /**
   * Entity's identifier
   */
  id?: number[];

  /**
   * Entity's name
   */
  name?: ComparatorPrototype<StringComparator>;
}
