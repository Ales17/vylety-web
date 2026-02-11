import React from 'react'
import 'dotenv/config'
import '../styles.css'

const webTitle = process.env.WEBSITE_TITLE

export const metadata = {
  description: '',
  title: 'Přihlášení | ' + webTitle,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="cs">
      <body>
        <main className="bg-white m-2 lg:mx-auto lg:max-w-xl border rounded-3xl border-slate-200 p-2 md:p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
