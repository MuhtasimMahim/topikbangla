"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import Select from "react-select"
import { koreanLessons } from "@/data/koreanWords"
import QuizQuestion from "@/components/QuizQuestion"
import QuizResults from "@/components/QuizResults"
import { AlertCircle, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

type Language = "ko" | "en" | "bn"

interface LanguageOption {
  value: Language
  label: string
}

const languageOptions: LanguageOption[] = [
  { value: "ko", label: "Korean" },
  { value: "en", label: "English" },
  { value: "bn", label: "Bengali" },
]

export default function QuizPage() {
  const [selectedLessons, setSelectedLessons] = useState<string[]>([])
  const [numQuestions, setNumQuestions] = useState(10)
  const [questionLanguage, setQuestionLanguage] = useState<Language>("ko")
  const [optionsLanguage, setOptionsLanguage] = useState<Language>("en")
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [quizFinished, setQuizFinished] = useState(false)
  const [streak, setStreak] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const lessonOptions = useMemo(() => koreanLessons.map((lesson) => ({ value: lesson.name, label: lesson.name })), [])

  const selectedWords = useMemo(() => {
    return koreanLessons.filter((lesson) => selectedLessons.includes(lesson.name)).flatMap((lesson) => lesson.words)
  }, [selectedLessons])

  const totalAvailableQuestions = selectedWords.length
  const percentageCovered = Math.min((numQuestions / totalAvailableQuestions) * 100, 100).toFixed(2)

  const isLanguageSelectionValid = questionLanguage === "ko" || optionsLanguage === "ko"
  const areBothLanguagesSame = questionLanguage === optionsLanguage

  const quizQuestions = useMemo(() => {
    if (selectedWords.length === 0 || !isLanguageSelectionValid || areBothLanguagesSame) return []

    const shuffled = [...selectedWords].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numQuestions).map((word) => {
      let question, options, correctAnswer

      switch (questionLanguage) {
        case "ko":
          question = word.korean
          break
        case "en":
          question = word.english
          break
        case "bn":
          question = word.bengali
          break
      }

      switch (optionsLanguage) {
        case "ko":
          options = [word.korean]
          correctAnswer = word.korean
          break
        case "en":
          options = [word.english]
          correctAnswer = word.english
          break
        case "bn":
          options = [word.bengali]
          correctAnswer = word.bengali
          break
      }

      while (options.length < 4) {
        const randomWord = selectedWords[Math.floor(Math.random() * selectedWords.length)]
        const randomOption =
          optionsLanguage === "ko"
            ? randomWord.korean
            : optionsLanguage === "en"
              ? randomWord.english
              : randomWord.bengali
        if (!options.includes(randomOption)) {
          options.push(randomOption)
        }
      }

      return {
        question,
        options: options.sort(() => 0.5 - Math.random()),
        correctAnswer,
      }
    })
  }, [selectedWords, numQuestions, questionLanguage, optionsLanguage, isLanguageSelectionValid, areBothLanguagesSame])

  const handleStartQuiz = () => {
    if (selectedLessons.length === 0 || numQuestions === 0) {
      alert("Please select at least one lesson and specify the number of questions.")
      return
    }
    if (!isLanguageSelectionValid) {
      alert("Korean must be in either question or options.")
      return
    }
    if (areBothLanguagesSame) {
      alert("Question and options languages cannot be the same.")
      return
    }
    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setQuizFinished(false)
    setStreak(0)
  }

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === quizQuestions[currentQuestionIndex].correctAnswer
    setUserAnswers((prev) => [...prev, answer])
    setStreak((prev) => (isCorrect ? prev + 1 : 0))
    playSound(isCorrect)

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const playSound = (isCorrect: boolean) => {
    if (!soundEnabled) return
    const audio = new Audio(isCorrect ? "/correct.mp3" : "/incorrect.mp3")
    audio.play().catch((error) => console.error("Error playing sound:", error))
  }

  useEffect(() => {
    const correctAudio = new Audio("/correct.mp3")
    const incorrectAudio = new Audio("/incorrect.mp3")

    // Preload audio files
    correctAudio.load()
    incorrectAudio.load()
  }, [])

  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#252525",
      borderColor: "#00FFFF",
      "&:hover": {
        borderColor: "#1ABC9C",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#252525",
    }),
    option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#1ABC9C" : "#252525",
      color: state.isFocused ? "#121212" : "#EAEAEA",
      "&:active": {
        backgroundColor: "#1ABC9C",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#EAEAEA",
    }),
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hangul Hustle: The Quiz Game
        </motion.h1>

        {!quizStarted && (
          <motion.div
            className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Lessons:</label>
              <Select
                isMulti
                options={lessonOptions}
                onChange={(selected) => setSelectedLessons(selected.map((option) => option.value))}
                className="react-select-container"
                classNamePrefix="react-select"
                styles={selectStyles}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Number of Questions:</label>
              <input
                type="number"
                min="1"
                max={totalAvailableQuestions}
                value={numQuestions}
                onChange={(e) =>
                  setNumQuestions(Math.min(Number.parseInt(e.target.value) || 0, totalAvailableQuestions))
                }
                className="w-full bg-[#252525] text-[#EAEAEA] px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00FFFF]"
              />
            </div>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Question Language:</label>
                  <Select
                    options={languageOptions}
                    value={languageOptions.find((option) => option.value === questionLanguage)}
                    onChange={(selected) => setQuestionLanguage(selected?.value as Language)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={selectStyles}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Options Language:</label>
                  <Select
                    options={languageOptions}
                    value={languageOptions.find((option) => option.value === optionsLanguage)}
                    onChange={(selected) => setOptionsLanguage(selected?.value as Language)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    styles={selectStyles}
                  />
                </div>
              </div>
              <p className="text-sm text-[#EAEAEA]/60 mt-2">Korean must be in either question or options.</p>
              {!isLanguageSelectionValid && (
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Korean must be selected for either questions or options.
                </p>
              )}
              {areBothLanguagesSame && (
                <p className="text-sm text-red-500 mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Question and options languages cannot be the same.
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="outline"
                  size="sm"
                  className="text-[#00FFFF] border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#121212]"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  {soundEnabled ? "Sound On" : "Sound Off"}
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <p>Total available questions: {totalAvailableQuestions}</p>
              <p>You are covering {percentageCovered}% of the available questions</p>
            </div>
            <button
              onClick={handleStartQuiz}
              className="w-full bg-[#00FFFF] text-[#121212] px-6 py-2 rounded-full font-semibold hover:bg-[#1ABC9C] transition-colors duration-300"
              disabled={!isLanguageSelectionValid || areBothLanguagesSame}
            >
              Start Quiz
            </button>
          </motion.div>
        )}

        {quizStarted && !quizFinished && (
          <>
            <div className="w-full bg-[#252525] h-1 mb-4">
              <div
                className="bg-[#00FFFF] h-1 transition-all duration-300 ease-in-out"
                style={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p>
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </p>
              <p>Streak: {streak}</p>
            </div>
            <QuizQuestion
              question={quizQuestions[currentQuestionIndex].question}
              options={quizQuestions[currentQuestionIndex].options}
              correctAnswer={quizQuestions[currentQuestionIndex].correctAnswer}
              onAnswer={handleAnswer}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              questionLanguage={questionLanguage}
            />
          </>
        )}

        {quizFinished && (
          <QuizResults
            userAnswers={userAnswers}
            questions={quizQuestions}
            onRetry={() => {
              setQuizStarted(false)
              setQuizFinished(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
