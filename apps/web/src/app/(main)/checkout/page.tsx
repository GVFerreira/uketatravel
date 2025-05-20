'use client'

import { useEffect, useState } from "react"
import { CreditCard, Loader, QrCode } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CreditCardForm } from "./components/credit-card-form"
import { PixForm } from "./components/pix-form"
import { OrderSummary } from "./components/order-summary"
import HeaderCKT from "./components/header"
import FooterCKT from "./components/footer"
import { getCheckoutInfo } from "./action"
import Logotype from "../_components/logotype"

interface getCheckoutInfoResponse {
  cotacaoCompra: number
  cotacaoVenda: number
  dataHoraCotacao: string
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "pix" | null>(null)
  const [checkoutInfo, setCheckoutInfo] = useState<getCheckoutInfoResponse | null>(null)

  useEffect(() => {
    const fetchCheckoutInfo = async () => {
      const getCheckoutInfoResult = await getCheckoutInfo()
      console.log(getCheckoutInfoResult)
      setCheckoutInfo(getCheckoutInfoResult)
    }
  
    fetchCheckoutInfo()
  }, [])

  const handleAccordionValueChange = (value: string) => {
    if (value === "credit-card" || value === "pix") {
      setPaymentMethod(value)
    } else {
      setPaymentMethod(null)
    }
  }

  if (!checkoutInfo) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Logotype />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Carregando checkout...</h1>
        <Loader className="size-20 my-10 animate-[spin_2.5s_linear_infinite] text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderCKT />
      <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
        <div className="flex gap-8 md:grid-cols-5 flex-col-reverse md:flex-row">
          <div className="md:w-3/5">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle><h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Checkout</h1></CardTitle>
                <CardDescription>Selecione o método de pagamento mais cômodo para você finalizar sua aplicação ao ETA do Reino Unido.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion
                  type="single"
                  collapsible
                  onValueChange={handleAccordionValueChange}
                  className="w-full"
                  defaultValue="credit-card"
                >
                  <AccordionItem value="credit-card">
                    <AccordionTrigger className="py-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <span>Cartão de crédito</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CreditCardForm exchangeRate={checkoutInfo?.cotacaoVenda || 0} />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="pix">
                    <AccordionTrigger className="py-4">
                      <div className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        <span>PIX</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PixForm exchangeRate={checkoutInfo?.cotacaoVenda || 0}/>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/5">
            <OrderSummary exchangeRate={checkoutInfo?.cotacaoVenda || 0} dateExchangeRate={checkoutInfo?.dataHoraCotacao || ""}/>
          </div>
        </div>
      </main>
      <FooterCKT />
    </div>
  )
}
