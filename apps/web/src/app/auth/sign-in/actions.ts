'use server'

import { api } from "@/http/api-client"
import { HTTPError } from "ky"
import { cookies } from "next/headers"

interface SignInRequest {
  email: string,
  password: string
}

interface SignInResponse {
  token: string
}

export async function SignIn(data: SignInRequest) {
  const { email, password } = data

  try {
    const { token } = await api.post<SignInResponse>('sessions/password', {
      json: {
        email,
        password
      },
    }).json()

    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 3
    })
    
  } catch (e) {
    if (e instanceof HTTPError) {
      const { message } = await e.response.json()
      return { success: false, message, errors: null} 
    }
  }

  return { success: true, message: null, errors: null }
}