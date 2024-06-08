import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import {
  ConnectWalletParameters,
  reconnect,
} from "~/internal/web3/connect-wallet";
import { storage } from "~/internal/web3/wagmi";
import { useWalletStore } from "~/state/wallet";

export function useReconnectOnMount() {
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

  const { mutate, ...rest } = useMutation({
    mutationKey: createQueryKey("ReconnectWallet", {
      address,
    }),
    mutationFn: async () => {
      const hasConnectedBefore = await storage.getItem("connected-address");
      if (!hasConnectedBefore) return;
      const connectedAccount = await reconnect({ onAccountChange, onConnect });
      if (!connectedAccount) storage.setItem("connected-address", null);
    },
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return rest;
}
