"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Book } from "lucide-react"

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
})

const books = [
  {
    id: 1,
    title: "Korean-Bangla Pronunciation Chart",
    url: "https://www.topikguide.com/wp-content/uploads/2021/01/TOPIK-Vocabulary-List-Beginner-Level.pdf",
  },
  {
    id: 2,
    title: "Basic Korean Vocabulary",
    url: "https://www.topikguide.com/wp-content/uploads/2021/01/TOPIK-Vocabulary-List-Intermediate-Level.pdf",
  },
  {
    id: 3,
    title: "Korean Grammar Guide",
    url: "https://www.topikguide.com/wp-content/uploads/2021/01/TOPIK-Vocabulary-List-Advanced-Level.pdf",
  },
]

export default function BooksPage() {
  const [selectedBook, setSelectedBook] = useState(books[0])

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#00FFFF]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Korean Learning Resources
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Available Books</h2>
            <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex-shrink-0 w-64 lg:w-auto ${
                    selectedBook.id === book.id ? "bg-[#00FFFF] text-[#121212]" : "bg-[#1E1E1E] hover:bg-[#252525]"
                  }`}
                  onClick={() => setSelectedBook(book)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-3">
                    <Book className="w-6 h-6" />
                    <span className="font-medium">{book.title}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PDFViewer url={selectedBook.url} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
