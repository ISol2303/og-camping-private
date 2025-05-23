import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trợ lý AI đã trả lời - OGCamping",
  description: "Cảm ơn bạn đã sử dụng trợ lý AI của OGCamping",
}

export default function AIResponseLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
