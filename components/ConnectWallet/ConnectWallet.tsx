import { useConnectWallet } from "~/hooks/useConnectWallet";
import { Button } from "~/components";

function WalletLogo() {
  return (
    <svg _ngcontent-ng-c900833="" width="24" height="24">
      <use _ngcontent-ng-c900833=""></use>
    </svg>
  );
}

export function ConnectWallet() {
  const { isPending, mutate } = useConnectWallet();

  return (
    <Button
      buttonClassName="bg-btn-dark-500 text-md py-2 px-4 rounded-xl text-blue-500 border-0 rounded-md p-4 hover:bg-btn-dark-400"
      leftIcon={<WalletLogo />}
      onClick={() => mutate()}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
