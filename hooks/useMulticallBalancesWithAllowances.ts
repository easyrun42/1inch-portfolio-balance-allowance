import { useQuery } from "@tanstack/react-query";
import { createQueryKey } from "~/internal/react-query/create-query-key";
import { getErc20BalancesWithAllowances } from "~/internal/web3/multicall";
import { erc20Tokens } from "~/internal/web3/tokens";
import { useWalletStore } from "~/state/wallet";
import { _1inchRouterContractAddress } from "~/utils/1inch";

export function useMulticallBalancesWithAllowances() {
  const { address } = useWalletStore();

  return useQuery({
    queryKey: createQueryKey("MulticallBalancesWithAllowances", {
      address,
    }),
    queryFn: () =>
      getErc20BalancesWithAllowances({
        owner: address!,
        spender: _1inchRouterContractAddress,
        erc20Tokens,
      }),
    enabled: !!address,
  });
}
