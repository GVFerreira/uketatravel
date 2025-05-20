import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

import type { Metadata } from "next"
import { Roboto } from "next/font/google"

export const metadata: Metadata = {
  title: "UK Electronic Travel Authorization",
  description:
    "Obtenha sua Autorização Eletrônica de Viagem para o Reino Unido de forma rápida e fácil com nosso serviço de assistência especializada. Processo de solicitação simples, rápido e sem complicações.",
}

const roboto = Roboto({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={roboto.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
