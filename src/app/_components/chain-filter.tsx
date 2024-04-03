import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type ChainFilterOptionInterface } from "./swap-transaction-table";
interface ChainFilterInterface {
  filterOptions: ChainFilterOptionInterface[];
  onSelect: (selected: string) => void;
}

export const SelectChains = ({
  filterOptions,
  onSelect,
}: ChainFilterInterface) => {
  const handleChange = (value: string) => {
    onSelect(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-[280px] bg-transparent">
        <SelectValue placeholder="Select a Chain" />
      </SelectTrigger>
      <SelectContent>
        {filterOptions.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
