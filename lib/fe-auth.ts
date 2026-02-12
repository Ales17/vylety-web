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

export async function passwordLogin(initialState: any, formData: FormData) {
  const rawData = {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  }

  const schema = z.object({
    email: z.email(),
    password: z.string(),
  })

  let result

  const validatedFields = schema.safeParse({
    email: rawData.email,
    password: rawData.password,
  })

  if (!validatedFields.success) {
    console.log('error validating')
    return {
      message: 'Validate errors!', //errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  try {
    result = await payload.login({
      collection: 'users', // required
      data: {
        // required
        email: rawData.email,
        password: rawData.password,
      },
      //req: req, // optional, pass a Request object to be provided to all hooks
      depth: 2,
      locale: 'cs',
      //fallbackLocale: false,
      overrideAccess: false,
      showHiddenFields: true,
    })
    //console.log(result)
  } catch (err: any) {
    console.error(err)
  }

  if (result && result.token) {
    const cookieStore = await cookies()
    cookieStore.set(tokenCookieName, result?.token, {
      path: '/',
      httpOnly: true,
    })
    redirect('/')
  }

  return { message: 'Přihlášení se nezdařilo' }
}

export async function magicLinkLogin(initialState: any, formData: FormData) {
  const rawData = {
    email: String(formData.get('email')),
  }

  const schema = z.object({
    email: z.email(),
  })

  let result
  let token
  const validatedFields = schema.safeParse({
    email: rawData.email,
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
    // Same message for non-existens users and errors - security standard
    return { message: 'Pokud u nás máte účet, e-mail dorazí během chvíle.' }
  }

  try {
    const prettyUrl = formatUrl(webUrl) || webUrl // Full URL fallback if formatting fails

    await payload.sendEmail({
      to: validatedFields.data.email,
      subject: `Přihlášení na ${prettyUrl}`,
      text: `Pro přihlášení na web ${prettyUrl} použijte následující odkaz:\n${webUrl}/login/${token}\nPokud by nefungoval, zkopírujte ho do prohlížeče`,
      html: `Pro přihlášení na web ${prettyUrl} použijte následující odkaz:<br> <a href="${webUrl}/login/${token}">${prettyUrl}</a><br>Pokud by nefungoval, zkopírujte ho do prohlížeče`,
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
