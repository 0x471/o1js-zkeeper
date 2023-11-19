"use client";
import { Faucet } from "@/components/faucet";
import { useFaucet } from "@/lib/stores/balances";
import { useWalletStore } from "@/lib/stores/wallet";
import Hero from '@/components/hero';
import FAQ from '@/components/faq';
import LoginForm from '@/components/LoginForm';
import RegistrationForm from '@/components/RegistrationForm';
import AuthBox from '@/components/AuthBox';





export default function Home() {
  const wallet = useWalletStore();
  const drip = useFaucet();

  return (
    <div className="mx-auto mt-10 h-full pt-16">
      <div className="flex h-full w-full items-center justify-center pt-16">
        <div className="flex basis-4/12 flex-col items-center justify-center 2xl:basis-3/12">

           
          <Hero/>
<Faucet
            wallet={wallet.wallet}
            onConnectWallet={wallet.connectWallet}
            onDrip={drip}
            loading={false}
          /> 
          <AuthBox />
         

          <FAQ />
        
          


          



        </div>
      </div>
    </div>
  );
}
