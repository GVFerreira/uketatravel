import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, LogIn } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SignIn } from "./actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

const signInSchema = z.object({
  email: z.string().email({ message: 'Insira um e-mail válido' }),
  password: z.string().min(8, { message: "Insira uma senha válida" })
})

export default function SignInForm() {
  const [error, setError] = useState("")
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function handleSubmit(data: z.infer<typeof signInSchema>) {
    try {
      const result = await SignIn(data)

      if (result.success) {
        router.push('/admin')
      } else {
        setError('Credenciais inválidas')
      }

    } catch (e: any) {
      setError(e)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="email@uketatravel.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          { form.formState.isSubmitting ? 
            <Loader2 className="size-4 animate-spin" /> : 
            <>
              Entrar
              <LogIn className="size-4 ml-2" />
            </>
          }
          
        </Button>
      </form>
      {
        error && (
          <p className="text-sm font-medium text-red-500 dark:text-red-400 my-4">{error}</p>
        )
      }
    </Form>
  )
}