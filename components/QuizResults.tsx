import { Button } from "@/components/ui/button"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface QuizResultsProps {
  userAnswers: string[]
  questions: {
    question: string
    options: string[]
    correctAnswer: string
  }[]
  onRetry: () => void
}

export default function QuizResults({ userAnswers, questions, onRetry }: QuizResultsProps) {
  const score = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length

  return (
    <ClientMotionDiv
      className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#00FFFF]">Quiz Results</h2>
      <p className="text-xl mb-6">
        You scored {score} out of {questions.length}
      </p>
      <div className="space-y-4 mb-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-[#252525] p-4 rounded-md">
            <p className="font-bold mb-2">{question.question}</p>
            <p className="mb-1">
              Your answer:{" "}
              <span className={userAnswers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"}>
                {userAnswers[index] || "No answer"}
              </span>
            </p>
            {userAnswers[index] !== question.correctAnswer && (
              <p className="text-green-500">Correct answer: {question.correctAnswer}</p>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={onRetry}
        className="w-full bg-[#00FFFF] text-[#121212] px-6 py-2 rounded-full font-semibold hover:bg-[#1ABC9C] transition-colors duration-300"
      >
        Try Again
      </Button>
    </ClientMotionDiv>
  )
}
