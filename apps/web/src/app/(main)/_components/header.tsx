'use client'

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import Logotype from "./logotype"


export default function Header () {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <a href="/">
            <Logotype />
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#how-it-works"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            Elegibilidade
          </Link>
          <Link
            href="/#eligibility"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            Requerimentos
          </Link>
          <Link
            href="/#benefits"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            Benefícios
          </Link>
          <Link
            href="/minha-solicitacao"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            Minha ETA
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
            <Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="outline" className="hidden md:flex">
            <a href="/contato">
              Contato
            </a>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
            <a href="/form">
              Iniciar aplicação
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}