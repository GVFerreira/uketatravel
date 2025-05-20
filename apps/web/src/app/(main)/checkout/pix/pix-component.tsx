'use client'

import { useRouter } from "next/navigation"
import { checkPixPayment } from "../action"
import Image from "next/image"

import { useEffect, useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import CopyInput from "./copy-button"

export default function Pix() {
  const [id, setId] = useState("")
  const [qrCodeBase64, setQrCodeBase64] = useState("")
  const router = useRouter()

  useEffect(() => {
    const qrCodeBase64 = localStorage.getItem('qrCodeBase64')
    const id = localStorage.getItem('payment_id')

    if (id && qrCodeBase64) {
      setId(id)
      setQrCodeBase64(qrCodeBase64)
    }

  }, [])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        // Chama a função que verifica o status do pagamento
        const response = await checkPixPayment(id)
        const data =
        console.log(response)

        if (response && response.status === "Aprovado") {
          router.push("/checkout/aprovado")
          router.refresh()
        } else {
          toast('Você já realizou o pagamento?', {
            description: 'Ainda não recebemos o seu pagamento.'
          })
        }
      } catch (error) {
        console.error("Erro ao verificar o pagamento:", error)
      }

    }, 10 * 1000) // 10 seconds

    return () => clearInterval(intervalId)
  }, [id, router])

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256" className="size-8">
              <path d="M235.34,116.72,139.28,20.66a16,16,0,0,0-22.56,0L20.66,116.72a16,16,0,0,0,0,22.56l96.06,96.06a16,16,0,0,0,22.56,0l96.06-96.06A16,16,0,0,0,235.34,116.72ZM128,32,184,88H160a8,8,0,0,0-5.66,2.34L128,116.68,101.66,90.34A8,8,0,0,0,96,88H72ZM56,104H92.68l24,24-24,24H56L32,128Zm72,120L72,168H96a8,8,0,0,0,5.66-2.34L128,139.31l26.34,26.35A8,8,0,0,0,160,168h24Zm72-72H163.32l-24-24,24-24H200l24,24Z"></path>
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold">Pix QR Code</CardTitle>
          <CardDescription>Escaneie o QR Code abaixo através da câmera do seu celular.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <Image src={`data:image/png;base64,${qrCodeBase64}`} width={150} height={150} alt="QR CODE" className="w-full" />
          </div>
          <CopyInput />
          <p className="text-center text-muted-foreground">
            Ou se preferir, copie o código e cole-o na seção Pix do seu banco
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
