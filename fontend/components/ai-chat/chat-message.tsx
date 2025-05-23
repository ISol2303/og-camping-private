"use client"

import { useEffect, useState } from "react"
import { Bot, User } from "lucide-react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
  isLoading?: boolean
}

export function ChatMessage({ message, isLoading = false }: ChatMessageProps) {
  const [renderedContent, setRenderedContent] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const isUser = message.role === "user"

  // Simulate typing effect for assistant messages
  useEffect(() => {
    if (message.role === "assistant") {
      let i = 0
      const content = message.content
      const interval = setInterval(() => {
        if (i <= content.length) {
          setRenderedContent(content.substring(0, i))
          i += 15 // Tăng tốc độ hiển thị lên 3 lần (từ 5 lên 15)

          if (i > content.length) {
            clearInterval(interval)
            setIsComplete(true)
          }
        }
      }, 5) // Giảm thời gian giữa các lần cập nhật từ 10ms xuống 5ms

      return () => clearInterval(interval)
    } else {
      setRenderedContent(message.content)
      setIsComplete(true)
    }
  }, [message])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div className={`p-2 rounded-full flex-shrink-0 ${isUser ? "bg-forest-600" : "bg-forest-100"}`}>
        {isUser ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-forest-600" />}
      </div>
      <div
        className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
          isUser ? "bg-forest-600 text-white rounded-tr-none" : "bg-white rounded-tl-none"
        }`}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-forest-600 hover:text-forest-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                ul: ({ node, ...props }) => <ul {...props} className="list-disc pl-4 my-2" />,
                ol: ({ node, ...props }) => <ol {...props} className="list-decimal pl-4 my-2" />,
                li: ({ node, ...props }) => <li {...props} className="my-1" />,
                p: ({ node, ...props }) => <p {...props} className="my-2" />,
                strong: ({ node, ...props }) => <strong {...props} className="font-bold" />,
              }}
            >
              {renderedContent}
            </ReactMarkdown>
            {(!isComplete || isLoading) && (
              <span className="inline-block ml-1">
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
                <span className="typing-dot">.</span>
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
