import { Button } from "@/components/ui/button";
import protokit from "@/public/zkeeper_logo_neon_on.png";
import Image from "next/image";
// @ts-ignore
import truncateMiddle from "truncate-middle";
import { Skeleton } from "@/components/ui/skeleton";
import { Chain } from "./chain";
import { Separator } from "./ui/separator";

export interface HeaderProps {
  loading: boolean;
  wallet?: string;
  onConnectWallet: () => void;
  balance?: string;
  balanceLoading: boolean;
  blockHeight?: string;
}

export default function Header({
  loading,
  wallet,
  onConnectWallet,
  balance,
  balanceLoading,
  blockHeight,
}: HeaderProps) {
  return (
    
  <body>
    <div  className="fixed w-screen top-0 items-center !z-50 justify-between border-b p-2 bg-black/90	backdrop-blur-xl shadow-sm10">
      <div className="container flex">
        <div className="flex basis-6/12 items-center justify-start">
          <Image className="w-[45%]" src={protokit} alt={"Protokit logo"} />
          <Separator className="mx-4 h-8" orientation={"vertical"} />
          <div className="flex grow">
            <Chain height={blockHeight} />
          </div>
        </div>
        <div className="flex basis-6/12 flex-row items-center justify-end">
          
          {/* balance */}
          {wallet && (
            <div className="mr-4 flex shrink flex-col items-end items-center">
              <div>
                <p className="text-l text-white">Your Balance</p>
              </div>
              <div className="w-32 pt-0.5 text-right">
                {balanceLoading && balance === undefined ? (
                  <Skeleton className="h-4 w-full" />
                ) : (
                  <p className="text-xs text-white font-bold">{balance} MINA</p>
                )}
              </div>
            </div>
          )}
          {/* connect wallet */}
          <Button loading={loading} className="w-44 button" onClick={onConnectWallet}>
            <div>
              {wallet ? truncateMiddle(wallet, 7, 7, "...") : " 🔗 Connect wallet "}
            </div>
          </Button>
        </div>
      </div>
    </div>
  </body>
  );
}

