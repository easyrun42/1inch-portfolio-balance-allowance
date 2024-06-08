import { HTMLProps } from "react";
import clsx from "clsx";

const defaultInputClassName = "border-0 outline-0 focus:outline-none";

interface InputProps extends HTMLProps<HTMLInputElement> {}

export function Input({ className = "", ...rest }: InputProps) {
  return <input className={clsx(defaultInputClassName, className)} {...rest} />;
}
