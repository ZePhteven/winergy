import { BaseFilter } from "@app/models/shared/entities";
import { getRangeIncludesFilter } from "@app/utils/filters";
import { RangeSlider } from "@mantine/core";
import { SetStateAction, useCallback } from "react";

interface Props<TFilter extends BaseFilter> {
  className?: string;
  delay?: number;
  disabled?: boolean;
  filter: TFilter;
  defaultValue?: [number, number];
  labelFormat?: (value: number) => string;
  minRange?: number;
  minValue: number;
  maxValue: number;
  placeholder?: string;
  prop: string;
  setFilter: (value: SetStateAction<TFilter>) => void;
  step?: number;
}

export const FilterRangeInput = <TFilter extends BaseFilter>({
  className,
  disabled,
  filter,
  defaultValue,
  labelFormat,
  minRange,
  minValue,
  maxValue,
  placeholder,
  prop,
  setFilter,
  step,
}: Props<TFilter>) => {
  const updateFilter = useCallback(
    (value: [number, number]) => {
      setFilter({
        ...filter,
        [prop]: getRangeIncludesFilter(value),
      });
    },
    [filter, setFilter, prop]
  );

  const handleChange = useCallback(
    (value: [number, number]) => {
      updateFilter(value);
    },
    [updateFilter]
  );

  return (
    <>
      {placeholder && <label>{placeholder}</label>}

      <RangeSlider
        step={step ?? 0.1}
        className={className}
        disabled={disabled}
        defaultValue={defaultValue}
        labelAlwaysOn
        label={labelFormat}
        min={minValue}
        max={maxValue}
        minRange={minRange ?? 0.1}
        onChange={handleChange}
      />
    </>
  );
};
