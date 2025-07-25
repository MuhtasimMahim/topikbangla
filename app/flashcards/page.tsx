"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import FlashcardComponent from "@/components/FlashcardComponent"
import { koreanLessons } from "@/data/koreanWords"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function FlashcardsPage() {
  const [selectedLesson, setSelectedLesson] = useState(koreanLessons[0].name)
  const [displayMode, setDisplayMode] = useState<"korean-to-translation" | "translation-to-korean" | "korean-only">(
    "korean-to-translation",
  )
  const [shuffleWords, setShuffleWords] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)

  const handleLessonChange = (value: string) => {
    setSelectedLesson(value)
  }

  const handleDisplayModeChange = (value: string) => {
    setDisplayMode(value as "korean-to-translation" | "translation-to-korean" | "korean-only")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-[#00FFFF]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Flashcards
        </motion.h1>

        <Card className="bg-[#252525] border-[#00FFFF] mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="lesson-select" className="mb-2 block">
                  Select Lesson
                </Label>
                <Select onValueChange={handleLessonChange} defaultValue={selectedLesson}>
                  <SelectTrigger id="lesson-select" className="w-full">
                    <SelectValue placeholder="Select a lesson" />
                  </SelectTrigger>
                  <SelectContent>
                    {koreanLessons.map((lesson) => (
                      <SelectItem key={lesson.name} value={lesson.name}>
                        {lesson.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="display-mode" className="mb-2 block">
                  Display Mode
                </Label>
                <Select onValueChange={handleDisplayModeChange} defaultValue={displayMode}>
                  <SelectTrigger id="display-mode" className="w-full">
                    <SelectValue placeholder="Select display mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="korean-to-translation">Korean → English/Bengali</SelectItem>
                    <SelectItem value="translation-to-korean">English/Bengali → Korean</SelectItem>
                    <SelectItem value="korean-only">Korean Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="shuffle" checked={shuffleWords} onCheckedChange={setShuffleWords} />
                <Label htmlFor="shuffle">Shuffle Words</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="audio" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
                <Label htmlFor="audio">Audio Pronunciation</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <FlashcardComponent
          lesson={selectedLesson}
          displayMode={displayMode}
          shuffleWords={shuffleWords}
          audioEnabled={audioEnabled}
        />
      </div>
    </div>
  )
}
