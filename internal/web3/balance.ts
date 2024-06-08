import { Address, formatEther } from "viem";
import { mainnetPublicClient } from "./wagmi";
import { Big } from "big.js";

interface GetNativeBalanceParameters {
  address: Address;
}

export async function getNativeBalance({
  address,
}: GetNativeBalanceParameters) {
  const balance = await mainnetPublicClient.getBalance({
    address,
  });

  return Big(formatEther(balance)).round(6).toString();
}
