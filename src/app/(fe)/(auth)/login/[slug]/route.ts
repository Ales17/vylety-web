import { headers as nextHeaders, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const tokenCookieName = 'payload-token'

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  //   const headers = await nextHeaders()

  //   const { user } = await payload.auth({ headers, canSetHeaders: false })

  //   if (user) {
  //     redirect('/')
  //   }

  const emailToken = slug

  let result = null

  // Payload CMS does not support magic links by default, so the forgot password and reset password is used for this
  try {
    result = await payload.resetPassword({
      collection: 'users', // required
      overrideAccess: false,
      data: {
        // required
        password: uuidv4(), // Need to set random password. If a user finds admin panel, he can reset his password and log into it. However, he will get an unathorized message.
        token: emailToken, // The token generated from the forgotPassword operation
      },
    })

    console.log(result)
  } catch (err) {
    console.log(err)
    redirect('/login')
  }

  if (result && result.token) {
    const cookieStore = await cookies()
    cookieStore.set(tokenCookieName, result?.token, {
      path: '/',
      httpOnly: true,
    })
    redirect('/')
  } else {
    redirect('/login')
  }
}
