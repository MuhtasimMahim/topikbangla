"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Minimize2, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, []) //Corrected dependency

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `You are a helpful AI assistant for TOPIKBangla, a platform for learning Korean language tailored for Bengali speakers. The user asks: ${input}`,
        system:
          "You are a knowledgeable and friendly AI assistant for TOPIKBangla, a platform dedicated to helping Bengali speakers learn Korean. Provide concise, helpful responses related to Korean language learning, TOPIK exam preparation, and the features of the TOPIKBangla platform. Keep your answers brief and engaging.",
      })

      const assistantMessage: Message = { role: "assistant", content: text }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    }

    setIsLoading(false)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-24 right-4 z-50 bg-[#00FFFF] text-[#121212] hover:bg-[#1ABC9C]"
        size="icon"
      >
        {isOpen ? <X /> : "AI"}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-40 right-4 z-50 w-80 sm:w-96 bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden ${
              isMinimized ? "h-14" : "h-[500px]"
            }`}
          >
            <div className="bg-[#00FFFF] text-[#121212] p-3 flex justify-between items-center">
              <h3 className="font-bold">TOPIKBangla AI Assistant</h3>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" onClick={toggleMinimize}>
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </Button>
                <Button size="icon" variant="ghost" onClick={toggleChatbot}>
                  <X size={18} />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.role === "user" ? "bg-[#00FFFF] text-[#121212]" : "bg-[#252525] text-[#EAEAEA]"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && <div className="text-center text-[#EAEAEA]/60">AI is thinking...</div>}
                </ScrollArea>

                <div className="p-4 bg-[#252525]">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="flex space-x-2"
                  >
                    <Input
                      type="text"
                      placeholder="Ask about Korean learning..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow bg-[#1E1E1E] text-[#EAEAEA] border-[#00FFFF] focus:ring-[#00FFFF]"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-[#00FFFF] text-[#121212] hover:bg-[#1ABC9C]"
                    >
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
