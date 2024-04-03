import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { CloudWallet } from "./cloud-wallet";
import { Button } from "@/components/ui/button";
import { useDisconnect, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ButtonLoader from "@/app/_components/button-loader";
import Image from "next/image";

interface SideMenuInterface {
  showSideMenu: boolean;
  toggleSideMenu: () => void;
}

const SideMenu = ({ showSideMenu, toggleSideMenu }: SideMenuInterface) => {
  const { data: session } = useSession();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ redirect: false }).then(() => {
      router.push("/auth/signin");
      setLoading(false);
    });
  };

  return (
    <div
      className={`sideMenu  fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white sm:w-72 ${showSideMenu ? "show" : ""} `}
    >
      <div className="flex h-20 items-center justify-between border-b border-gray-700 p-4">
        <Button className="sidebar-toggle" onClick={toggleSideMenu}>
          <Image
            height={25}
            width={25}
            src="/hamburger.svg"
            alt="Hamburger"
            style={{ filter: "invert(1)" }}
          />
        </Button>
        <p className="text-2xl font-semibold">{"Dex Screener"}</p>
      </div>
      <div className="cloud-wallet-wrapper flex items-center justify-center p-4">
        <CloudWallet key={"cloud-wallet"} />
      </div>
      {/* Menu Items */}
      <div className="py-4">
        {/* Add your menu items here */}
        <a
          href="#"
          className="block bg-[#2d348b] bg-transparent px-4 py-2 font-semibold"
        >
          Dashboard
        </a>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="w-full px-4 py-3 text-center">
          {address && (
            <Button
              className="bg-slate-500 bg-transparent text-lg font-semibold text-white"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </Button>
          )}
        </div>
        <div className="h-[4rem] border-t border-gray-700 py-2">
          <Button
            disabled={loading}
            className="w-full bg-[#2e026d] bg-transparent px-4 py-3 text-center text-lg font-semibold text-white "
            onClick={handleSignOut}
          >
            <div>
              <p className="text-sm">{session?.user?.email}</p>
              Sign Out {loading && <ButtonLoader />}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
