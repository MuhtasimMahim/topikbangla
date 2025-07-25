import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import type { TranslationResult } from "@/types/dictionary"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface DictionaryResultProps {
  result: TranslationResult
}

export default function DictionaryResult({ result }: DictionaryResultProps) {
  const { toast } = useToast()

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "ko-KR"
    window.speechSynthesis.speak(utterance)

    toast({
      title: "Playing pronunciation",
      description: `Playing: ${text}`,
      duration: 2000,
    })
  }

  return (
    <Card className="bg-[#1E1E1E] border-[#00FFFF] overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <ClientMotionDiv
          className="flex items-start justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-[#00FFFF] korean-text mb-2">{result.korean}</h2>
            <p className="text-[#EAEAEA]/80">{result.pronunciation}</p>
          </div>
          <Button
            onClick={() => handleSpeak(result.korean)}
            variant="outline"
            className="text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        </ClientMotionDiv>

        <ClientMotionDiv
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <h3 className="text-[#EAEAEA] font-semibold mb-2">English</h3>
            <p className="text-[#EAEAEA]/80">{result.english}</p>
          </div>
          <div>
            <h3 className="text-[#EAEAEA] font-semibold mb-2">Bengali</h3>
            <p className="text-[#EAEAEA]/80">{result.bengali}</p>
          </div>
        </ClientMotionDiv>

        {result.synonyms.length > 0 && (
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-[#EAEAEA] font-semibold mb-2">Synonyms</h3>
            <div className="flex flex-wrap gap-2">
              {result.synonyms.map((synonym, index) => (
                <span key={index} className="bg-[#252525] text-[#EAEAEA]/80 px-3 py-1 rounded-full text-sm">
                  {synonym}
                </span>
              ))}
            </div>
          </ClientMotionDiv>
        )}

        {result.examples.length > 0 && (
          <ClientMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-[#EAEAEA] font-semibold mb-2">Example Sentences</h3>
            <ul className="space-y-2">
              {result.examples.map((example, index) => (
                <li key={index} className="text-[#EAEAEA]/80 korean-text">
                  <p>{example.korean}</p>
                  <p className="text-sm text-[#EAEAEA]/60">{example.english}</p>
                  <Button
                    onClick={() => handleSpeak(example.korean)}
                    variant="ghost"
                    size="sm"
                    className="mt-1 text-[#00FFFF] hover:text-[#1ABC9C]"
                  >
                    <Volume2 className="w-4 h-4 mr-1" />
                    Speak
                  </Button>
                </li>
              ))}
            </ul>
          </ClientMotionDiv>
        )}
      </CardContent>
    </Card>
  )
}
