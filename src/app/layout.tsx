import './globals.css'
import Navbar from '@/components/Navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imobiliária STR',
  description: 'Sistema Imobiliário com IA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="pb-12">
          {children}
        </main>
      </body>
    </html>
  )
}