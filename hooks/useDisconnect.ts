import { useMutation } from "@tanstack/react-query";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import { disconnect } from "~/internal/web3/connect-wallet";
import { useWalletStore } from "~/state/wallet";

export function useDisconnect() {
  const { address, reset } = useWalletStore();

  return useMutation({
    mutationKey: createQueryKey("DisconnectWallet", {
      address,
    }),
    mutationFn: async () => {
      await disconnect();
      reset();
    },
  });
}
