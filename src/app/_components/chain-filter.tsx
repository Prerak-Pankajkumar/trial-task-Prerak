import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectChains = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px] bg-transparent">
        <SelectValue placeholder="Select a Chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3?source=uniswap">
          Etereum
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon?source=uniswap">
          Polygon
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis?source=uniswap">
          Optimism
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-arbitrum-one?source=uniswap">
          Arbitrum
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo?source=uniswap">
          Celo
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc?source=uniswap">
          BNB Chain
        </SelectItem>
        <SelectItem value="https://api.studio.thegraph.com/query/48211/uniswap-v3-base/version/latest?source=uniswap">
          Base
        </SelectItem>
        <SelectItem value="https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-avax?source=uniswap">
          Avalanche
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
