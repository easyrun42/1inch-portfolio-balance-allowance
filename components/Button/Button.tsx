import { HTMLProps } from "react";
import clsx from "clsx";

const defaultButtonClassName = "outline-0 w-full focus:outline-none";

interface ButtonProps
  extends Omit<HTMLProps<HTMLButtonElement>, "type" | "className"> {
  type?: "submit" | "reset" | "button";
  containerClassName?: string;
  buttonClassName?: string;
  leftIcon?: React.ReactNode;
}

export function Button({
  containerClassName = "",
  buttonClassName = "",
  leftIcon,
  ...rest
}: ButtonProps) {
  return (
    <div
      className={clsx("flex items-center justify-center", containerClassName)}
    >
      {leftIcon && leftIcon}
      <button
        className={clsx(defaultButtonClassName, buttonClassName)}
        {...rest}
      />
    </div>
  );
}
