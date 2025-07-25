"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Volume2, Play, Pause, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { koreanWords } from "@/data/koreanWords"
import { useSwipeable } from "react-swipeable"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FlashcardComponentProps {
  lesson: string
  displayMode: "korean-to-translation" | "translation-to-korean" | "korean-only"
  shuffleWords: boolean
  audioEnabled: boolean
}

export default function FlashcardComponent({
  lesson,
  displayMode,
  shuffleWords,
  audioEnabled,
}: FlashcardComponentProps) {
  const [words, setWords] = useState(koreanWords[lesson as keyof typeof koreanWords] || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  useEffect(() => {
    setWords(koreanWords[lesson as keyof typeof koreanWords] || [])
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [lesson])

  useEffect(() => {
    if (shuffleWords) {
      setWords((prevWords) => [...prevWords].sort(() => Math.random() - 0.5))
      setCurrentIndex(0)
      setIsFlipped(false)
    }
  }, [shuffleWords])

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    setIsFlipped(false)
  }, [words.length])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        handleNext()
      }, 3000)
    }
    return () => clearTimeout(timer)
  }, [isAutoPlaying, handleNext])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length)
    setIsFlipped(false)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleSpeak = () => {
    if (audioEnabled) {
      const utterance = new SpeechSynthesisUtterance(words[currentIndex].korean)
      utterance.lang = "ko-KR"
      window.speechSynthesis.speak(utterance)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  const renderCardContent = () => {
    const word = words[currentIndex]
    if (displayMode === "korean-to-translation") {
      return isFlipped ? (
        <div>
          <p className="text-xl mb-2">English: {word.english}</p>
          <p className="text-xl">Bengali: {word.bengali}</p>
        </div>
      ) : (
        <p className="text-4xl font-bold">{word.korean}</p>
      )
    } else if (displayMode === "translation-to-korean") {
      return isFlipped ? (
        <p className="text-4xl font-bold">{word.korean}</p>
      ) : (
        <div>
          <p className="text-xl mb-2">English: {word.english}</p>
          <p className="text-xl">Bengali: {word.bengali}</p>
        </div>
      )
    } else {
      return <p className="text-4xl font-bold">{word.korean}</p>
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Card
        {...handlers}
        className="w-full max-w-2xl aspect-video bg-gradient-to-br from-[#1E1E1E] to-[#252525] rounded-lg shadow-lg overflow-hidden cursor-pointer mb-8"
        onClick={handleFlip}
      >
        <CardContent className="h-full flex items-center justify-center p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex + (isFlipped ? "-flipped" : "")}
              initial={{ opacity: 0, rotateY: 0 }}
              animate={{ opacity: 1, rotateY: isFlipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center text-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              {renderCardContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      <div className="w-full max-w-2xl mb-4">
        <Progress value={((currentIndex + 1) / words.length) * 100} className="w-full" />
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Button onClick={handlePrevious} variant="outline" size="icon" className="rounded-full">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button onClick={handleSpeak} variant="outline" size="icon" disabled={!audioEnabled} className="rounded-full">
          <Volume2 className="h-4 w-4" />
        </Button>
        <Button onClick={() => setIsAutoPlaying(!isAutoPlaying)} variant="outline" size="icon" className="rounded-full">
          {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button onClick={handleFlip} variant="outline" size="icon" className="rounded-full">
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button onClick={handleNext} variant="outline" size="icon" className="rounded-full">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-[#EAEAEA]/60">
        Card {currentIndex + 1} of {words.length}
      </p>
    </div>
  )
}
