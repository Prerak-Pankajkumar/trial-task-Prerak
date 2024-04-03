import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const serverSession = await getServerAuthSession();
  console.log("session", serverSession);

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
                  className={`h-full w-auto bg-transparent bg-gradient-to-b from-[#adabaf] to-[#505053] p-5 text-3xl font-extrabold text-gray-300 transition duration-300`}
                >
                  <Link href={"/auth/signin"}>{"Let's get started"}</Link>
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
  else redirect("/dashboard");
}
