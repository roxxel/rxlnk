import type { Metadata } from 'next'
import { Inter, Rubik } from 'next/font/google'
import './globals.css'

const inter = Rubik({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Reactive Link',
  description: 'Share pastes, shorten link and build your own linktree entirely for free!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
