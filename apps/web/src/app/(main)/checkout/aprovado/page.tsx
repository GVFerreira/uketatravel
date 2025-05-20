'use client'

// import { getCheckoutVisas } from "../action"
import Link from "next/link"

import { CheckCircle, TicketsPlane } from "lucide-react"
import { Suspense } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HeaderCKT from "../components/header"
import FooterCKT from "../components/footer"

export function ApprovedContent() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Obrigado!</CardTitle>
          <CardDescription>Sua solicitação foi concluída com sucesso</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Detalhes da compra:</h3>
            <p>Data da compra: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
          <p className="text-center text-muted-foreground">
            Nós enviaremos todas as atualizações do seu processo através do e-mail cadastrado previamente.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/minha-solicitacao">
            <Button className="w-full">
              <TicketsPlane className="mr-2 h-4 w-4" />
              Consultar solicitação
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export default function Approved() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCKT />
      <main className=" flex-1 flex items-center justify-center py-12 px-4 md:px-6">
        <Suspense fallback={<div>Carregando...</div>}>
          <ApprovedContent />
        </Suspense>
      </main>
      <FooterCKT />
    </div>
  )
}