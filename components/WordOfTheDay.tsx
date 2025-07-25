"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { koreanWords } from "@/data/koreanWords"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

export default function WordOfTheDay() {
  const [wordOfTheDay, setWordOfTheDay] = useState<{
    korean: string
    english: string
    bengali: string
    pronunciation: string
  } | null>(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const savedWord = localStorage.getItem("wordOfTheDay")
    const savedDate = localStorage.getItem("wordOfTheDayDate")

    if (savedWord && savedDate === today) {
      setWordOfTheDay(JSON.parse(savedWord))
    } else {
      const allWords = Object.values(koreanWords).flat()
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]
      setWordOfTheDay(randomWord)
      localStorage.setItem("wordOfTheDay", JSON.stringify(randomWord))
      localStorage.setItem("wordOfTheDayDate", today)
    }
  }, [])

  const handleSpeak = () => {
    if (wordOfTheDay) {
      const utterance = new SpeechSynthesisUtterance(wordOfTheDay.korean)
      utterance.lang = "ko-KR"
      window.speechSynthesis.speak(utterance)
    }
  }

  if (!wordOfTheDay) return null

  return (
    <ClientMotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-[#1E1E1E] border-[#00FFFF] overflow-hidden">
        <CardHeader className="bg-[#00FFFF] text-[#121212]">
          <CardTitle>Word of the Day</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-2xl font-bold mb-2 text-[#00FFFF]">{wordOfTheDay.korean}</p>
          <p className="text-sm mb-1">English: {wordOfTheDay.english}</p>
          <p className="text-sm mb-1">Bengali: {wordOfTheDay.bengali}</p>
          <p className="text-sm mb-2">Pronunciation: {wordOfTheDay.pronunciation}</p>
          <Button
            onClick={handleSpeak}
            variant="outline"
            size="sm"
            className="mt-2 text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
          >
            <Volume2 className="w-4 h-4 mr-2" />
            Speak
          </Button>
        </CardContent>
      </Card>
    </ClientMotionDiv>
  )
}
