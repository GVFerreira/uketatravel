'use client'

import { Suspense } from "react"

import { CircleX } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card"
import HeaderCKT from "../components/header"
import FooterCKT from "../components/footer"

function RejectedContent() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <CircleX className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Negado!</CardTitle>
          <CardDescription>Seu pagamento foi negado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Data da tentativa:</h3>
            <p>Data: {new Date().toLocaleDateString("pt-BR")}</p>
          </div>
          <p className="text-center text-muted-foreground">
            Nós enviaremos todas as atualizações do seu processo através do e-mail cadastrado previamente.
          </p>
        </CardContent>
        {/* <CardFooter>
          <Button className="mx-auto">
            <Link href={"/aplicacao/checkout/outra-tentativa?paymentId=${paymentId}"} className="flex justify-center">
              <Wallet className="mr-2 h-4 w-4" />
              Tentar novamente
            </Link>
          </Button>
        </CardFooter> */}
      </Card>
    </main>
  )
}

export default function Rejected() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCKT />
      <main className=" flex-1 flex items-center justify-center py-12 px-4 md:px-6">
        <Suspense fallback={<div>Carregando...</div>}>
          <RejectedContent />
        </Suspense>
      </main>
      <FooterCKT />
    </div>
  )
}
