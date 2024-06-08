import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import { getNativeBalance } from "~/internal/web3/balance";
import { useWalletStore } from "~/state/wallet";

export function useAddressDetails() {
  const { address } = useWalletStore();

  const [profileImage, setProfileImage] = useState(
    `https://effigy.im/a/${address}.svg`
  );

  const etherscanUrl = `https://etherscan.io/address/${address}`;

  return { profileImage, etherscanUrl, setProfileImage };
}
