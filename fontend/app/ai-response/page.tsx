"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIResponsePage() {
  const router = useRouter()

  // Nếu không có dữ liệu chat trong sessionStorage, hiển thị dữ liệu mẫu
  useEffect(() => {
    const chatSummaryElement = document.getElementById("chatSummary")
    if (!chatSummaryElement) return

    const lastChatResponse = sessionStorage.getItem("lastChatResponse")
    if (!lastChatResponse) {
      // Dữ liệu mẫu đã được hiển thị trong HTML
      return
    }

    try {
      const messages = JSON.parse(lastChatResponse)

      // Hiển thị tóm tắt cuộc trò chuyện thực tế
      let summaryHTML = ""
      messages.forEach((message) => {
        const role = message.role === "user" ? "admin" : "Trợ lý AI"
        const content = message.content

        summaryHTML += `<p><strong>${role}:</strong> ${content}</p>`
      })

      if (summaryHTML) {
        chatSummaryElement.innerHTML = summaryHTML
      }
    } catch (error) {
      // Giữ nguyên dữ liệu mẫu nếu có lỗi
    }
  }, [])

  // Nếu không có dữ liệu chat trong sessionStorage, chuyển hướng về trang chính
  useEffect(() => {
    const lastChatResponse = sessionStorage.getItem("lastChatResponse")
    if (!lastChatResponse) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card className="border-none shadow-luxury">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-forest-600" />
            </div>
            <CardTitle className="text-2xl font-serif">Trợ lý AI đã trả lời</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã sử dụng trợ lý AI của OGCamping. Chúng tôi đã ghi nhận thông tin của bạn và sẽ liên hệ sớm
              nếu cần thiết.
            </p>
            <div className="bg-forest-50 p-4 rounded-lg border border-forest-100 text-left mb-4">
              <h3 className="font-medium text-forest-700 mb-2">Thông tin cuộc trò chuyện:</h3>
              <div id="chatSummary" className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Bạn:</strong> Gói nào phù hợp cho cặp đôi?
                </p>
                <p>
                  <strong>Trợ lý AI:</strong> Tuyệt vời! Cho cặp đôi, tôi đặc biệt khuyên bạn nên chọn Gói Full A
                  (750,000₫) hoặc Gói Full A+ (850,000₫). Gói Full A bao gồm lều Decathlon cao cấp, bữa tối đặc biệt với
                  thịt heo ướp mè, 1L rượu Đồng Nai, và bữa sáng với cà phê Mokapot. Hiện tại chúng tôi đang có ưu đãi
                  đặc biệt cho các đặt chỗ vào giữa tuần - giảm 10% cho Gói Full A+.
                </p>
                <p>
                  <strong>Bạn:</strong> Cuối tuần này còn chỗ không?
                </p>
                <p>
                  <strong>Trợ lý AI:</strong> Tôi vừa kiểm tra lịch đặt chỗ và thấy rằng cuối tuần này chúng tôi chỉ còn
                  2 vị trí cuối cùng cho khu vực Lakefront - đây là khu vực đẹp nhất với view trực tiếp ra hồ! Nếu bạn
                  quan tâm, tôi khuyên bạn nên đặt chỗ sớm vì khu vực này thường hết chỗ rất nhanh.
                </p>
              </div>
            </div>
            <p className="text-sm text-forest-600 font-medium">
              Nhân viên của chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận thông tin đặt chỗ.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button asChild variant="outline" className="flex items-center">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang chủ
              </Link>
            </Button>
            <Button asChild className="bg-forest-700 hover:bg-forest-800">
              <Link href="/booking">Đặt chỗ ngay</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
