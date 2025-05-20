"use client"

import { useState } from "react"
import { Search, FileText, ArrowRight, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "../_components/header"
import Footer from "../_components/footer"
import { solicitationPublicInfo } from "./action"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

type publicInfo = {
  name: string
  surname: string
  email: string
  passportNumber: string
  status: string
  updatedAt: Date
  createdAt: Date
  payment: [
    payment: {
      payment: {
        status: string;
        createdAt: Date;
        transactionAmount: number;
        paymentTypeId: string;
      }
    }
  ]
}

export default function MinhaSolicitacao() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [resultado, setResultado] = useState<publicInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Função para lidar com a consulta
  const handleConsulta = async () => {
    if (!searchQuery.trim()) {
      setError("Por favor, insira um e-mail ou número de passaporte.")
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      const result = await solicitationPublicInfo(searchQuery)
      setResultado(result)

      if (!result.name) {
        setError("Nenhuma solicitação encontrada com os dados informados.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao consultar sua solicitação. Tente novamente.")
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  // Função para traduzir o status para português
  const traduzirStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      "Solicitação em análise interna": { label: "Solicitação em análise interna", color: "bg-yellow-100 text-yellow-800" },
      "Enviado ao Governo": { label: "Em processamento", color: "bg-blue-100 text-blue-800" },
      "Aprovado": { label: "Aprovado", color: "bg-green-100 text-green-800" },
      "Rejeitado": { label: "Rejeitado", color: "bg-red-100 text-red-800" },
    }

    return statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800" }
  }

  const traduzirStatusPagamento = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      "pagamento pendente": { label: "Pagamento pendente", color: "bg-yellow-100 text-yellow-800" },
      "aprovado": { label: "Aprovado", color: "bg-green-100 text-green-800" },
      "negado": { label: "Negado", color: "bg-red-100 text-red-800" },
      "falha ao gerar pix": { label: "Falha ao gerar PIX", color: "bg-red-100 text-red-800" },
    }
  
    return statusMap[status.toLowerCase()] || { label: status, color: "bg-gray-100 text-gray-800" }
  }

  function capitalizeWords(str: string) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }  

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl mx-auto py-16 px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Minha solicitação</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Verifique o status da sua solicitação e acompanhe o progresso da sua aplicação.
              </p>
            </div>

            <Tabs defaultValue="track" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="track">Consultar Status</TabsTrigger>
                <TabsTrigger value="new">Nova Solicitação</TabsTrigger>
              </TabsList>

              <TabsContent value="track" className="space-y-6">
              <Card>
                  <CardHeader>
                    <CardTitle>Verifique o status da sua solicitação</CardTitle>
                    <CardDescription>
                      Informe seu e-mail ou nº de passaporte para consultar o progresso da sua aplicação.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Insira o e-mail ou nº de passaporte"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="h-10"
                          onKeyDown={(e) => e.key === "Enter" && handleConsulta()}
                        />
                      </div>
                      <Button className="gap-2" onClick={handleConsulta} disabled={isSearching}>
                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        Consultar
                      </Button>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {!error && resultado && (
                      <div className="mt-6 space-y-4">
                        <div className="rounded-lg border p-4 space-y-3">
                          <h2 className="text-xl font-bold tracking-tight mb-4">Solicitação</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Nome</p>
                              <p className="font-medium">{capitalizeWords(`${resultado.name} ${resultado.surname}`)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
                              <p className="font-medium">{resultado.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Nº de Passaporte</p>
                              <p className="font-medium">{resultado.passportNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Status da solicitação</p>
                              <div
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${traduzirStatus(resultado.status).color}`}
                              >
                                {traduzirStatus(resultado.status).label}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Data da Solicitação</p>
                              <p className="font-medium">{new Date(resultado.createdAt).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Última atualização</p>
                              <p className="font-medium">{new Date(resultado.updatedAt).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                          </div>
                          <hr />
                          <h2 className="text-xl font-bold tracking-tight mb-4">Pagamentos</h2>
                          <div className="flex">
                              {
                                resultado.payment.map(({payment}, index) => (
                                  <div className="p-4 border rounded-md bg-muted-foreground/10 space-y-2 min-w-3xs" key={index}>
                                    <div className="text-base font-bold">Tentativa #{index+1}</div>
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${traduzirStatusPagamento(payment.status).color}`}>
                                      {traduzirStatusPagamento(payment.status).label}
                                    </div>

                                    <div className="text-sm">
                                      <strong>Data:</strong> {new Date(payment.createdAt).toLocaleDateString("pt-BR")}
                                    </div>
                                    <div className="text-sm">
                                      <strong>Valor:</strong> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.transactionAmount)}
                                    </div>
                                    <div className="text-sm">
                                      <strong>Tipo de pagamento:</strong> {payment.paymentTypeId === 'pix' ? 'PIX' : 'Cartão de Crédito'}
                                    </div>
                                  </div>
                                ))
                              }
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="new" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ainda não preencheu sua solicitação?</CardTitle>
                    <CardDescription>
                      Preencha o formulário clicando no botão abaixo para iniciar seu processo.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/form">
                      <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 gap-2">
                        <FileText className="h-4 w-4" />
                        SOLICITAR AUTORIZAÇÃO
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 shadow-sm border border-green-100 dark:border-green-900 transition-colors">
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Informações importantes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-300">
                <li className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 text-xs">1</span>
                  </div>
                  <span>O tempo médio de processamento é de 72 horas úteis.</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 text-xs">2</span>
                  </div>
                  <span>Você receberá atualizações por e-mail sobre o status da sua solicitação.</span>
                </li>
                <li className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400 text-xs">3</span>
                  </div>
                  <span>Em caso de dúvidas, entre em contato com nosso suporte.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
