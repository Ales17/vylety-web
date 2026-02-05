import React from 'react'
import 'dotenv/config'
import './styles.css'

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
        <main>{children}</main>
      </body>
    </html>
  )
}
