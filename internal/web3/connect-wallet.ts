import type { Config, WatchAccountParameters } from "@wagmi/core";
import { getConfig } from "./wagmi";
import { projectId, metadata, getWeb3Modal } from "./wallet-connect";
import { Address } from "viem";

export interface OnWatchAddressListenerParameters {
  config: Config;
  onAccountChange: ConnectWalletParameters["onAccountChange"];
}

export interface ReconnectParameters {
  onAccountChange: WatchAccountParameters["onChange"];
  onConnect: ({ address }: { address: Address }) => void;
}

export interface ConnectWalletParameters {
  onAccountChange: WatchAccountParameters["onChange"];
  onConnect: ({ address }: { address: Address }) => void;
}

async function onWatchAddressListener({
  config,
  onAccountChange,
}: OnWatchAddressListenerParameters) {
  const { watchAccount: watchAccount_wagmi } = await import("@wagmi/core");

  watchAccount_wagmi(config, {
    onChange: onAccountChange,
  });
}

export async function disconnect() {
  const { disconnect: disconnect_wagmi } = await import("@wagmi/core");

  const config = await getConfig();

  await disconnect_wagmi(config);
}

export async function reconnect({
  onAccountChange,
  onConnect,
}: ReconnectParameters) {
  const { getAccount, reconnect: reconnect_wagmi } = await import(
    "@wagmi/core"
  );

  const config = await getConfig();

  await reconnect_wagmi(config);

  const { address: currentConnectedAddress } = getAccount(config);

  if (currentConnectedAddress) {
    onConnect({ address: currentConnectedAddress });
    onWatchAddressListener({ config, onAccountChange });
    return currentConnectedAddress;
  }
}

export async function connectWallet({
  onAccountChange,
  onConnect,
}: ConnectWalletParameters) {
  // Tree shake
  const { getAccount, reconnect: reconnect_wagmi } = await import(
    "@wagmi/core"
  );

  const config = await getConfig();

  await reconnect_wagmi(config);

  const currentConnectedAddress = getAccount(config).address;

  if (currentConnectedAddress) {
    onWatchAddressListener({ config, onAccountChange });
    onConnect({ address: currentConnectedAddress });
    return currentConnectedAddress;
  }

  const web3modal = await getWeb3Modal();

  await web3modal.open();

  const connectedAddress: Address = await new Promise((resolve, reject) => {
    web3modal.subscribeEvents(async ({ data }) => {
      if (data.event === "MODAL_CLOSE" || data.event === "CONNECT_SUCCESS") {
        const connectedAddress = getAccount(config).address;

        // If user connects their wallet, the modal should close immediately
        // and the address should be available otherwise we throw an error
        if (!connectedAddress) {
          reject("User rejected.");
          return;
        }

        return resolve(connectedAddress);
      }
    });
  });

  onWatchAddressListener({ config, onAccountChange });

  onConnect({ address: connectedAddress });

  return connectedAddress;
}
