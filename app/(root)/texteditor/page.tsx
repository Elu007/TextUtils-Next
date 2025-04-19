'use client'

import { useState } from 'react'
import Textarea from "@/components/shared/Textarea"
import { toast } from 'sonner'

const UtilitiesPage = () => {
    const [text, setText] = useState("")

    const handleUppercase = () => {
        setText(text.toUpperCase())
        toast.success("Converted to UPPERCASE 🔠")
    }

    const handleLowercase = () => {
        setText(text.toLowerCase())
        toast.success("Converted to lowercase 🔡")
    }
    const handleClear = () => {
        setText("")
        toast.info("Text cleared 🧹")
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            toast.success("Copied to clipboard 📋")
        } catch {
            toast.error("Failed to copy text ❌")
        }
    }

    const handleRemoveExtraSpaces = () => {
        setText(text.replace(/\s+/g, ' ').trim())
        toast.success("Extra spaces removed ✨")
    }

    const handleURLEncode = () => {
        setText(encodeURIComponent(text))
        toast.success("URL Encoded 🌐")
    }

    const handleURLDecode = () => {
        try {
            setText(decodeURIComponent(text))
            toast.success("URL Decoded 🔓")
        } catch {
            toast.error("Invalid encoded URL ❗")
        }
    }

    const handleJSONPrettify = () => {
        try {
            const json = JSON.parse(text)
            setText(JSON.stringify(json, null, 2))
            toast.success("JSON prettified 🎨")
        } catch {
            toast.error("Invalid JSON ❌")
        }
    }

    const handleJSONMinify = () => {
        try {
            const json = JSON.parse(text)
            setText(JSON.stringify(json))
            toast.success("JSON minified 🔧")
        } catch {
            toast.error("Invalid JSON ❌")
        }
    }

    const handleTitleCase = () => {
        const titleCase = text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        setText(titleCase)
        toast.success("Converted to Title Case 📚")
    }

    const handleSentenceCase = () => {
        const sentenceCase = text
            .toLowerCase()
            .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
        setText(sentenceCase)
        toast.success("Converted to Sentence Case ✒️")
    }

    const wordCount = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length
    const charCount = text.length
    const charCountNoSpaces = text.replace(/\s/g, '').length
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length
    const avgWordLength = wordCount > 0 ? (charCountNoSpaces / wordCount).toFixed(2) : 0

    const calculateFleschKincaid = () => {
        const sentences = sentenceCount
        const words = wordCount
        const syllables = text.split(/[aeiouy]+/gi).length
        return (206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)).toFixed(2)
    }

    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center gap-6">
                <Textarea
                    placeholder="Enter your text here..."
                    rows={8}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex flex-wrap justify-center gap-3">
                    <ActionButton text="Title Case" onClick={handleTitleCase} color="bg-purple-600 text-white" />
                    <ActionButton text="Sentence Case" onClick={handleSentenceCase} color="bg-indigo-600 text-white" />
                    <ActionButton text="Uppercase" onClick={handleUppercase} color="bg-gray-800 dark:bg-white text-white dark:text-black" />
                    <ActionButton text="Lowercase" onClick={handleLowercase} color="bg-gray-500 text-white" />
                    <ActionButton text="Clear Text" onClick={handleClear} color="bg-teal-500 text-white" />
                    <ActionButton text="Copy Text" onClick={handleCopy} color="bg-blue-600 text-white" />
                    <ActionButton text="Remove Extra Spaces" onClick={handleRemoveExtraSpaces} color="bg-red-500 text-white" />
                    <ActionButton text="URL Encode" onClick={handleURLEncode} color="bg-amber-500 text-white" />
                    <ActionButton text="URL Decode" onClick={handleURLDecode} color="bg-amber-600 text-white" />
                    <ActionButton text="JSON Prettify" onClick={handleJSONPrettify} color="bg-green-600 text-white" />
                    <ActionButton text="JSON Minify" onClick={handleJSONMinify} color="bg-green-700 text-white" />
                </div>
                <div className="mt-6 w-full max-w-2xl text-sm space-y-2 text-center text-gray-700 dark:text-gray-300">
                    <p><strong>Word Count:</strong> {wordCount}</p>
                    <p><strong>Character Count:</strong> {charCount}</p>
                    <p><strong>Readability Score (Flesch-Kincaid):</strong> {calculateFleschKincaid()}</p>
                    <p><strong>Character Count (No Spaces):</strong> {charCountNoSpaces}</p>
                    <p><strong>Sentence Count:</strong> {sentenceCount}</p>
                    <p><strong>Average Word Length:</strong> {avgWordLength}</p>
                </div>
            </div>
        </div>
    )
}

export default UtilitiesPage

const ActionButton = ({
    text,
    onClick,
    color
}: {
    text: string
    onClick: () => void
    color: string
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer py-2.5 px-4 min-w-[150px] text-sm font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${color}`}
        >
            {text}
        </button>
    )
}
