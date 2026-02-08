import React from 'react'
import './styles.css'
import Nav from '@/components/Nav'
export const metadata = {
  title: 'Výletník',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="cs">
      <body>
        <Nav />
        <main className="m-2 lg:mx-auto lg:max-w-4xl rounded-3xl border  border-white/40 shadow-sm">
          {children}
        </main>
      </body>
    </html>
  )
}
