'use client'

import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme()

  return(
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="mx-4 my-2"
    >
      <Sun className="h-5 w-5 rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100" />
      <Moon className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}