import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Marketing Agent',
  description: 'Minimal onboarding → plan → connect → dashboard demo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
