import { Address } from "viem";

interface PortfolioProps {
  address: Address;
}

export function Portfolio({ address }: PortfolioProps) {
  return <h2>{address}</h2>;
}
