import { ChangeEvent, useState } from "react";
import { isAddress } from "viem";
import { Text, Input, Logo, ConnectWallet } from "~/components";
import { storage } from "~/internal/web3/wagmi";
import { useWalletStore } from "~/state/wallet";

export function EnterWalletAddressOrConnectWallet() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setAddress } = useWalletStore();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    if (error) setError("");
    if (isAddress(currentValue)) {
      setAddress(currentValue);
      storage.setItem("manual-address", currentValue);
    }
  };

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    if (currentValue && !isAddress(currentValue)) {
      setError("Please enter a valid wallet address");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-dark-blue-400 p-6 rounded-md gap-2">
      <Logo width={409} height={640} />
      <Input
        placeholder="Enter wallet address"
        className="rounded-xl placholder:text-light-blue-500 text-white bg-primary py-4 px-6 w-full"
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <Text className="font-medium text-red-500">{error}</Text>}

      <Text className="font-medium">Or</Text>
      <ConnectWallet />
    </div>
  );
}
