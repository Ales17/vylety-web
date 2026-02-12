'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
import { cookies } from 'next/headers'
import { formatUrl } from './string-methods'

const tokenCookieName = 'payload-token'
const webUrl = process.env.WEBSITE_URL || 'URL'
const adminEmail = process.env.ADMIN_EMAIL

export async function login(initialState: any, formData: FormData) {
  const rawData = {
    email: String(formData.get('email')),
    // password: String(formData.get('password')),
  }

  const schema = z.object({
    email: z.email(),
    // password: z.string(),
  })

  let result
  let token
  const validatedFields = schema.safeParse({
    email: rawData.email,
    // password: rawData.password,
  })

  if (!validatedFields.success) {
    console.log('error validating')
    return {
      message: 'E-mail není ve správném formátu!', //errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // Prevent password change for admin, so he can
  if (validatedFields.data.email == adminEmail) {
    return {
      message: 'Magic link není povolen.',
    }
  }

  try {
    token = await payload.forgotPassword({
      collection: 'users', // required
      data: {
        email: validatedFields.data.email,
      },
      disableEmail: true,
      //req: req, // pass a Request object to be provided to all hooks
    })
    //console.log('TOKEN', token)

    //console.log(result)
  } catch (err: any) {
    console.error('ERR', err)
  }

  if (!token) {
    // Vrátíme stejnou hlášku pro neexistující uživatele i pro chyby - bezpečnostní standard
    return { message: 'Pokud u nás máte účet, e-mail dorazí během chvíle.' }
  }


  try {
    const prettyUrl = formatUrl(webUrl) || webUrl; // Fallback na celou URL, pokud formátování selže

    await payload.sendEmail({
      to: validatedFields.data.email,
      subject: `Přihlášení na ${prettyUrl}`,
      text: `Ahoj, \npro přihlášení na web ${prettyUrl} použij následující odkaz:\n${webUrl}/login/${token}`,
      html: `Ahoj,<br>pro přihlášení na web ${prettyUrl} použij odkaz: <a href="${webUrl}/login/${token}">${prettyUrl}</a>`,
    })

    return { message: 'Zkontroluj si e-mailovou schránku.' }
  } catch (emailErr) {
    console.error('Email failed', emailErr)
    return { message: 'Chyba při odesílání e-mailu.' }
  }

}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(tokenCookieName)
  redirect('/login')
}
