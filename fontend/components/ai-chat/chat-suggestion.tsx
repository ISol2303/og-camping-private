"use client"

import { motion } from "framer-motion"

interface ChatSuggestionProps {
  suggestion: string
  onClick: (suggestion: string) => void
}

export function ChatSuggestion({ suggestion, onClick }: ChatSuggestionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm hover:bg-forest-50 hover:border-forest-200 transition-colors"
      onClick={() => onClick(suggestion)}
    >
      {suggestion}
    </motion.button>
  )
}
