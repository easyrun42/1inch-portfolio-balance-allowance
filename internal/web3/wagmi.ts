import { Config, createStorage } from "@wagmi/core";
import { projectId, metadata } from "./wallet-connect";
import { createPublicClient, fallback, http } from "viem";
import { mainnet } from "viem/chains";

let configSingleton: Config;

async function getConfig() {
  if (configSingleton) {
    return configSingleton;
  }

  // Tree shaking. This will improve the bundle size.
  const { defaultWagmiConfig } = await import("@web3modal/wagmi");
  const { mainnet } = await import("viem/chains");

  // Only mainnet is supported
  const chains = [mainnet] as const;

  configSingleton = await defaultWagmiConfig({
    chains,
    projectId,
    metadata,
  });

  return configSingleton;
}

const storage = createStorage({
  storage: typeof localStorage !== "undefined" ? localStorage : undefined,
  key: "1inch",
});

const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    http(process.env.MAINNET_RPC_URL),
    http("https://cloudflare-eth.com"),
    http("https://eth.llamarpc.com"),
    http("https://ethereum.publicnode.com"),
  ]),
});

export { mainnetPublicClient, storage, getConfig };
