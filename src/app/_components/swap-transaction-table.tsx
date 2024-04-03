import { useCallback, useEffect, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { SelectChains } from "./chain-filter";
import { toast } from "@/components/ui/use-toast";

export interface ChainFilterOptionInterface {
  name: string;
  value: string;
}
interface SwapTranctionInterface {
  subgraphURL: string;
  multiSubGraph?: string[];
  initialRows: number;
  filterOptions: ChainFilterOptionInterface[];
}
interface TokenInterface {
  id: string;
  name: string;
  symbol: string;
  volume: string;
  txCount: string;
}
interface PoolInterface {
  liquidity: string;
  volumeUSD: string;
}
interface TransactionInterface {
  id: string;
  blockNumber: string;
  gasUsed: string;
  gasPrice: string;
}
interface SwapTransactionInterface {
  pool: PoolInterface;
  token0: TokenInterface;
  token1: TokenInterface;
  amountUSD: string;
  transaction: TransactionInterface;
}

export const SwapTranction = ({
  subgraphURL,
  initialRows,
  filterOptions,
}: SwapTranctionInterface) => {
  const [swapTransactions, setSwapTransactions] = useState<
    SwapTransactionInterface[]
  >([]);
  const [first, setFirst] = useState(initialRows);
  const [loading, setLoading] = useState(false);

  const formatAmount = (amount: number) => {
    if (Math.abs(amount) < 1e3) return amount.toFixed(2);
    if (Math.abs(amount) >= 1e3 && Math.abs(amount) < 1e6)
      return `$${(amount / 1e3).toFixed(1)}K`;
    if (Math.abs(amount) >= 1e6 && Math.abs(amount) < 1e9)
      return `$${(amount / 1e6).toFixed(1)}M`;
    if (Math.abs(amount) >= 1e9 && Math.abs(amount) < 1e12)
      return `$${(amount / 1e9).toFixed(1)}B`;
    if (Math.abs(amount) >= 1e12) return `$${(amount / 1e12).toFixed(1)}T`;
  };

  const columns: ColumnDef<SwapTransactionInterface, unknown>[] = [
    {
      accessorKey: "token",
      header: "Token",
      cell: ({ row }) => (
        <div className="capitalize">
          {`${row.original.token0.symbol} / ${row.original.token1.symbol} ${row.original.token0.name}`}
        </div>
      ),
    },
    {
      accessorKey: "pool",
      header: "Liquidity",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatAmount(Number(row.original.pool.liquidity))}
        </div>
      ),
    },
    {
      accessorKey: "amountUSD",
      header: "Amount (USD)",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatAmount(Number(row.original.amountUSD))}
        </div>
      ),
    },
    {
      accessorKey: "pool",
      header: "Volume",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatAmount(Number(row.original.pool.volumeUSD))}
        </div>
      ),
    },
    {
      accessorKey: "transaction",
      header: "Txn",
      cell: ({ row }) => (
        <div className="capitalize">
          {formatAmount(Number(row.original.transaction.gasUsed))}
        </div>
      ),
    },
  ];

  const fetchData = useCallback(
    async (subgraphURL: string) => {
      setLoading(true);
      try {
        const uniswapGraphQuery = `{
        swaps(first: ${first}) {
          id
          pool {
            liquidity
            volumeUSD
          }
          transaction {
            gasUsed
          }
          token0 {
            id
            name
            symbol
          }
          token1 {
            id
            name
            symbol
          }
          amountUSD
        }
      }`;
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: uniswapGraphQuery,
          }),
        };
        const response = await fetch(subgraphURL, options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const queryResult = response && (await response.json());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const newSwapTransactions = queryResult?.data
          ?.swaps as SwapTransactionInterface[];
        if (newSwapTransactions) {
          setLoading(false);
          setSwapTransactions(newSwapTransactions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    },
    [first],
  );

  const onLoadMore = () => {
    setFirst(first + 10);
    void fetchData(subgraphURL);
  };

  const onSelectChain = (value: string) => {
    void fetchData(value);
  };

  useEffect(() => {
    void fetchData(subgraphURL);
  }, [fetchData, subgraphURL]);

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="mb-5 flex justify-end">
          <SelectChains
            filterOptions={filterOptions}
            onSelect={onSelectChain}
          />
        </div>
        {swapTransactions && (
          <DataTable
            columns={columns}
            data={swapTransactions}
            loadMore={onLoadMore}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};
