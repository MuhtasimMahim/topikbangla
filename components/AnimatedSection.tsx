"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  initial?: object
  animate?: object
  transition?: object
}

const AnimatedSection = ({ children, className, initial, animate, transition }: AnimatedSectionProps) => {
  return (
    <motion.div className={className} initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  )
}

export default AnimatedSection
