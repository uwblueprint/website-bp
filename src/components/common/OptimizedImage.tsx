import Image, { type ImageProps } from "next/image";

type FixedOptimizedImageProps = Omit<ImageProps, "alt" | "width" | "height"> & {
  alt: string;
  width: number;
  height: number;
  fill?: never;
};

type FillOptimizedImageProps = Omit<ImageProps, "alt" | "width" | "height"> & {
  alt: string;
  fill: true;
  width?: never;
  height?: never;
};

type OptimizedImageProps = FixedOptimizedImageProps | FillOptimizedImageProps;

export default function OptimizedImage(props: OptimizedImageProps) {
  return <Image {...(props as ImageProps)} />;
}
