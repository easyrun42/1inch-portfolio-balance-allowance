import { Erc20BalanceWithAllowance } from "~/internal/web3/multicall";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { formatString } from "~/utils/formatter";

interface TokenRowProps extends Erc20BalanceWithAllowance {}

export function TokenRow({
  symbol,
  allowance,
  balanceOf,
  contractAddress,
  isUnlimited,
}: TokenRowProps) {
  const etherscanUrl = `https://etherscan.io/token/${contractAddress}`;

  return (
    <Box className="flex flex-col gap-2 border border-dark-blue-200 p-4 rounded-xl text-ellipsis">
      <Text
        as="a"
        href={etherscanUrl}
        target="_blank"
        className="text-white font-semibold text-lg hover:underline w-fit"
      >
        {symbol}
      </Text>
      <Text className="text-white truncate">
        <b>Balance</b> {formatString(balanceOf)}
      </Text>
      <Text as="span" className="text-white truncate">
        <b>Allowance:</b> {isUnlimited ? "Unlimited" : formatString(allowance)}
      </Text>
    </Box>
  );
}
