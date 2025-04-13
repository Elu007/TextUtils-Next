'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const tabs = [
  { name: 'Text Editor', href: '/texteditor' },
  { name: 'Grammar Checker', href: '/grammar' },
  { name: 'Blog Generator', href: '/blog' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <nav
      className="relative z-0 flex border border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700 m-4"
      aria-label="Tabs"
      role="tablist"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={clsx(
            'min-w-0 flex-1 text-center py-4 px-4 text-sm font-medium border-b-2 border-s first:border-s-0',
            'hover:bg-gray-50 hover:text-gray-700 text-gray-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300',
            'dark:bg-neutral-800 dark:border-l-neutral-700 dark:border-b-neutral-700 border-gray-200',
            pathname === tab.href &&
              'border-b-blue-600 text-gray-900 dark:text-white dark:border-b-blue-600'
          )}
          role="tab"
          aria-selected={pathname === tab.href}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  )
}
