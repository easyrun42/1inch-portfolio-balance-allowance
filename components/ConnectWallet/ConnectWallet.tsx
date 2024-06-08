import { Button } from "../Button/Button";

function WalletLogo() {
  return (
    <svg _ngcontent-ng-c900833="" width="24" height="24">
      <use _ngcontent-ng-c900833=""></use>
    </svg>
  );
}

export function ConnectWallet() {
  return (
    <Button
      buttonClassName="bg-btn-dark text-md py-2 px-4 rounded-md text-blue-500 border-0 rounded-md p-4"
      leftIcon={<WalletLogo />}
    >
      Connect Wallet
    </Button>
  );
}
