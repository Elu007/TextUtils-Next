'use client'

import { useState } from 'react'
import Textarea from '@/components/shared/Textarea'
import { toast } from 'sonner'

// Types for LanguageTool API Response
interface Replacement {
  value: string;
}

interface Match {
  message: string;
  offset: number;
  length: number;
  replacements: Replacement[];
}

interface LanguageToolResponse {
  matches: Match[];
}

const GrammarCheckerPage = () => {
  const [text, setText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      toast.error("🚫 Please enter some text to check.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text,
          language: 'en-US',
          enabledOnly: 'false',
        }).toString(),
      })

      const data: LanguageToolResponse = await res.json()

      if (!data || !data.matches) {
        toast.error("❌ Error checking grammar.")
        return
      }

      let fixedText = text
      // Replace from the end to maintain correct offsets
      data.matches.reverse().forEach((match) => {
        if (match.replacements?.length > 0) {
          const replacement = match.replacements[0].value
          fixedText =
            fixedText.slice(0, match.offset) +
            replacement +
            fixedText.slice(match.offset + match.length)
        }
      })

      setCorrectedText(fixedText)
      toast.success("✅ Grammar checked successfully!")
    } catch {
      toast.error("⚠️ Something went wrong. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Grammar Checker 📝</h2>
      <Textarea
        rows={10}
        placeholder="Paste your paragraph or write here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-center mt-4">
        <button
          onClick={handleCheckGrammar}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Grammar"}
        </button>
      </div>

      {correctedText && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100 dark:bg-neutral-800 text-black dark:text-white">
          <h3 className="font-bold mb-2">Corrected Text ✨</h3>
          <p>{correctedText}</p>
        </div>
      )}
    </div>
  )
}

export default GrammarCheckerPage
