import { useConnectWallet } from "~/hooks/useConnectWallet";
import { Button } from "~/components";

export function ConnectWallet() {
  const { isPending: isConnecting, mutate: connect } = useConnectWallet();

  return (
    <Button
      disabled={isConnecting}
      buttonClassName="bg-btn-dark-500 text-md py-2 px-4 rounded-xl text-blue-500 border-0 rounded-md p-4 hover:bg-btn-dark-400 disabled:bg-btn-dark-500 disabled:opacity-50"
      onClick={() => connect()}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
