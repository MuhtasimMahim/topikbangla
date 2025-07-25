import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { TranslationResult } from "@/types/dictionary"
import { ClientMotionDiv } from "@/components/ClientMotionComponent"

interface RecentSearchesProps {
  searches: TranslationResult[]
  onSearch: (term: string) => void
}

export default function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  return (
    <ClientMotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-[#1E1E1E] border-[#00FFFF] overflow-hidden">
        <CardHeader className="bg-[#00FFFF] text-[#121212]">
          <CardTitle>Recent Searches</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {searches.length > 0 ? (
            <ul className="space-y-2">
              {searches.map((search, index) => (
                <ClientMotionDiv
                  key={index}
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-[#00FFFF]">{search.korean}</span>
                  <Button
                    onClick={() => onSearch(search.korean)}
                    variant="ghost"
                    size="sm"
                    className="text-[#00FFFF] hover:text-[#1ABC9C]"
                  >
                    Search Again
                  </Button>
                </ClientMotionDiv>
              ))}
            </ul>
          ) : (
            <p className="text-[#EAEAEA]/60">No recent searches</p>
          )}
        </CardContent>
      </Card>
    </ClientMotionDiv>
  )
}
