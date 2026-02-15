import 'dotenv/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpFromAddress = process.env.SMTP_FROM_ADDRESS
const smtpFromName = process.env.SMTP_FROM_NAME
const payloadSecret = process.env.PAYLOAD_SECRET

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts],
  editor: lexicalEditor(),
  secret: payloadSecret || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    //push: true, // IN DEV
  }),
  sharp,
  plugins: [],
  email: nodemailerAdapter({
    defaultFromAddress: smtpFromAddress || '',
    defaultFromName: smtpFromName || '',

    transportOptions: {
      service: process.env.MAIL_SERVICE || undefined,
      secure: process.env.MAIL_SECURE || undefined,
      requireTLS: process.env.MAIL_TLS || undefined,
      host: process.env.SMTP_HOST || undefined,
      port: process.env.SMTP_PORT || undefined,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    },
  }),
})
