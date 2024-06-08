import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import {
  ConnectWalletParameters,
  connectWallet,
} from "~/internal/web3/connect-wallet";
import { storage } from "~/internal/web3/wagmi";
import { useWalletStore } from "~/state/wallet";

export function useConnectWallet() {
  const { address, setAddress, setIsManuallyConnected, reset } =
    useWalletStore();

  const onConnect: ConnectWalletParameters["onConnect"] = useCallback(
    ({ address }) => {
      setAddress(address);
      setIsManuallyConnected(true);
      storage.setItem("connected-address", address);
    },
    [setAddress, setIsManuallyConnected]
  );

  const onAccountChange: ConnectWalletParameters["onAccountChange"] =
    useCallback(
      ({ address: changedAddress }) => {
        setAddress(changedAddress || null);
        if (!changedAddress) reset();
      },
      [reset, setAddress]
    );

  return useMutation({
    mutationKey: createQueryKey("ConnectWallet", {
      address,
    }),
    mutationFn: () => connectWallet({ onAccountChange, onConnect }),
  });
}
