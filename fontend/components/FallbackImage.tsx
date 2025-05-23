"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

interface FallbackImageProps extends Omit<ImageProps, "src"> {
  src: string
  fallbackSrc?: string
}

export default function FallbackImage({ src, fallbackSrc = "/placeholder.svg", ...props }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
