'use client'

import Header from '@/components/shared/header/page'
import Footer from '@/components/shared/footer/page'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer />
    </div>
  )
}
