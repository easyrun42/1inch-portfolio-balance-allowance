import { ChangeEvent, FormEvent, useState } from "react";
import { Address, checksumAddress, isAddress } from "viem";
import { Text, Input, Logo, ConnectWallet, Button } from "~/components";
import { storage } from "~/internal/web3/wagmi";
import { useWalletStore } from "~/state/wallet";
import { Box } from "../Box/Box";

export function EnterWalletAddressOrConnectWallet() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setAddress } = useWalletStore();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAddress(input)) {
      const checksummedAddress = checksumAddress(
        input.toLowerCase() as Address
      );
      setAddress(checksummedAddress);
      storage.setItem("manual-address", checksummedAddress);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    setInput(currentValue);
    if (error) setError("");
  };

  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    if (currentValue && !isAddress(currentValue)) {
      setError("Please enter a valid wallet address");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center bg-dark-blue-400 p-6 rounded-md gap-2 mx-4 my-6 sm:flex-1 sm:max-h-[440px]"
    >
      <Logo width={409} height={640} />
      <Box className="flex sm:flex-row flex-col sm:items-stretch w-full gap-2">
        <Input
          placeholder="Enter wallet address"
          className="rounded-xl placholder:text-light-blue-500 text-white bg-primary py-3 sm:px-6 px-4 w-full"
          value={input}
          onChange={onChange}
          onBlur={onBlur}
        />

        <Button
          buttonClassName="bg-btn-dark-500 text-lg sm:max-w-fit w-full rounded-xl text-blue-500 border-0 rounded-md h-full py-2 px-6 hover:bg-btn-dark-400"
          type="submit"
        >
          Add
        </Button>
      </Box>

      {error && <Text className="font-medium text-red-400">{error}</Text>}

      <Text className="font-medium">Or</Text>
      <ConnectWallet />
    </form>
  );
}
