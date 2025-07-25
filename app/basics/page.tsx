"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { koreanAlphabet, basicSyllableChart, complexSyllableChart } from "@/data/koreanBasics"

export default function BasicsPage() {
  const [activeTab, setActiveTab] = useState("Basic Vowels")

  const playAudio = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "ko-KR"
    window.speechSynthesis.speak(utterance)
  }

  const generateSyllable = (consonant: string, vowel: string) => {
    return consonant + vowel
  }

  const SyllableTable = ({
    chart,
    title,
  }: { chart: typeof basicSyllableChart | typeof complexSyllableChart; title: string }) => (
    <Card className="bg-[#1E1E1E] border-[#00FFFF] p-2 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#00FFFF]">{title}</h2>
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 bg-[#252525] border border-[#00FFFF]/20">모음/자음</th>
                {chart.vowels.map((vowel, index) => (
                  <th key={vowel} className="p-3 bg-[#252525] border border-[#00FFFF]/20">
                    <div className="text-lg font-bold mb-1">{vowel}</div>
                    <div className="text-sm text-[#EAEAEA]/60">{chart.bengaliVowels[index]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.consonants.map((consonant, i) => (
                <tr key={consonant}>
                  <td className="p-3 bg-[#252525] border border-[#00FFFF]/20">
                    <div className="text-lg font-bold mb-1">{consonant}</div>
                    <div className="text-sm text-[#EAEAEA]/60">{chart.bengaliConsonants[i]}</div>
                  </td>
                  {chart.vowels.map((vowel) => {
                    const syllable = generateSyllable(consonant, vowel)
                    return (
                      <td key={`${consonant}${vowel}`} className="p-3 border border-[#00FFFF]/20">
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="text-lg font-bold mb-1">{syllable}</div>
                          <div className="text-sm text-[#EAEAEA]/60 mb-2">
                            {`${chart.bengaliConsonants[i].split("/")[0]}${
                              chart.bengaliVowels[chart.vowels.indexOf(vowel)]
                            }`}
                          </div>
                          <Button
                            onClick={() => playAudio(syllable)}
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-center"
        >
          Hangul Hub: Learn Korean Letters in Bengali
        </motion.h1>

        <Tabs defaultValue="Basic Vowels" className="w-full">
          <ScrollArea className="w-full mb-4">
            <TabsList className="inline-flex space-x-2 p-1 bg-[#252525] rounded-lg">
              {koreanAlphabet.map((section) => (
                <TabsTrigger
                  key={section.type}
                  value={section.type}
                  onClick={() => setActiveTab(section.type)}
                  className="px-3 py-2 text-sm rounded-md whitespace-nowrap data-[state=active]:bg-[#00FFFF] data-[state=active]:text-[#121212] transition-all duration-200 ease-in-out"
                >
                  {section.type}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="Basic Syllables"
                onClick={() => setActiveTab("Basic Syllables")}
                className="px-3 py-2 text-sm rounded-md whitespace-nowrap data-[state=active]:bg-[#00FFFF] data-[state=active]:text-[#121212] transition-all duration-200 ease-in-out"
              >
                Basic Syllables
              </TabsTrigger>
              <TabsTrigger
                value="Complex Syllables"
                onClick={() => setActiveTab("Complex Syllables")}
                className="px-3 py-2 text-sm rounded-md whitespace-nowrap data-[state=active]:bg-[#00FFFF] data-[state=active]:text-[#121212] transition-all duration-200 ease-in-out"
              >
                Complex Syllables
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          {koreanAlphabet.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TabsContent key={section.type} value={section.type}>
                <Card className="bg-[#1E1E1E] border-[#00FFFF] p-6">
                  <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">{section.type}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {section.letters.map((letter) => (
                      <motion.div
                        key={letter.hangul}
                        className="bg-[#252525] p-4 rounded-lg text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <p className="text-4xl font-bold mb-2">{letter.hangul}</p>
                        <p className="text-sm mb-1">Bengali: {letter.bengali}</p>
                        <p className="text-sm mb-2">IPA: [{letter.ipa}]</p>
                        <Button
                          onClick={() => playAudio(letter.hangul)}
                          variant="outline"
                          size="sm"
                          className="w-full text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TabsContent value="Basic Syllables">
              <SyllableTable chart={basicSyllableChart} title="Basic Korean Syllables" />
            </TabsContent>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TabsContent value="Complex Syllables">
              <SyllableTable chart={complexSyllableChart} title="Complex Korean Syllables" />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  )
}
