'use client'

import Link from 'next/link'

import { CircleDollarSign, Home, ScrollText, User } from 'lucide-react'
import Logotype from '@/app/(main)/_components/logotype'
import { useTheme } from 'next-themes'

export function AdminSidebar() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="border-r bg-muted lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold w-full" href="/admin">
            <Logotype />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-6">
          <nav className="grid items-start px-4 space-y-6 font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg px-3 transition-all hover:text-muted-foreground"
              href="/admin"
            >
              <Home className="size-5" />
              Início
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3  transition-all hover:text-muted-foreground"
              href="/admin/solicitacao"
            >
              <ScrollText className="size-5" />
              Solicitações
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3  transition-all hover:text-muted-foreground"
              href="/admin/pagamento"
            >
              <CircleDollarSign className="size-5" />
              Pagamentos
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3  transition-all hover:text-muted-foreground"
              href="/admin/usuario"
            >
              <User className="size-5" />
              Usuários
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}