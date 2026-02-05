'use server'

import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
import { cookies } from 'next/headers'

const tokenCookieName = 'payload-token'

export async function login(formData: FormData) {
  'use server'

  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  let result
  try {
    result = await payload.login({
      collection: 'users', // required
      data: {
        // required
        email: rawFormData.email,
        password: rawFormData.password,
      },
      //req: req, // optional, pass a Request object to be provided to all hooks
      depth: 2,
      locale: 'en',
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
  redirect('login')
}
