'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'

const tabs = [
  { name: 'Text Editor', href: '/texteditor' },
  { name: 'Grammar Checker', href: '/grammar' },
  { name: 'Blog Generator', href: '/blog' },
]

export default function Header() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  if (!mounted) return null

  const emoji = theme === 'light' ? '🌞' : theme === 'dark' ? '🌙' : '💻'

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 transition-colors">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-xl font-semibold text-black dark:text-white transition-colors">
            TextUtils-Next
          </span>
        </Link>

        {/* Theme dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
            aria-label="Toggle theme menu"
          >
            {emoji}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg z-20 transition-colors">
              {[
                { label: '💻 Auto (System)', value: 'system' },
                { label: '🌞 Light', value: 'light' },
                { label: '🌙 Dark', value: 'dark' },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value)
                    setMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav
        className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 m-4 rounded-xl overflow-hidden transition-colors"
        aria-label="Tabs"
        role="tablist"
      >
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={clsx(
                  'flex-1 text-center py-3 px-6 text-sm font-medium transition-all',
                  'text-blue-500 hover:text-blue-700',
                  'dark:text-neutral-400 dark:hover:text-neutral-200',
                  'border-b-2 border-transparent',
                  isActive
                    ? 'border-blue-600 text-blue-700 dark:text-white'
                    : 'hover:border-gray-300 dark:hover:border-neutral-600'
                )}
                role="tab"
                aria-selected={isActive}
              >
                {tab.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
