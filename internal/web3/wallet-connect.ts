import { getConfig } from "./wagmi";
import type { Web3Modal } from "@web3modal/wagmi";

let web3ModalSingleton: Web3Modal;

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

const metadata = {
  name: "1inch portfolio balance allowance tracker",
  description:
    "Check your ERC20 tokens balances and allowance amount from 1inch contract router",
  url: "https://1inch.io",
  icons: ["https://avatars.githubusercontent.com/u/43341157"],
};

export async function getWeb3Modal() {
  if (web3ModalSingleton) {
    return web3ModalSingleton;
  }

  // Tree shake
  const { createWeb3Modal } = await import("@web3modal/wagmi");

  const config = await getConfig();

  web3ModalSingleton = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false,
    allowUnsupportedChain: true,
    metadata,
  });

  return web3ModalSingleton;
}

export { projectId, metadata };
