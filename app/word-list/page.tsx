"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUp } from "lucide-react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), { ssr: false })

const epsTopikLessons = [
  { number: 1, title: "হানগুল শিখি ১" },
  { number: 2, title: "হানগুল শিখি ২" },
  { number: 3, title: "শ্রেণি কক্ষের ভাষার কোরিয়ান" },
  { number: 4, title: "কেমন আছেন" },
  { number: 5, title: "সপ্তাহান্তে ভালো কাটান" },
  { number: 6, title: "আমার নাম তুয়ান" },
  { number: 7, title: "এটি অফিস" },
  { number: 8, title: "১২টা ৩০ মিনিটে মধ্যভোজ করি" },
  { number: 9, title: "পরিবারের সদস্য কতজন?" },
  { number: 10, title: "গতকাল লাইব্রেরিতে পড়েছি" },
  { number: 11, title: "আপেল পাঁচটা দিন" },
  { number: 12, title: "হাসপাতালের পাশে ফার্মেসি আছে" },
  { number: 13, title: "সিটি হলে সাতটায় দেখা করুন" },
  { number: 14, title: "আমি বিবিমবাপ খেতে চাই" },
  { number: 15, title: "আবহাওয়া পরিষ্কার, মন ভালো" },
  { number: 16, title: "সময় পেলে টেনিস খেলতে যাই" },
  { number: 17, title: "ছুটিতে জেজু দ্বীপে যাব" },
  { number: 18, title: "বাস বা সাবওয়ে ধরে যাই" },
  { number: 19, title: "এটা কি কোরিয়ান আসবাব?" },
  { number: 20, title: "আমি বাসন ধুতে চাই" },
  { number: 21, title: "(টেবিল) সাজাতে সাহায্য করব?" },
  { number: 22, title: "রাস্তা পার হতে দেখে পার হন না" },
  { number: 23, title: "বড়দের দুই হাতে জিনিস দিতে হবে" },
  { number: 24, title: "কোরিয়ান মুভি দেখে ভাষা শিখি" },
  { number: 25, title: "প্রতি রবিবার গির্জায় যাই" },
  { number: 26, title: "খাবার খাওয়ার পর এই ওষুধ খান" },
  { number: 27, title: "কোথায় ব্যথা?" },
  { number: 28, title: "অ্যাকাউন্ট খোলার জন্য এসেছি" },
  { number: 29, title: "ফিলিপাইনে পোস্টকার্ড" },
  { number: 30, title: "সেখানে তায়কওন্ডো শিখতে পারি?" },
]

const hiKoreanLessons = [
  { number: 2, title: "Introduction" },
  { number: 3, title: "Places" },
  { number: 4, title: "Dates" },
  { number: 5, title: "Daily Life" },
]

export default function WordListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredEpsTopikLessons = epsTopikLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.number.toString().includes(searchTerm),
  )

  const filteredHiKoreanLessons = hiKoreanLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.number.toString().includes(searchTerm),
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLessonClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        >
          Hangul Hangout: Word List
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <input
            type="text"
            placeholder="Search word lists..."
            className="w-full bg-[#1E1E1E] text-[#EAEAEA] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1ABC9C]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">EPS TOPIK Lessons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredEpsTopikLessons.map((lesson, index) => (
              <motion.div
                key={lesson.number}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleLessonClick(`/lesson/${lesson.number}`)}
              >
                <AnimatedSection className="bg-[#1E1E1E] p-4 sm:p-6 rounded-lg shadow-lg border border-[#00FFFF] hover:border-[#1ABC9C] transition-all duration-300 cursor-pointer">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#00FFFF]">{lesson.number}</h2>
                  <p className="text-base sm:text-lg">{lesson.title}</p>
                </AnimatedSection>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">HI Korean 1A Word List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {hiKoreanLessons.map((lesson, index) => (
              <motion.div
                key={lesson.number}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleLessonClick(`/hi-korean-lesson/${lesson.number}`)}
              >
                <AnimatedSection className="bg-[#1E1E1E] p-4 sm:p-6 rounded-lg shadow-lg border border-[#00FFFF] hover:border-[#1ABC9C] transition-all duration-300 cursor-pointer">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#00FFFF]">Unit {lesson.number}</h2>
                  <p className="text-base sm:text-lg">{lesson.title}</p>
                </AnimatedSection>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {showBackToTop && (
          <Button
            className="fixed bottom-24 right-8 bg-[#00FFFF] text-[#121212] p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
