import { Address } from "viem";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "~/internal/web3/wagmi";

interface WalletState {
  address: Address | null;
  isManuallyConnected: boolean;
  setAddress: (address: Address | null) => void;
  setIsManuallyConnected: (hasManuallyEnteredAddress: boolean) => void;
  reset: () => void;
}

export const useWalletStore = create<WalletState>()((set) => ({
  address: null,
  isManuallyConnected: false,
  setAddress: (address) => set(() => ({ address })),
  setIsManuallyConnected: (isManuallyConnected) =>
    set(() => ({ isManuallyConnected })),
  reset: () => {
    storage.removeItem("manual-address");
    storage.removeItem("connected-address");
    set(() => ({ address: null, isManuallyConnected: false }));
  },
}));
