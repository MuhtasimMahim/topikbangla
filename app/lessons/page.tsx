"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { Search, ArrowUp } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), { ssr: false })

const lessons = [
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

function LessonsContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [filteredLessons, setFilteredLessons] = useState(lessons)

  useEffect(() => {
    setFilteredLessons(
      lessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.number.toString().includes(searchTerm),
      ),
    )
  }, [searchTerm])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setShowBackToTop(target.scrollTop > 300)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20 overflow-auto" onScroll={handleScroll}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Korean Lessons</h1>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full bg-[#1E1E1E] text-[#EAEAEA] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1ABC9C]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLessons.map((lesson) => (
            <Suspense
              key={lesson.number}
              fallback={
                <div className="bg-[#1E1E1E] p-6 rounded-lg animate-pulse">
                  <div className="h-16 bg-[#252525] rounded mb-4"></div>
                  <div className="h-6 bg-[#252525] rounded"></div>
                </div>
              }
            >
              <Link href={`/lesson/${lesson.number}`}>
                <AnimatedSection
                  className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg border border-[#00FFFF] hover:border-[#1ABC9C] transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-4xl font-bold mb-2 text-[#00FFFF]">{lesson.number}</h2>
                  <p className="text-lg">{lesson.title}</p>
                </AnimatedSection>
              </Link>
            </Suspense>
          ))}
        </div>

        {showBackToTop && (
          <Suspense fallback={null}>
            <AnimatedSection
              className="fixed bottom-8 right-8 bg-[#00FFFF] text-[#121212] p-3 rounded-full shadow-lg cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
            >
              <ArrowUp />
            </AnimatedSection>
          </Suspense>
        )}
      </div>
    </div>
  )
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-12 bg-[#1E1E1E] rounded mb-8 mx-auto max-w-md"></div>
              <div className="h-12 bg-[#1E1E1E] rounded mb-8"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="bg-[#1E1E1E] p-6 rounded-lg">
                    <div className="h-16 bg-[#252525] rounded mb-4"></div>
                    <div className="h-6 bg-[#252525] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LessonsContent />
    </Suspense>
  )
}
