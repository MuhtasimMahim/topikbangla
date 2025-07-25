export const koreanAlphabet = [
  {
    type: "Basic Vowels",
    letters: [
      { hangul: "ㅏ", bengali: "আ", ipa: "a" },
      { hangul: "ㅓ", bengali: "ও", ipa: "ʌ" },
      { hangul: "ㅗ", bengali: "ও", ipa: "o" },
      { hangul: "ㅜ", bengali: "উ", ipa: "u" },
      { hangul: "ㅡ", bengali: "উ", ipa: "ɯ" },
      { hangul: "ㅣ", bengali: "ই", ipa: "i" },
    ],
  },
  {
    type: "Complex Vowels",
    letters: [
      { hangul: "ㅑ", bengali: "ইয়া", ipa: "ja" },
      { hangul: "ㅕ", bengali: "ইয়ো", ipa: "jʌ" },
      { hangul: "ㅛ", bengali: "ইয়ো", ipa: "jo" },
      { hangul: "ㅠ", bengali: "ইউ", ipa: "ju" },
    ],
  },
  {
    type: "Basic Consonants",
    letters: [
      { hangul: "ㄱ", bengali: "ক/গ", ipa: "k/g" },
      { hangul: "ㄴ", bengali: "ন", ipa: "n" },
      { hangul: "ㄷ", bengali: "ড/ত", ipa: "t/d" },
      { hangul: "ㄹ", bengali: "র/ল", ipa: "r/l" },
      { hangul: "ㅁ", bengali: "ম", ipa: "m" },
      { hangul: "ㅂ", bengali: "ব/প", ipa: "p/b" },
      { hangul: "ㅅ", bengali: "শ/স", ipa: "s" },
      { hangul: "ㅇ", bengali: "ং", ipa: "ŋ" },
      { hangul: "ㅈ", bengali: "জ", ipa: "tɕ" },
      { hangul: "ㅊ", bengali: "চ", ipa: "tɕʰ" },
      { hangul: "ㅋ", bengali: "ক", ipa: "kʰ" },
      { hangul: "ㅌ", bengali: "ট", ipa: "tʰ" },
      { hangul: "ㅍ", bengali: "ফ", ipa: "pʰ" },
      { hangul: "ㅎ", bengali: "হ", ipa: "h" },
    ],
  },
  {
    type: "Double Consonants",
    letters: [
      { hangul: "ㄲ", bengali: "ক্ক", ipa: "k͈" },
      { hangul: "ㄸ", bengali: "ত্ত", ipa: "t͈" },
      { hangul: "ㅃ", bengali: "প্প", ipa: "p͈" },
      { hangul: "ㅆ", bengali: "স্স", ipa: "s͈" },
      { hangul: "ㅉ", bengali: "জ্জ", ipa: "t͈ɕ" },
    ],
  },
]

export const basicSyllableChart = {
  consonants: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  vowels: ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ", "ㅣ"],
  bengaliConsonants: ["ক/গ", "ন", "ড/ত", "র/ল", "ম", "ব/প", "শ/স", "ং", "জ", "চ", "ক", "ট", "ফ", "হ"],
  bengaliVowels: ["আ", "ইয়া", "ও", "ইয়ো", "ও", "ইয়ো", "উ", "ইউ", "উ", "ই"],
}

export const complexSyllableChart = {
  consonants: ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"],
  vowels: ["ㅐ", "ㅒ", "ㅔ", "ㅖ", "ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"],
  bengaliConsonants: ["ক/গ", "ন", "ড/ত", "র/ল", "ম", "ব/প", "শ/স", "ং", "জ", "চ", "ক", "ট", "ফ", "হ"],
  bengaliVowels: ["এ", "ইয়ে", "এ", "ইয়ে", "ওয়া", "ওয়ে", "ওয়ে", "উও", "উএ", "উই", "উই"],
}
