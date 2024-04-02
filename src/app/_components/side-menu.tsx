"use client";

import { signOut, useSession } from "next-auth/react";
import { CloudWallet } from "./cloud-wallet";
import { Button } from "@/components/ui/button";
import { useDisconnect, useAccount } from "wagmi";

const SideMenu = () => {
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex h-20 items-center border-b border-gray-700 p-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <p className="text-lg">{session.user?.email}</p>
        ) : (
          <p>Not signed in</p>
        )}
      </div>
      {/* Menu Items */}
      <div className="py-4">
        {/* Add your menu items here */}
        <a
          href="#"
          className="block bg-[#0d0e25] bg-transparent px-4 py-2 text-lg"
        >
          Dashboard
        </a>
      </div>

      {/* Signout Button */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="cloud-wallet-wrapper flex items-center justify-center p-4">
          <CloudWallet key={"cloud-wallet"} />
        </div>
        <div className="w-full px-4 py-3 text-center">
          {address && (
            <Button
              className="bg-transparent text-lg font-semibold text-white bg-slate-500"
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </Button>
          )}
        </div>
        <div className="border-t border-gray-700">
          <Button
            className="w-full bg-[#2e026d] bg-transparent px-4 py-3 text-center text-lg font-semibold text-white "
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
