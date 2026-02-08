import React from 'react'
import './styles.css'
import Nav from '@/components/Nav'
export const metadata = {
  title: '%s | Výletník',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="cs">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
