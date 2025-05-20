import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    GOOGLE_APPLICATION_CREDENTIALS: z.string(),
    SMTP_HOSTSERVER: z.string(),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string()
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url()
  },
  shared: {
    NEXT_PUBLIC_API_URL: z.string().url()
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    SMTP_HOSTSERVER: process.env.SMTP_HOSTSERVER,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  emptyStringAsUndefined: true
})