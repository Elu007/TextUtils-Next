'use client'

import { useState, useRef } from 'react'
import Textarea from '@/components/shared/Textarea'
import { toast } from 'sonner'
import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function BlogPage() {
    const [topic, setTopic] = useState('')
    const [blog, setBlog] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleGenerate = async () => {
        if (!topic.trim()) {
            toast.error('🚫 Please enter a topic.')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/generateBlog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            })
            const data = await res.json()
            if (res.ok) {
                setBlog(data.content)
                setIsEditing(false)
                toast.success('✅ Blog generated successfully!')
            } else {
                toast.error(data.error || '❌ Generation failed.')
            }
        } catch {
            toast.error('⚠️ Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(blog)
        toast.success('📋 Copied to clipboard!')
    }

    return (
        <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Blog Generator 📝</h2>

            <Textarea
                rows={2}
                placeholder="Enter your blog topic here..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Generating...' : 'Generate Blog'}
                </button>
            </div>

            {blog && (
                <div className="flex flex-col gap-4">
                    {/* 1️⃣ Raw editor */}
                    <Textarea
                        ref={textareaRef}
                        rows={10}
                        value={blog}
                        onChange={(e) => setBlog(e.target.value)}
                        readOnly={!isEditing}
                        className={clsx(
                            'bg-white dark:bg-neutral-900 text-black dark:text-white transition-colors',
                            !isEditing && 'cursor-not-allowed'
                        )}
                    />

                    {/* 2️⃣ Edit / Copy buttons */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleCopy}
                            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition cursor-pointer"
                        >
                            Copy
                        </button>
                        <button
                            onClick={() => setIsEditing((p) => !p)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition cursor-pointer"
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>

                    {/* 3️⃣ Markdown preview */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {blog}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    )
}
