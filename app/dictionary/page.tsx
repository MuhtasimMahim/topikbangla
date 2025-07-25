"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import DictionarySearch from "@/components/DictionarySearch"
import DictionaryResult from "@/components/DictionaryResult"
import WordOfTheDay from "@/components/WordOfTheDay"
import RecentSearches from "@/components/RecentSearches"
import { useToast } from "@/components/ui/use-toast"
import { translateWord } from "@/lib/translation"
import type { TranslationResult } from "@/types/dictionary"

export default function Dictionary() {
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<TranslationResult[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches")
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches))
    }
  }, [])

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a word to translate",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const translationResult = await translateWord(searchTerm)
      setResult(translationResult)
      updateRecentSearches(translationResult)
      toast({
        title: "Translation successful",
        description: "Word has been translated successfully.",
      })
    } catch (error) {
      console.error("Translation error:", error)
      toast({
        title: "Translation failed",
        description: "We couldn't translate that word. Please try again.",
        variant: "destructive",
      })
      setResult(null)
    }
    setIsLoading(false)
  }

  const updateRecentSearches = (newSearch: TranslationResult) => {
    const updatedSearches = [newSearch, ...recentSearches.filter((search) => search.korean !== newSearch.korean)].slice(
      0,
      5,
    )
    setRecentSearches(updatedSearches)
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1E1E1E] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center text-[#00FFFF]">Korean Dictionary</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <DictionarySearch onSearch={handleSearch} isLoading={isLoading} />

              {isLoading && (
                <motion.div
                  className="text-center text-[#EAEAEA]/80 mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Searching...
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DictionaryResult result={result} />
                </motion.div>
              )}
            </div>

            <div className="space-y-8">
              <WordOfTheDay />
              <RecentSearches searches={recentSearches} onSearch={handleSearch} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
