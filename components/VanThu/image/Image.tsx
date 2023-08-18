import Image from "next/image";
import React from "react";
// Khai báo một component sử dụng props
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}
const ImageComponent = (props: ImageProps) => {
  return (
    <>
      <Image
        src={props.src}
        width={50}
        height={50}
        alt={props.alt}
        className={props.className}
      />
    </>
  );
};

export default ImageComponent;
