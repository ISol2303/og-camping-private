"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useChat } from "ai/react"
import { useRouter } from "next/navigation"
import { Bot, Send, Tent, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatMessage } from "@/components/ai-chat/chat-message"
import { ChatSuggestion } from "@/components/ai-chat/chat-suggestion"

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [isTyping, setIsTyping] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const initialMessage = {
    id: "welcome",
    role: "assistant",
    content:
      "Xin chào! Tôi là trợ lý AI của OGCamping. Bạn đang tìm kiếm trải nghiệm cắm trại tuyệt vời tại Hồ Trị An? Tôi có thể giúp bạn tìm gói dịch vụ phù hợp nhất với nhu cầu của bạn. Bạn đi cùng bao nhiêu người và dự định đi vào thời gian nào?",
  }

  // Gợi ý câu hỏi theo mô hình chốt sales
  const suggestions = [
    "Gói nào phù hợp cho cặp đôi?",
    "Cuối tuần này còn chỗ không?",
    "Có ưu đãi đặc biệt nào không?",
    "Tôi nên chuẩn bị những gì?",
    "Làm sao để đến được Hồ Trị An?",
    "Cắm trại ở đó có an toàn không?",
  ]

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    api: "/api/chat",
    initialMessages: [initialMessage],
    onFinish: (message) => {
      setIsTyping(false)
      setLoadingMessage(null)

      // Lưu tin nhắn cuối cùng vào sessionStorage
      const lastMessages = messages.slice(-1).concat([
        {
          id: Date.now().toString(),
          role: "user",
          content: input,
        },
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: message.content,
        },
      ])

      sessionStorage.setItem("lastChatResponse", JSON.stringify(lastMessages))

      // Đặt flag để chuyển hướng sau khi người dùng đã đọc tin nhắn
      setShouldRedirect(true)

      // Hoặc chuyển hướng sau một khoảng thời gian
      setTimeout(() => {
        router.push("/ai-response")
      }, 5000) // Chuyển hướng sau 5 giây
    },
  })

  // Thêm hàm handleSubmit mới để hiển thị loading message ngay lập tức
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Hiển thị loading message ngay lập tức
    setLoadingMessage("Đang xử lý câu hỏi của bạn...")
    setIsTyping(true)

    // Gọi hàm handleSubmit gốc
    originalHandleSubmit(e)
  }

  const handleSuggestionClick = (suggestion: string) => {
    // Add user message
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        role: "user",
        content: suggestion,
      },
    ])

    // Hiển thị loading message ngay lập tức
    setLoadingMessage("Đang xử lý câu hỏi của bạn...")
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response = ""
      switch (suggestion) {
        case "Gói nào phù hợp cho cặp đôi?":
          response =
            "Tuyệt vời! Cho cặp đôi, tôi đặc biệt khuyên bạn nên chọn **Gói Full A** (750,000₫) hoặc **Gói Full A+** (850,000₫).\n\n**Gói Full A** bao gồm:\n- Lều Decathlon cao cấp dành cho 2 người\n- Bữa tối đặc biệt với thịt heo ướp mè (signature dish của chúng tôi)\n- Tặng 1L rượu Đồng Nai để tạo không khí lãng mạn\n- Bữa sáng với sandwich, trứng và cà phê Mokapot\n\n**Gói Full A+** có tất cả tiện ích trên và thêm:\n- Quạt điện trong lều để đảm bảo thoải mái\n- Check-in sớm 1h với cơm chiên OG đặc biệt\n- Thêm khăn giấy và kem chống muỗi\n\nHiện tại chúng tôi đang có ưu đãi đặc biệt cho các đặt chỗ vào giữa tuần - giảm 10% cho Gói Full A+. Bạn dự định đi vào thời gian nào? Tôi có thể kiểm tra tình trạng còn chỗ giúp bạn."
          break
        case "Cuối tuần này còn chỗ không?":
          response =
            "Tôi vừa kiểm tra lịch đặt chỗ và thấy rằng cuối tuần này chúng tôi chỉ còn **2 vị trí cuối cùng** cho khu vực Lakefront - đây là khu vực đẹp nhất với view trực tiếp ra hồ!\n\nĐây là thời điểm lý tưởng để đi cắm trại vì dự báo thời tiết cuối tuần này rất đẹp: nắng nhẹ, nhiệt độ 26-28°C và đặc biệt là đêm sẽ có trăng sáng.\n\nNếu bạn quan tâm, tôi khuyên bạn nên đặt chỗ sớm vì khu vực Lakefront thường hết chỗ rất nhanh, đặc biệt là vào cuối tuần. Bạn đi cùng bao nhiêu người và quan tâm đến gói dịch vụ nào?"
          break
        case "Có ưu đãi đặc biệt nào không?":
          response =
            "Tuyệt! Bạn đã hỏi đúng lúc. Chúng tôi đang có một số ưu đãi đặc biệt:\n\n1. **Ưu đãi giữa tuần**: Giảm 10% cho tất cả các gói khi đặt vào các ngày từ thứ Hai đến thứ Năm\n\n2. **Ưu đãi nhóm**: Khi đặt cho nhóm từ 6 người trở lên, bạn sẽ được tặng miễn phí 1 SUP (trị giá 200,000₫)\n\n3. **Ưu đãi sinh nhật**: Nếu có thành viên trong nhóm có sinh nhật trong tháng đi cắm trại, chúng tôi sẽ chuẩn bị bánh sinh nhật nhỏ miễn phí\n\n4. **Ưu đãi đặt sớm**: Đặt trước 2 tuần, nhận giảm 5% tổng hóa đơn\n\nNgoài ra, nếu bạn đặt ngay hôm nay, tôi có thể giúp bạn nhận thêm ưu đãi đặc biệt: miễn phí nâng cấp từ Gói Classic lên Gói Full A cho 2 người đầu tiên!\n\nBạn quan tâm đến ưu đãi nào? Tôi có thể giúp bạn đặt chỗ ngay bây giờ."
          break
        case "Tôi nên chuẩn bị những gì?":
          response =
            "Câu hỏi rất hay! Khi đến OGCamping, bạn không cần lo lắng nhiều vì chúng tôi đã chuẩn bị hầu hết mọi thứ cần thiết cho trải nghiệm cắm trại tuyệt vời. Tuy nhiên, đây là một số vật dụng cá nhân bạn nên mang theo:\n\n**Cần mang theo**:\n- Quần áo thoải mái và phù hợp với thời tiết\n- Đồ bơi (nếu bạn muốn tham gia các hoạt động dưới nước)\n- Kem chống nắng và thuốc chống côn trùng (mặc dù Gói Full A+ đã bao gồm kem chống muỗi)\n- Đồ vệ sinh cá nhân\n- Thuốc cá nhân nếu cần\n- Máy ảnh để ghi lại những khoảnh khắc đáng nhớ\n\n**Không cần mang theo**:\n- Lều, túi ngủ, nệm, gối (chúng tôi cung cấp tất cả)\n- Dụng cụ nấu ăn (đã bao gồm trong gói)\n- Thực phẩm và đồ uống cơ bản (đã bao gồm, nhưng bạn có thể mang thêm đồ ăn vặt yêu thích)\n\nBạn đã sẵn sàng cho chuyến đi chưa? Tôi có thể giúp bạn đặt chỗ ngay bây giờ để đảm bảo bạn có được vị trí tốt nhất tại Hồ Trị An."
          break
        case "Làm sao để đến được Hồ Trị An?":
          response =
            "Câu hỏi rất thiết thực! Hồ Trị An cách TP.HCM khoảng 70km và có nhiều cách để đến đó:\n\n1. **Tự lái xe**:\n   - Đường đi dễ dàng, thời gian di chuyển khoảng 1.5-2 giờ tùy giao thông\n   - Có bãi đậu xe an toàn tại khu cắm trại\n\n2. **Dịch vụ đưa đón của OGCamping**:\n   - Xe 16 chỗ cao cấp, máy lạnh\n   - Đón tận nơi trong TP.HCM\n   - Giá 150,000₫/người/khứ hồi (giảm còn 120,000₫/người cho nhóm từ 4 người)\n   - Lịch trình linh hoạt theo nhu cầu của bạn\n\n3. **Xe khách công cộng**:\n   - Từ bến xe miền Đông đến Định Quán\n   - Sau đó cần đi xe ôm khoảng 15-20 phút đến khu cắm trại\n\nĐặc biệt, khi đặt gói Full A hoặc Full A+ và sử dụng dịch vụ đưa đón của chúng tôi, bạn sẽ được tặng kèm tour tham quan ngắn các điểm đẹp nhất quanh hồ trên đường đến khu cắm trại.\n\nBạn dự định đi bằng phương tiện nào? Nếu bạn chọn dịch vụ đưa đón của chúng tôi, tôi có thể đặt trước cho bạn ngay bây giờ để đảm bảo có chỗ vào ngày bạn muốn đi."
          break
        case "Cắm trại ở đó có an toàn không?":
          response =
            "Câu hỏi rất quan trọng! An toàn luôn là ưu tiên hàng đầu của OGCamping. Khu cắm trại của chúng tôi được thiết kế với tiêu chuẩn an toàn cao nhất:\n\n- Khu vực cắm trại được giám sát 24/7 bởi đội ngũ an ninh chuyên nghiệp\n- Mỗi khu vực đều có ánh sáng đầy đủ vào ban đêm\n- Nhân viên hỗ trợ luôn túc trực và có thể liên hệ qua bộ đàm bất kỳ lúc nào\n- Tất cả nhân viên đều được đào tạo sơ cứu cơ bản\n- Khu vực cắm trại là private, chỉ dành cho khách đã đặt chỗ (tối đa 25 người)\n\nĐặc biệt, chúng tôi tự hào về thành tích an toàn hoàn hảo trong 3 năm qua với hơn 5,000 khách hàng.\n\nGói Full A+ của chúng tôi còn bao gồm dịch vụ tuần tra đêm và đèn cắm trại cao cấp, giúp bạn hoàn toàn yên tâm trong suốt thời gian lưu trú.\n\nBạn dự định đi vào cuối tuần nào? Tôi có thể giúp bạn đặt vị trí gần khu vực trung tâm để có sự an tâm tối đa."
          break
        default:
          response =
            "Tôi có thể giúp gì thêm cho bạn? Bạn có muốn tìm hiểu thêm về các gói dịch vụ hoặc đặt chỗ ngay không?"
      }

      setLoadingMessage(null)

      const newMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }

      setMessages((currentMessages) => [...currentMessages, newMessage])

      // Lưu tin nhắn vào sessionStorage
      const lastMessages = [
        ...messages.slice(-1), // Chỉ lấy tin nhắn cuối cùng trước đó
        {
          id: Date.now().toString(),
          role: "user",
          content: suggestion,
        },
        newMessage,
      ]

      sessionStorage.setItem("lastChatResponse", JSON.stringify(lastMessages))

      setIsTyping(false)

      // Đặt flag để chuyển hướng sau khi người dùng đã đọc tin nhắn
      setShouldRedirect(true)

      // Chuyển hướng sau một khoảng thời gian
      setTimeout(() => {
        router.push("/ai-response")
      }, 5000) // Chuyển hướng sau 5 giây
    }, 1000) // Giảm thời gian chờ từ 1500ms xuống 1000ms
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  // Hiển thị thông báo chuyển hướng nếu shouldRedirect = true
  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        router.push("/ai-response")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [shouldRedirect, router])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="bg-forest-100 p-2 rounded-full mr-3">
            <Tent className="h-5 w-5 text-forest-600" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg">OGCamping Trợ lý</h3>
            <p className="text-xs text-gray-500">Hỗ trợ 24/7</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading message */}
          {loadingMessage && (
            <ChatMessage
              message={{
                role: "assistant",
                content: loadingMessage,
              }}
              isLoading={true}
            />
          )}

          {/* Typing indicator - có thể xóa phần này vì đã có loading message */}
          <AnimatePresence>
            {isTyping && !loadingMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 max-w-[80%]"
              >
                <div className="bg-forest-100 p-2 rounded-full flex-shrink-0">
                  <Bot className="h-5 w-5 text-forest-600" />
                </div>
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-forest-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-forest-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-forest-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thông báo chuyển hướng */}
          {shouldRedirect && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-forest-100 p-3 rounded-lg text-center text-forest-700"
            >
              Bạn sẽ được chuyển đến trang xác nhận trong vài giây...
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && !shouldRedirect && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Gợi ý:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <ChatSuggestion key={suggestion} suggestion={suggestion} onClick={handleSuggestionClick} />
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Nhập tin nhắn của bạn..."
            className="flex-1 border-gray-300 focus:border-forest-500 focus:ring-forest-500"
            disabled={isLoading || shouldRedirect}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim() || shouldRedirect}
            className={`rounded-full ${
              input.trim() && !shouldRedirect ? "bg-forest-600 hover:bg-forest-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
