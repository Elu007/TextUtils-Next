'use client'
import { Toaster } from 'sonner'
import Header from '@/components/shared/header/page'
import Footer from '@/components/shared/footer/page'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
       <Toaster richColors position="top-right" />
      <Header />
      <main className="flex-1 wrapper">
        {children}
      </main>
      <Footer />
    </div>
  )
}
