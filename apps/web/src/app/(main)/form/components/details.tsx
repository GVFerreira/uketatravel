"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { countries } from "./countries-list"
import { saveDetails } from "../action"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Seu nome deve conter ao menos 2 caracteres.",
  }).toLowerCase(),
  surname: z.string().min(2, {
    message: "Seu sobrenome deve conter ao menos 2 caracteres.",
  }).toLowerCase(),
  dateOfBirth: z.string().refine((val) => {
      const date = new Date(val)
      const minDate = new Date()
      return !isNaN(date.getTime()) && date <= minDate
    }, {
      message: "Sua data de nascimento é inválida.",
  }),
  passportNumber: z.string().max(9, {
    message: "O número do seu passaporte não pode ser superior a 9 caracteres.",
  }).toUpperCase(),
  passportExpiryDate: z.string().refine((val) => {
      const date = new Date(val)
      const minDate = new Date()
      return !isNaN(date.getTime()) && date >= minDate
    }, {
      message: "Seu passaporte está expirado.",
  }),
  nationality: z.string(),
  passportCountryOfIssue: z.string(),
  phone: z.string(),
  email: z.string().email("Digite um e-mail válido"),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string()
})

type Props = {
  onSuccess: () => void
}

export function Details({ onSuccess }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      dateOfBirth: "",
      passportNumber: "",
      passportExpiryDate: "",
      nationality: "",
      passportCountryOfIssue: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
      country: ""
    },
  })
 
  async function onSubmit(details: z.infer<typeof formSchema>) {
    try {
      const result = await saveDetails(details)
      localStorage.setItem('solicitation_id', result.solicitationId)

      onSuccess()
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Dados pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <hr />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Dados do passaporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do passaporte</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passportExpiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de validade do passaporte</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua nacionalidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      countries.map((country, index) => (
                        <SelectItem key={index} value={country.nome_pais}>{country.nome_pais} ({country.sigla})</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passportCountryOfIssue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País de emissão do passaporte</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      countries.map((country, index) => (
                        <SelectItem key={index} value={country.nome_pais}>{country.nome_pais} ({country.sigla})</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <hr />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Dados de contato</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de telefone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <hr />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Dados de residência</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      countries.map((country, index) => (
                        <SelectItem key={index} value={country.nome_pais}>{country.nome_pais} ({country.sigla})</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex md:justify-end mt-8">
          <Button>Próximo</Button>  
        </div>
      </form>
    </Form>
  )
}
