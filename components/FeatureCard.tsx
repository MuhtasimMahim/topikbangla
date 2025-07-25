import type { LucideIcon } from "lucide-react"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <ClientMotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#121212] p-6 rounded-lg shadow-lg"
    >
      <Icon className="w-12 h-12 text-[#00FFFF] mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#EAEAEA]/80">{description}</p>
    </ClientMotionDiv>
  )
}
