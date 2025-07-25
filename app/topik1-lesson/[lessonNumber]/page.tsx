"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Volume2 } from "lucide-react"
import Link from "next/link"
import { koreanWords } from "@/data/koreanWords"

interface Word {
  korean: string
  bengali: string
  english: string
  pronunciation: string
}

export default function TOPIK1LessonWordsPage({ params }: { params: { lessonNumber: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [words, setWords] = useState<Word[]>([])

  useEffect(() => {
    setWords(koreanWords["TOPIK1_Basic100"] || [])
  }, [])

  const filteredWords = useMemo(
    () =>
      words.filter(
        (word) =>
          word.korean.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.bengali.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
          word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [words, searchTerm],
  )

  const handleSpeak = (word: Word) => {
    const utterance = new SpeechSynthesisUtterance(word.korean)
    utterance.lang = "ko-KR"
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <Link href="/word-list" className="text-[#00FFFF] hover:underline mb-4 inline-block">
          &larr; Back to Word List
        </Link>
        <h1 className="text-4xl font-bold mb-8">TOPIK 1 - Basic 100 Words</h1>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search words..."
            className="w-full bg-[#1E1E1E] text-[#EAEAEA] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1ABC9C]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#252525]">
                <th className="px-4 py-2 text-left">No.</th>
                <th className="px-4 py-2 text-left">Korean</th>
                <th className="px-4 py-2 text-center">Bengali</th>
                <th className="px-4 py-2 text-center">English</th>
                <th className="px-4 py-2 text-center">Pronunciation</th>
                <th className="px-4 py-2 text-right">Play</th>
              </tr>
            </thead>
            <tbody>
              {filteredWords.map((word, index) => (
                <motion.tr
                  key={word.korean}
                  className={`${index % 2 === 0 ? "bg-[#1E1E1E]" : "bg-[#252525]"} transition-colors duration-300`}
                  whileHover={{ backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                >
                  <td className="px-4 py-2 text-left">{index + 1}</td>
                  <td className="px-4 py-2 text-left">{word.korean}</td>
                  <td className="px-4 py-2 text-center">{word.bengali}</td>
                  <td className="px-4 py-2 text-center">{word.english}</td>
                  <td className="px-4 py-2 text-center">{word.pronunciation}</td>
                  <td className="px-4 py-2 text-right">
                    <motion.button
                      onClick={() => handleSpeak(word)}
                      aria-label={`Play pronunciation for ${word.korean}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Volume2 className="text-[#00FFFF]" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
