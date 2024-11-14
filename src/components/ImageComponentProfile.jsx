"use client";

import Image from "next/image";
import defaultImage from "@/../public/try-again.png";
export default function ImageComponentProfile({
  src,
  width,
  height,
  alt,
  className,
  quality,
}) {
  const isValidUrl = (imageUrl) => {
    const urlPattern = new RegExp(
      "^(?:(?<scheme>[^:\\/\\?#]+):)?(?:\\/\\/(?<authority>[^\\/?#]*))?(?<path>[^?#]*\\/)?(?<file>[^?#]*\\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]))(?:\\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$"
    );
    //The bottom regex expression does not work in all instances but it is from the 'sheCodes' website and the top one is from a different website
    const urlPattern2 = new RegExp(
      "^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // validate fragment locator
    return !!urlPattern.test(imageUrl);
  };
  console.log(isValidUrl());

  return (
    <>
      {isValidUrl(src) ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          quality={quality}
        />
      ) : (
        <Image
          src={defaultImage}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      )}
    </>
  );
}