"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeaderProps {
  onOptionSelect: (selected: string) => void;
  selectedOption: string;
  toggleSideMenu: () => void;
}

const Header = ({
  onOptionSelect,
  selectedOption,
  toggleSideMenu,
}: HeaderProps) => {
  return (
    <header className="flex h-20 items-center bg-[#2e026d] px-6 py-4 text-white">
      <div className="max-w-7xl">
        <nav className=" flex items-center space-x-2 sm:space-x-16">
          <Button className="sidebar-toggle min-w-14" onClick={toggleSideMenu}>
            <Image
              height={25}
              width={25}
              src="/hamburger.svg"
              alt="Hamburger"
              style={{ filter: "invert(1)" }}
            />
          </Button>
          <Button
            className={`headerBtn bg-transparent text-lg text-gray-300 transition duration-300 hover:bg-[#2d348b] hover:text-gray-100 ${
              selectedOption === "All"
                ? "font-extrabold text-white underline"
                : ""
            }`}
            onClick={() => onOptionSelect("All")}
          >
            All
          </Button>
          <Button
            className={`headerBtn bg-transparent text-lg text-gray-300 transition duration-300 hover:bg-[#2d348b] hover:text-gray-100 ${
              selectedOption === "Uniswap"
                ? "font-extrabold text-white underline"
                : ""
            }`}
            onClick={() => onOptionSelect("Uniswap")}
          >
            Uniswap
          </Button>
          <Button
            onClick={() => onOptionSelect("Pancakeswap")}
            className={`headerBtn bg-transparent text-lg text-gray-300 transition duration-300 hover:bg-[#2d348b] hover:text-gray-100 ${
              selectedOption === "Pancakeswap"
                ? "font-extrabold text-white underline"
                : ""
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
