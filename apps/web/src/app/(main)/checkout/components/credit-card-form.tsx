"use client"


import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { cardPayment } from "../action"
import { useRouter } from 'next/navigation'
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
  cardNumber: z
    .string({ required_error: "Este campo é obrigatório." })
    .refine(
      (val) => /^\d{4} \d{4} \d{4} \d{4}$/.test(val),
      { message: "O número do seu cartão está incompleto ou com formato inválido." }
    ),
  cardHolderName: z.string({
    required_error: "Este campo é obrigatório."
  }),
  CVV: z
    .string({ required_error: "Este campo é obrigatório." })
    .min(3, "CVV inválido.")
    .max(4, "CVV inválido."),
    cpfNumber: z
    .string({ required_error: "Este campo é obrigatório." })
    .refine(
      (val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val),
      { message: "CPF inválido ou com formato incorreto." }
    ),
  expiryMonth: z.string({
    required_error: "Este campo é obrigatório."
  }),
  expiryYear: z.string({
    required_error: "Este campo é obrigatório."
  }),
  installment: z.string({
    required_error: "Este campo é obrigatório."
  })
})

type Props = {
  exchangeRate: number
}

export function CreditCardForm({ exchangeRate }: Props) {
  const router = useRouter()
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format CPF
  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, "")
  
    let cpfFormatted = ""
  
    if (numbers.length <= 3) {
      cpfFormatted = numbers
    } else if (numbers.length <= 6) {
      cpfFormatted = `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      cpfFormatted = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      cpfFormatted = `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
    }
  
    return cpfFormatted
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      installment: "1"
    }
  })
   
  async function onSubmit(cardDetails: z.infer<typeof formSchema>) {
    try {
      const solicitationId = localStorage.getItem('solicitation_id')
      if(solicitationId) {
        const reqCardPayment = await cardPayment({cardDetails, solicitationId})
        console.log(reqCardPayment)

        if(reqCardPayment.status === "Aprovado") {
          router.replace('/checkout/aprovado')
        } else {
          router.replace('/checkout/negado')
        }
        router.refresh()
        
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do cartão</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ex.: José Souza"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <FormField
              control={form.control}
              name="CVV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123"
                      maxLength={3}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = e.target.value.replace(/\D/g, "").slice(0, 3)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpfNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      maxLength={14}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = formatCpf(e.target.value)
                        field.onChange(formatted)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p>Validade</p>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="expiryMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => {
                        const month = (i + 1).toString().padStart(2, "0")
                        return (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="AAAA" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 25}, (_, i) => {
                        const year = (new Date().getFullYear() + i).toString().slice(-2)
                        return (
                          <SelectItem key={year} value={"20" + year}>
                            20{year}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="installment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcelas</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="1">
                          1 x de R$ {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(exchangeRate * 59.9)}
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex md:justify-end mt-8">
            <Button disabled={form.formState.isSubmitting}>
              {
                form.formState.isSubmitting ? (
                  <>
                    <span>Realizando pagamento</span>
                    <LoaderCircle className="animate-[spin_2.5s_linear_infinite]" />
                  </>
                ) :
                "Pagar"
              }
            </Button>  
          </div>
        </form>
    </Form>
  )
}
