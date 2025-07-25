"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Brain, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Self-Learning Korean Experience for <span className="text-[#00FFFF]">Bengali</span> Speakers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Experience a revolutionary way to learn Korean. Whether you're studying for the TOPIK exam or simply want
              to learn Korean, we've got you covered
            </p>
            <motion.button
              className="bg-[#00FFFF] text-[#121212] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#1ABC9C] transition-colors duration-300 flex items-center mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning Now
              <ArrowRight className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"></div>
      </section>

      <section className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose KoreanAI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Lessons covered from EPS TOPIK Self Learning Book",
                description: "Words with meaning from the EPS TOPIK Self Learning Book.",
              },
              {
                icon: Brain,
                title: "Advanced AI Technology",
                description: "Create your own learning path with our inbuilt AI",
              },
              {
                icon: Zap,
                title: "Rapid Progress",
                description: "See results faster with our optimized learning algorithms.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#121212] p-6 rounded-lg shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-[#00FFFF] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#EAEAEA]/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
