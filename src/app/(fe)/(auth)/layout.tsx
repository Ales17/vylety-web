import React from 'react'
import 'dotenv/config'
import '../styles.css'

const websiteName = process.env.WEBSITE_NAME

export const metadata = {
  description: '',
  title: 'Přihlášení | ' + websiteName,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="cs">
      <body>
        <main className="bg-white m-2 lg:mx-auto lg:max-w-2xl border rounded-3xl border-slate-200 p-2 md:p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
