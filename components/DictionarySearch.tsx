"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DictionarySearchProps {
  onSearch: (searchTerm: string) => void
  isLoading: boolean
}

export default function DictionarySearch({ onSearch, isLoading }: DictionarySearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Enter a word in English, Korean or Bengali..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#252525] text-[#EAEAEA] pl-10 pr-20 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#1ABC9C]" />
        <Button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00FFFF] text-[#121212] px-4 py-1 rounded-full hover:bg-[#1ABC9C] transition-colors duration-300"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </motion.form>
  )
}
