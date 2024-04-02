"use client";

import * as React from "react";
import SideMenu from "@/app/_components/side-menu";
import Header from "@/app/_components/header";
import { SwapTranction } from "@/app/_components/swap-transaction-table";
import { useAccount } from "wagmi";

const Dashboard = () => {
  const { address } = useAccount();
  const [selectedOption, setSelectedOption] = React.useState("All");

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const renderDashboardView = React.useCallback(() => {
    switch (selectedOption) {
      case "All":
        return (
          <>
            <SwapTranction
              initialRows={10}
              subgraphParameter={"uniswap/uniswap-v3"}
            />
          </>
        );
      case "Uniswap":
        return (
          <>
            <SwapTranction
              subgraphParameter={"uniswap/uniswap-v3"}
              initialRows={10}
            />
          </>
        );
      case "Pancakeswap":
        return (
          <>
            <SwapTranction
              subgraphParameter={"pancakeswap/exchange-v3-eth"}
              initialRows={10}
            />
          </>
        );
      default:
        return null;
    }
  }, [selectedOption]);

  return (
    <div className="flex h-screen w-full">
      {/* Side Menu */}
      <div className="w-64 bg-gray-800">
        <SideMenu />
      </div>

      {/* Main Content */}
      <div className="flex w-full flex-1 flex-col">
        <Header
          onOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {address ? (
            <>
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                  <span className="text-[hsl(280,100%,70%)]">
                    {selectedOption}
                  </span>{" "}
                  Transactions
                </h1>
              </div>
              {renderDashboardView()}
            </>
          ) : (
            <>
              <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                  Connect your{" "}
                  <span className="text-[hsl(280,100%,70%)]">Wallet</span>
                </h1>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
