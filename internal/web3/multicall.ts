import { Address, erc20Abi, formatEther } from "viem";
import { mainnetPublicClient } from "./wagmi";
import Big from "big.js";

export interface Erc20BalanceWithAllowance extends ERC20Token {
  allowance: string;
  balanceOf: string;
  isUnlimited: boolean;
}

export interface ERC20Token {
  symbol: string;
  contractAddress: Address;
}

interface MultiCallAllowanceParameters {
  erc20Tokens: ERC20Token[];
  owner: Address;
  spender: Address;
}

function bigIntFallback(bigint: unknown) {
  return typeof bigint === "bigint" ? bigint : BigInt("0");
}

export async function getErc20BalancesWithAllowances({
  erc20Tokens,
  owner,
  spender,
}: MultiCallAllowanceParameters): Promise<Erc20BalanceWithAllowance[]> {
  const contracts = erc20Tokens
    .map(({ contractAddress }) => [
      {
        abi: erc20Abi,
        address: contractAddress,
        functionName: "allowance",
        args: [owner, spender],
      },
      {
        abi: erc20Abi,
        address: contractAddress,
        functionName: "balanceOf",
        args: [owner],
      },
      {
        abi: erc20Abi,
        address: contractAddress,
        functionName: "totalSupply",
      },
      {
        abi: erc20Abi,
        address: contractAddress,
        functionName: "decimals",
      },
    ])
    .flat();

  const multicallResults = await mainnetPublicClient.multicall({
    contracts,
  });

  return erc20Tokens.map((token, idx) => {
    const { result: allowanceResult } = multicallResults[idx * 4];
    const { result: balanceOfResult } = multicallResults[idx * 4 + 1];
    const { result: totalSupplyResult } = multicallResults[idx * 4 + 2];
    const { result: decimalsResult } = multicallResults[idx * 4 + 3];

    const decimals = decimalsResult as number;

    // Each token has a decimals value, which is used to divide the balanceOf result
    const balanceOf = Big(bigIntFallback(balanceOfResult).toString())
      .div(Big(10).pow(decimals).toNumber())
      .round(6)
      .toString();

    // Same rule applies for allowance
    const allowance = Big(bigIntFallback(allowanceResult).toString())
      .div(Big(10).pow(decimals).toNumber())
      .round(6)
      .toString();

    // Same rule applies for totalSupply
    const totalSupply = Big(bigIntFallback(totalSupplyResult).toString())
      .div(Big(10).pow(decimals).toNumber())
      .round(6)
      .toString();

    return {
      ...token,
      allowance,
      balanceOf,
      isUnlimited: Big(allowance).gte(totalSupply),
    };
  });
}
