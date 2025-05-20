import { PropsWithChildren } from 'react'
import { AdminSidebar } from './_components/admin-sidebar'
import Link from "next/link"
import { Button } from "@/components/ui/button"

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from "@/components/ui/dropdown-menu"

import { Metadata } from "next"
import Logotype from '../(main)/_components/logotype'
import { auth } from '@/auth/auth'
import SwitchTheme from './_components/switch-theme'

export const metadata: Metadata = {
  title: "Admin - UK ETA Travel",
}

export const revalidate = 0

export default async function Layout({ children }: PropsWithChildren) {
  const { user } = await auth()

  return (
    <div className="grid grid-cols-[14rem_1fr]">
      <AdminSidebar />
      <div className="min-h-screen flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
          <Link className="lg:hidden" href="/admin">
            <Logotype />
          </Link>
          <div className="ml-auto flex items-center justify-center">
            <SwitchTheme />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <Avatar>
                    <AvatarImage src={user.avatarUrl as string}/>
                    <AvatarFallback>{(user.name)?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="destructive" asChild className='w-full'>
                    <a href="/api/auth/logout">Sair</a>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}