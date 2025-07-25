"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Basics", href: "/basics" },
  { name: "Word List", href: "/word-list" },
  { name: "Quiz", href: "/quiz" },
  { name: "Flashcards", href: "/flashcards" },
  { name: "Dictionary", href: "/dictionary" },
  { name: "Books", href: "/books" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#121212]/80 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#00FFFF]">
          TOPIK<span className="text-[#1ABC9C]">BANGLA</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[#EAEAEA] hover:text-[#00FFFF] transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1E1E1E] text-[#EAEAEA] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1ABC9C]" />
          </div>
          <motion.a
            href="https://muhtasimmahim.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00FFFF] text-[#121212] px-6 py-2 rounded-full font-semibold hover:bg-[#1ABC9C] transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Developer
          </motion.a>
        </div>

        <button className="md:hidden text-[#EAEAEA]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-[#1E1E1E] py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-[#EAEAEA] hover:text-[#00FFFF] transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-[#121212] text-[#EAEAEA] px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
            />
          </div>
          <div className="px-4 py-2">
            <motion.a
              href="https://muhtasimmahim.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#00FFFF] text-[#121212] px-6 py-2 rounded-full font-semibold hover:bg-[#1ABC9C] transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Developer
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
