import { ChangeEvent, SetStateAction, useCallback, useState } from "react";

import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { BaseFilter } from "@app/models/shared/entities";
import { getStringContainsFilter } from "@app/utils/filters";

const DEFAULT_CHANGE_TIMER = 500;

interface Props<TFilter extends BaseFilter> {
  className?: string;
  delay?: number;
  disabled?: boolean;
  filter: TFilter;
  placeholder?: string;
  prop: string;
  setFilter: (value: SetStateAction<TFilter>) => void;
}

/**
 * A text input to manage a filter criteria ;
 * The filter only updates after typing has stopped for a fixed time
 */
export const FilterTextInput = <TFilter extends BaseFilter>({
  className,
  delay,
  disabled,
  filter,
  placeholder,
  prop,
  setFilter,
}: Props<TFilter>) => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

  const updateFilter = useCallback(
    (value: string) => {
      setFilter({ ...filter, [prop]: getStringContainsFilter(value) });
    },
    [filter, setFilter, prop]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Clear previous timer
      clearTimeout(timer);

      // Set a new timer, at the end of which filter will be updated
      const value = event.currentTarget.value;
      setTimer(
        setTimeout(() => updateFilter(value), delay ?? DEFAULT_CHANGE_TIMER)
      );
    },
    [delay, timer, setTimer, updateFilter]
  );

  return (
    <TextInput
      className={className}
      disabled={disabled}
      icon={<IconSearch />}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};
