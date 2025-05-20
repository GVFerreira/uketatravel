import ky from 'ky'
import { getCookie } from 'cookies-next'

export const api = ky.create({
  prefixUrl: "http://localhost:3333",
  hooks: {
    beforeRequest: [
      async (request) => {
        let token: string | undefined

        if (typeof window === 'undefined') {
          const { cookies: getServerCookies } = await import('next/headers')

          const cookieStore = await getServerCookies()
          token = cookieStore.get('auth-token')?.value

          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
          }

        } else {
          token = getCookie('auth-token') as string | undefined

        }

      }
    ]
  },
  timeout: 15000
})