import { useQuery } from "@tanstack/react-query";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import { getNativeBalance } from "~/internal/web3/balance";
import { useWalletStore } from "~/state/wallet";

export function useNativeBalance() {
  const { address } = useWalletStore();

  return useQuery({
    queryKey: createQueryKey("NativeBalance", {
      address,
    }),
    queryFn: () => getNativeBalance({ address: address! }),
    enabled: !!address,
  });
}
