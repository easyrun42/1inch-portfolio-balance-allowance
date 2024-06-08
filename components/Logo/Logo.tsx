import Image, { ImageProps } from "next/image";

interface LogoProps {
  height?: ImageProps["height"];
  width?: ImageProps["width"];
}

export function Logo({ height = 600, width = 1280 }: LogoProps) {
  return (
    <Image
      src="/1inch_color_white.png"
      height={height}
      width={width}
      alt="logo"
      priority
    />
  );
}
