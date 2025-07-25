"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface QuizQuestionProps {
  question: string
  options: string[]
  correctAnswer: string
  onAnswer: (answer: string) => void
  questionNumber: number
  totalQuestions: number
  questionLanguage: string
}

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
  onAnswer,
  questionNumber,
  totalQuestions,
  questionLanguage,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option)
    setShowFeedback(true)
    setTimeout(() => {
      onAnswer(option)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }, 1000) // Show feedback for 1 second before moving to the next question
  }

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = questionLanguage === "ko" ? "ko-KR" : "en-US"
    window.speechSynthesis.speak(utterance)
  }

  return (
    <ClientMotionDiv
      className="bg-[#1E1E1E] p-4 sm:p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#00FFFF]">
        Question {questionNumber} of {totalQuestions}
      </h2>
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg sm:text-xl">{question}</p>
        <Button
          onClick={() => playAudio(question)}
          variant="outline"
          size="sm"
          className="ml-4 text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
        >
          <Volume2 className="w-4 h-4 mr-2" />
          Play
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => !showFeedback && handleAnswer(option)}
            className={`relative bg-[#252525] text-[#EAEAEA] px-4 sm:px-6 py-3 rounded-md transition-all duration-300 border-2 border-transparent ${
              showFeedback
                ? option === correctAnswer
                  ? "bg-green-500 text-[#121212] border-green-300"
                  : option === selectedAnswer
                    ? "bg-red-500 text-[#121212] border-red-300"
                    : ""
                : "hover:border-[#00FFFF]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={showFeedback}
          >
            {option}
            {showFeedback && option === correctAnswer && (
              <motion.div
                className="absolute top-1 right-1 w-5 h-5 bg-green-300 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                ✓
              </motion.div>
            )}
            {showFeedback && option === selectedAnswer && option !== correctAnswer && (
              <motion.div
                className="absolute top-1 right-1 w-5 h-5 bg-red-300 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                ✗
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </ClientMotionDiv>
  )
}
