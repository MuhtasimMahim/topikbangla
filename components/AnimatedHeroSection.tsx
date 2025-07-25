"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

const AnimatedSection = dynamic(() => import("@/components/AnimatedSection"), { ssr: false })

export default function AnimatedHeroSection() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatedSection className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <ClientMotionDiv
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
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/lessons">
                <Button className="bg-[#00FFFF] text-[#121212] px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#1ABC9C] transition-colors duration-300">
                  Start Learning Now
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full font-semibold text-lg border-[#00FFFF] text-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212] transition-colors duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </ClientMotionDiv>
        </div>
        <div className="absolute inset-0 bg-[url('/circuit-board.svg')] opacity-10"></div>
      </AnimatedSection>
    </Suspense>
  )
}
