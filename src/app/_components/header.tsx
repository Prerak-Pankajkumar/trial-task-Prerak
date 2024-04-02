"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  onOptionSelect: (selected: string) => void;
  selectedOption: string;
}

const Header = ({ onOptionSelect, selectedOption }: HeaderProps) => {
  return (
    <header className="flex items-center bg-[#2e026d] px-6 py-4 text-white h-20">
      <div className="max-w-7xl">
        <nav className="space-x-16">
          <Button
            className={`text-lg bg-transparent text-gray-300 transition duration-300 hover:text-gray-100 hover:bg-slate-500 ${
              selectedOption === "All" ? "font-extrabold text-white underline" : ""
            }`}
            onClick={() => onOptionSelect("All")}
          >
            All
          </Button>
          <Button
            className={`text-lg bg-transparent text-gray-300 transition duration-300 hover:text-gray-100 hover:bg-slate-500 ${
              selectedOption === "Uniswap" ? "font-extrabold text-white underline" : ""
            }`}
            onClick={() => onOptionSelect("Uniswap")}
          >
            Uniswap
          </Button>
          <Button
            onClick={() => onOptionSelect("Pancakeswap")}
            className={`text-lg bg-transparent text-gray-300 transition duration-300 hover:text-gray-100 hover:bg-slate-500 ${
              selectedOption === "Pancakeswap" ? "font-extrabold text-white underline" : ""
            }`}
          >
            Pancakeswap
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
