import { Text, Input, Logo } from "~/components";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";

export function EnterWalletAddressOrConnectWallet() {
  return (
    <div className="flex flex-col items-center justify-center bg-dark-blue-400 p-6 rounded-md gap-2">
      <Logo width={409} height={640} />
      <Input
        placeholder="Enter wallet address"
        className="rounded-xl placholder:text-light-blue-500 text-white bg-primary py-4 px-6 w-full"
      />
      <Text className="font-medium">Or</Text>
      <ConnectWallet />
    </div>
  );
}
