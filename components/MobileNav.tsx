"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, List, Brain, Book, Library, Menu, X, CreditCard } from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Basics", href: "/basics", icon: BookOpen },
  { name: "Word List", href: "/word-list", icon: List },
  { name: "Quiz", href: "/quiz", icon: Brain },
  { name: "Flashcards", href: "/flashcards", icon: CreditCard },
  { name: "Dictionary", href: "/dictionary", icon: Book },
  { name: "Books", href: "/books", icon: Library },
]

export default function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121212] border-t border-[#1E1E1E]">
        <div className="flex justify-around items-center h-20 px-2 pb-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  className={`flex flex-col items-center justify-center ${
                    isActive ? "text-[#00FFFF]" : "text-[#EAEAEA]/60"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.name}</span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>

      <motion.button
        className="md:hidden fixed top-4 right-4 z-50 bg-[#1E1E1E] p-2 rounded-full shadow-lg"
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-6 h-6 text-[#00FFFF]" /> : <Menu className="w-6 h-6 text-[#00FFFF]" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-[#121212] z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  className="flex items-center space-x-4 py-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon className="w-6 h-6 text-[#00FFFF]" />
                  <span className="text-xl font-semibold text-[#EAEAEA]">{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
