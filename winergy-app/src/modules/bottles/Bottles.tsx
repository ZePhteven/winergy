import { Bottle, BottlesFilter } from "@app/models/bottles";
import { BottlesService } from "@app/services/bottles.service";
import { useState } from "react";
import { MRT_ColumnDef } from "mantine-react-table";
import { FilterTextInput } from "@app/components/inputs/texts/FilterTextInput";
import { QueryTable } from "@app/components/tables/QueryTable";
import { FilterRangeInput } from "@app/components/inputs/numbers/FilterRangeInput";

export const Bottles = () => {
  const [filter, setFilter] = useState<BottlesFilter>({});

  const columns: MRT_ColumnDef<Bottle>[] = [
    {
      accessorKey: "id",
      enableSorting: false,
      header: "id",
      size: 50,
    },
    {
      accessorKey: "name",
      header: "Name",
      mantineTableBodyCellProps: {
        align: "left",
      },
      size: 100,
    },
    {
      accessorKey: "year",
      header: "Year",
      mantineTableBodyCellProps: {
        align: "left",
      },
      size: 100,
    },
    {
      accessorKey: "price",
      header: "Price",
      mantineTableBodyCellProps: {
        align: "center",
      },
      size: 100,
    },
    {
      accessorKey: "note",
      header: "Note",
      mantineTableBodyCellProps: {
        align: "center",
      },
      size: 100,
    },
  ];

  return (
    <section>
      <h2>Bottles</h2>

      <QueryTable
        entityColumns={columns}
        filter={filter}
        queryKey="bottles"
        service={BottlesService.getInstance()}
      >
        <FilterTextInput
          className="flex-1"
          filter={filter}
          placeholder={"Name"}
          prop="name"
          setFilter={setFilter}
        />

        <FilterRangeInput
          className="flex-1"
          defaultValue={[2000, 2020]}
          filter={filter}
          minRange={1}
          minValue={1950}
          maxValue={new Date().getFullYear()}
          placeholder="Year"
          prop="year"
          step={1}
          setFilter={setFilter}
        />

        <FilterRangeInput
          className="flex-1"
          defaultValue={[25, 50]}
          filter={filter}
          labelFormat={(v) => `${v}€`}
          minRange={1}
          minValue={1}
          maxValue={200}
          placeholder="Price"
          prop="price"
          setFilter={setFilter}
        />

        <FilterRangeInput
          className="flex-1"
          filter={filter}
          labelFormat={(v) => `${v}/5`}
          minValue={1}
          maxValue={5}
          placeholder="Note"
          prop="note"
          setFilter={setFilter}
        />
      </QueryTable>
    </section>
  );
};
