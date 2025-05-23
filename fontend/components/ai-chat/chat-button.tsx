"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ChatPanel } from "@/components/ai-chat/chat-panel"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Simulate a welcome message after a delay
  useEffect(() => {
    if (isFirstLoad) {
      const timer = setTimeout(() => {
        setHasNewMessage(true)
      }, 5000)

      return () => {
        clearTimeout(timer)
        setIsFirstLoad(false)
      }
    }
  }, [isFirstLoad])

  // Reset new message indicator when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false)
    }
  }, [isOpen])

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {hasNewMessage && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-forest-700 border border-forest-100 whitespace-nowrap"
            >
              👋 Cần giúp đỡ với chuyến cắm trại?
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`rounded-full shadow-lg transition-all duration-300 ${
            isOpen ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-forest-600 text-white hover:bg-forest-700"
          } ${hasNewMessage ? "animate-pulse" : ""}`}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>Trợ lý AI</span>
            </div>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[450px] h-[600px] max-h-[calc(100vh-150px)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <ChatPanel onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
