'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"     // ← system is default
      enableSystem              // ← allow following OS setting
      enableColorScheme         // ← updates color-scheme style
    >
      {children}
    </ThemeProvider>
  )
}
