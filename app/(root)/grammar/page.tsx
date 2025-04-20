'use client'

import { useState } from 'react'
import Textarea from '@/components/shared/Textarea'
import { toast } from 'sonner'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

// Types for LanguageTool API Response
interface Replacement {
  value: string
}

interface Match {
  message: string
  offset: number
  length: number
  replacements: Replacement[]
}

interface LanguageToolResponse {
  matches: Match[]
}

const COLORS = ['#10B981', '#EF4444'] // green for correct, red for errors

const GrammarCheckerPage = () => {
  const [text, setText] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorCount, setErrorCount] = useState(0)

  const handleCheckGrammar = async () => {
    if (!text.trim()) {
      toast.error('🚫 Please enter some text to check.')
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
        toast.error('❌ Error checking grammar.')
        return
      }

      setErrorCount(data.matches.length)

      let fixedText = text
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
      toast.success('✅ Grammar checked successfully!')
    } catch {
      toast.error('⚠️ Something went wrong. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const totalSentences = text.split(/[.!?]/).filter((s) => s.trim()).length
  const correctSentences = Math.max(totalSentences - errorCount, 0)

  const pieData = [
    { name: 'Correct Sentences', value: correctSentences },
    { name: 'Grammar Issues', value: errorCount },
  ]

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
          {loading ? 'Checking...' : 'Check Grammar'}
        </button>
      </div>
      <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400 text-center">
        * Free version only fixes basic grammar issues, not complex errors.
      </p>

      {correctedText && (
        <div className="mt-6 w-full">
          <div className="p-4 border rounded-lg bg-gray-100 dark:bg-neutral-800 text-black dark:text-white">
            <h3 className="font-bold mb-2">Corrected Text ✨</h3>
            <p>{correctedText}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-center">Error Overview 📊</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label={({ name }) => name}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default GrammarCheckerPage