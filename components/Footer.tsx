"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const socialIcons = [
  { Icon: Facebook, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Linkedin, href: "#" },
]

export default function Footer() {
  return (
    <footer className="hidden md:block bg-[#1E1E1E] text-[#EAEAEA] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              KoreanAI is an innovative language learning platform powered by artificial intelligence. Our AI-driven
              approach personalizes your learning experience, making Korean language acquisition faster and more
              efficient than ever before.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Lessons", "Quiz", "Profile", "Contact Us", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm hover:text-[#00FFFF] transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6 text-[#1ABC9C] hover:text-[#00FFFF] transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#00FFFF]/20">
          <p className="text-center text-sm">© 2024 KoreanAI Platform. All Rights Reserved.</p>
          <p className="text-center text-sm mt-2 text-[#00FFFF]">Developed by Muhtasim Mahim</p>
        </div>
      </div>
    </footer>
  )
}
