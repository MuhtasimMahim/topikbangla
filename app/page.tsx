import { BookOpen, Brain, Zap, Globe, Award, Users } from "lucide-react"
import PWAInstallPrompt from "@/components/PWAInstallPrompt"
import FeatureCard from "@/components/FeatureCard"
import AnimatedHeroSection from "@/components/AnimatedHeroSection"
import { ClientMotionH2 } from "@/components/ClientMotionComponent"

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnimatedHeroSection />

      <section className="py-20 bg-[#1E1E1E]">
        <div className="container mx-auto px-4">
          <ClientMotionH2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Why Choose KoreanAI?
          </ClientMotionH2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={BookOpen}
              title="Comprehensive Curriculum"
              description="Lessons covering EPS TOPIK Self Learning Book content, ensuring a thorough learning experience."
            />
            <FeatureCard
              icon={Brain}
              title="AI-Powered Personalization"
              description="Our AI adapts to your learning style, creating a customized path for efficient progress."
            />
            <FeatureCard
              icon={Zap}
              title="Rapid Progress"
              description="Optimized learning algorithms help you see results faster and retain information better."
            />
            <FeatureCard
              icon={Globe}
              title="Bengali-Focused Approach"
              description="Tailored explanations and translations specifically for Bengali speakers."
            />
            <FeatureCard
              icon={Award}
              title="TOPIK Exam Preparation"
              description="Specialized content and practice tests to help you ace the TOPIK exam."
            />
            <FeatureCard
              icon={Users}
              title="Interactive Community"
              description="Connect with fellow learners, share experiences, and practice together."
            />
          </div>
        </div>
      </section>

      <PWAInstallPrompt />
    </div>
  )
}
