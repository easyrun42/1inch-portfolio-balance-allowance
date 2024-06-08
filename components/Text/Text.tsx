import { HTMLProps, createElement } from "react";
import clsx from "clsx";

const defaultParagraphClassName = "text-white";

interface TextProps extends HTMLProps<HTMLParagraphElement> {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Text({ as = "p", className = "", ...rest }: TextProps) {
  return createElement(as, {
    className: clsx(defaultParagraphClassName, className),
    ...rest,
  });
}
