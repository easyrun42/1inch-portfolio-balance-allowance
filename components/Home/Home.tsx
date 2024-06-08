"use client";

import { EnterWalletAddressOrConnectWallet } from "~/components/EnterWalletAddressOrConnectWallet/EnterWalletAddressOrConnectWallet";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <EnterWalletAddressOrConnectWallet />
    </div>
  );
}
