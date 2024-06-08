import Image from "next/image";
import { useWalletStore } from "~/state/wallet";
import { Box } from "../Box/Box";
import { Text } from "../Text/Text";
import { shortenAddress } from "~/utils/address";
import { useNativeBalance } from "~/hooks/useNativeBalance";
import { useAddressDetails } from "~/hooks/useAddressDetails";
import { Button } from "../Button/Button";
import { useDisconnect } from "~/hooks/useDisconnect";

export function Profile() {
  const { address, isManuallyConnected, reset } = useWalletStore();
  const { data: nativeBalance, isLoading: isNativeBalanceLoading } =
    useNativeBalance();

  // We use this pattern to ensure that this component
  // is only rendered when the address is present.
  if (!address) {
    throw new Error("Address is required");
  }

  const { profileImage, etherscanUrl, setProfileImage } = useAddressDetails();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnect();

  return (
    <Box className="flex flex-col gap-8 items-start">
      <Box className="flex gap-8">
        <Image
          src={profileImage}
          height={156}
          width={156}
          alt="address-pfp"
          className="rounded-xl sm:flex max-w-auto hidden"
          unoptimized
          onError={() => {
            // In case of the profile image doesn't work
            setProfileImage("/1inch_without_text.png");
          }}
        />

        <Box className="flex flex-col sm:gap-0 gap-2 justify-between">
          <Text className="text-white sm:text-2xl text-xl">
            Wallet Overview
          </Text>
          <Text className="text-white sm:text-6xl text-4xl font-semibold">
            {isNativeBalanceLoading ? "..." : `${nativeBalance} ETH`}
          </Text>
          <Text
            as="a"
            href={etherscanUrl}
            target="_blank"
            className="text-dark-blue-300 text-md underline"
          >
            {shortenAddress(address)}
          </Text>
        </Box>
      </Box>

      {isManuallyConnected ? (
        <Button
          disabled={isDisconnecting}
          onClick={() => disconnect()}
          buttonClassName="bg-btn-dark-500 text-md max-w-fit py-2 px-4 rounded-xl text-blue-500 border-0 rounded-md p-4 hover:bg-btn-dark-400 disabled:bg-btn-dark-500 disabled:opacity-50"
        >
          {isDisconnecting ? "Disconnecting..." : "Disconnect"}
        </Button>
      ) : (
        <Button
          onClick={reset}
          buttonClassName="bg-btn-dark-500 text-md max-w-fit py-2 px-4 rounded-xl text-blue-500 border-0 rounded-md p-4 hover:bg-btn-dark-400"
        >
          Choose new wallet
        </Button>
      )}
    </Box>
  );
}
