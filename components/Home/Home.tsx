import { EnterWalletAddressOrConnectWallet, Text } from "~/components";
import { useWalletStore } from "~/state/wallet";
import { Portfolio } from "../Portfolio/Portfolio";
import { useReconnectOnMount } from "~/hooks/useReconnectOnMount";

export function Home() {
  const { isPending: isReconncting } = useReconnectOnMount();
  const { address } = useWalletStore();

  if (isReconncting) {
    return (
      <Text as="h1" className="text-white">
        Reconnecting...
      </Text>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {address ? <Portfolio /> : <EnterWalletAddressOrConnectWallet />}
    </div>
  );
}
