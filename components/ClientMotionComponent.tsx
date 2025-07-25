"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ClientMotionComponentProps {
  children: React.ReactNode
  className?: string
  initial?: object
  animate?: object
  transition?: object
  [key: string]: any // This allows for any additional props
}

export function ClientMotionDiv({ children, ...props }: ClientMotionComponentProps) {
  return <motion.div {...props}>{children}</motion.div>
}

export function ClientMotionH2({ children, ...props }: ClientMotionComponentProps) {
  return <motion.h2 {...props}>{children}</motion.h2>
}

// Add more motion components as needed
