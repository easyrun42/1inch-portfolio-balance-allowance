import { Address } from "viem";
import { useWalletStore } from "~/state/wallet";
import { Profile } from "../Profile/Profile";
import { TokenBalancesWith1inchAllowances } from "~/components/TokenBalancesWith1inchAllowances/TokenBalancesWith1inchAllowances";

export function Portfolio() {
  const { address } = useWalletStore();

  // We use this pattern to ensure that this component
  // is only rendered when the address is present.
  if (!address) {
    throw new Error("Address is required");
  }

  return (
    <div className="flex flex-col items-start w-full max-w-[1060px] flex-1 gap-12 py-20 px-6">
      <Profile />
      <TokenBalancesWith1inchAllowances />
    </div>
  );
}
