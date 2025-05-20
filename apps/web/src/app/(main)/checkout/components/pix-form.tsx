'use client'

import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { pixPayment } from '../action'

const formSchema = z.object({
  fullName: z
    .string({
      required_error: "Este campo é obrigatório."
    }),
  cpfNumber: z
    .string({ required_error: "Este campo é obrigatório." })
    .refine(
      (val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val),
      { message: "CPF inválido ou com formato incorreto." }
    )
})

type PixProps = {
  exchangeRate: number,
}

export function PixForm({ exchangeRate }: PixProps) {
  const router = useRouter()

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
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(pixDetails: z.infer<typeof formSchema>) {
    try {
      const solicitationId = localStorage.getItem('solicitation_id')
      if(solicitationId) {
        const reqPixPayment = await pixPayment({pixDetails, solicitationId})

        if(reqPixPayment.status === "Pagamento pendente") {
          localStorage.setItem('payment_id', reqPixPayment.id)
          localStorage.setItem('qrCode', reqPixPayment.qrCode as string)
          localStorage.setItem('qrCodeBase64', reqPixPayment.qrCodeBase64 as string)

          router.replace('/checkout/pix')
        } else {
          router.replace('/checkout')
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
            name="fullName"
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
        <div className="flex md:justify-end mt-8">
          <Button disabled={form.formState.isSubmitting}>
            {
              form.formState.isSubmitting ? (
                <>
                  <span>Gerando QR Code</span>
                  <LoaderCircle className="animate-[spin_2.5s_linear_infinite]" />
                </>
              ) :
              "Gerar PIX"
            }
          </Button>  
        </div>
      </form>
    </Form>
  )
}
