'use server'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
import { cookies } from 'next/headers'
import { password } from 'payload/shared'

const tokenCookieName = 'payload-token'

export async function login(formData: FormData) {
  'use server'

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
      errors: validatedFields.error.flatten().fieldErrors,
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
  } catch (err: any) {}

  if (result && result.token) {
    const cookieStore = await cookies()
    cookieStore.set(tokenCookieName, result?.token, {
      path: '/',
      httpOnly: true,
    })
    redirect('/')
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(tokenCookieName)
  redirect('/login')
}
