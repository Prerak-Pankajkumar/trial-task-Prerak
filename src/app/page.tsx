import Link from "next/link";
import Dashboard from "@/app/_components/dashboard";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const serverSession = await getServerAuthSession();

  return (
    <>
      {!serverSession ? (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Dex <span className="text-[hsl(280,100%,70%)]">Screener</span> App
            </h1>
            <p className="text-2xl text-white">
              Dapp where users can view swap transactions from{" "}
              <span className="text-[hsl(280,100%,70%)]">pancakeswap</span> and{" "}
              <span className="text-[hsl(280,100%,70%)]">uniswap</span>.
            </p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                  asChild
                  className={`h-full w-auto border bg-transparent from-[#adabaf] to-[#505053] p-5 text-3xl font-extrabold text-gray-300 transition duration-300 hover:bg-gradient-to-b`}
                >
                  <Link href={"/api/auth/signin"}>{"Sign In"}</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <ShowcaseDashboard />
      )}
    </>
  );
}

async function ShowcaseDashboard() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  return (
    <main className="flex min-h-screen min-w-full bg-gray-800 text-white">
      <Dashboard />
    </main>
  );
}
