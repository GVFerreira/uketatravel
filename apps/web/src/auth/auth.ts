import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getProfile } from "@/http/get-profile"

export async function isAuthenticated() {
  return !!(await cookies()).get('auth-token')?.value
}

export async function auth() {
  const token = (await cookies()).get('auth-token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()
    return { user }
  } catch  {}

  redirect('/api/auth/logout')
}