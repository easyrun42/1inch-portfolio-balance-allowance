import { HTMLProps } from "react";

interface BoxProps extends HTMLProps<HTMLInputElement> {}

export function Box({ ...rest }: BoxProps) {
  return <div {...rest} />;
}
