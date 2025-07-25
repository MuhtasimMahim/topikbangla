import { Card, CardContent } from "@/components/ui/card"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
}

export default function TestimonialCard({ name, role, content }: TestimonialCardProps) {
  return (
    <ClientMotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-[#1E1E1E] border-[#00FFFF]">
        <CardContent className="p-6">
          <p className="text-[#EAEAEA] mb-4">&ldquo;{content}&rdquo;</p>
          <div>
            <p className="font-semibold text-[#00FFFF]">{name}</p>
            <p className="text-sm text-[#EAEAEA]/60">{role}</p>
          </div>
        </CardContent>
      </Card>
    </ClientMotionDiv>
  )
}
