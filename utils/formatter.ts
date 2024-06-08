import Big from "big.js";

export function formatString(value: string) {
  const numberValue = Big(value).toNumber();
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  }).format(numberValue);
}
