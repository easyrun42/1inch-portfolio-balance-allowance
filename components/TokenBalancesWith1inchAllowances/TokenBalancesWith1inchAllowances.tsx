import { useMulticallBalancesWithAllowances } from "~/hooks/useMulticallBalancesWithAllowances";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { TokenRow } from "./TokenRow";

export function TokenBalancesWith1inchAllowances() {
  const {
    data: multicallBalancesWithAllowances = [],
    isLoading: isMulticallBalancesWithAllowancesLoading,
  } = useMulticallBalancesWithAllowances();

  return (
    <Box className="flex flex-col p-5 w-full bg-dark-blue-400 rounded-xl gap-6">
      <Text className="text-white text-2xl">
        Token balances & 1inch aggregator allowances
      </Text>

      {isMulticallBalancesWithAllowancesLoading ? (
        <Text className="color-white">...</Text>
      ) : (
        <Box className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {multicallBalancesWithAllowances.map((token) => (
            <TokenRow key={token.symbol} {...token} />
          ))}
        </Box>
      )}
    </Box>
  );
}
