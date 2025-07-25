import type { TranslationResult } from "@/types/dictionary"

const detectLanguage = (text: string): "ko" | "en" | "bn" => {
  const koreanRange = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/
  const bengaliRange = /[\u0980-\u09FF]/

  if (koreanRange.test(text)) return "ko"
  if (bengaliRange.test(text)) return "bn"
  return "en"
}

export const translateWord = async (word: string): Promise<TranslationResult> => {
  const sourceLanguage = detectLanguage(word)
  let englishText = word
  let koreanText = word
  let bengaliText = word

  if (sourceLanguage !== "en") {
    const toEnglishResponse = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLanguage}|en`,
    )
    if (!toEnglishResponse.ok) throw new Error("English translation failed")
    const englishData = await toEnglishResponse.json()
    if (englishData.responseStatus === 200) {
      englishText = englishData.responseData.translatedText
    }
  }

  if (sourceLanguage !== "ko") {
    const toKoreanResponse = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceLanguage === "en" ? word : englishText)}&langpair=en|ko`,
    )
    if (!toKoreanResponse.ok) throw new Error("Korean translation failed")
    const koreanData = await toKoreanResponse.json()
    if (koreanData.responseStatus === 200) {
      koreanText = koreanData.responseData.translatedText
    }
  }

  if (sourceLanguage !== "bn") {
    const toBengaliResponse = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(sourceLanguage === "en" ? word : englishText)}&langpair=en|bn`,
    )
    if (!toBengaliResponse.ok) throw new Error("Bengali translation failed")
    const bengaliData = await toBengaliResponse.json()
    if (bengaliData.responseStatus === 200) {
      bengaliText = bengaliData.responseData.translatedText
    }
  }

  // Generate example sentences (this is a mock implementation)
  const examples = [
    {
      korean: `${koreanText}를 사용한 예문입니다.`,
      english: `This is an example sentence using ${englishText}.`,
    },
    {
      korean: `${koreanText}의 의미를 이해하셨나요?`,
      english: `Do you understand the meaning of ${englishText}?`,
    },
  ]

  return {
    korean: koreanText,
    english: englishText,
    bengali: bengaliText,
    pronunciation: "", // You may want to implement a proper romanization function
    synonyms: [], // You may want to implement a synonym lookup
    examples: examples,
  }
}
