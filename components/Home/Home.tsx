import { EnterWalletAddressOrConnectWallet, Text } from "~/components";
import { useWalletStore } from "~/state/wallet";
import { Portfolio } from "../Portfolio/Portfolio";
import { useReconnectOnMount } from "~/hooks/useReconnectOnMount";

export function Home() {
  const { isPending } = useReconnectOnMount();
  const { address } = useWalletStore();

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      {isPending ? (
        <Text as="h1" className="text-white">
          Reconnecting...
        </Text>
      ) : address ? (
        <Portfolio address={address} />
      ) : (
        <EnterWalletAddressOrConnectWallet />
      )}
    </div>
  );
}
