'use client'

import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"

import type { GetPaymentsResponse } from "./actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export default function PaymentsTable({ data }: { data: GetPaymentsResponse[]}) {
  const [selectedPayment, setSelectedPayment] = useState(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState(1)
  const [filteredPayments, setFilteredPayments] = useState<GetPaymentsResponse[] | []>([])

  const router = useRouter()

  useEffect(() => {
    let results = data
    
    if (search) {
      results = results.filter(payment =>
        payment.idClient.toLowerCase().includes(search.toLowerCase()) ||
        payment.idOrder.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filtro de status e pagamento
    if (statusFilter) {
      results = results.filter(payment => payment.status === statusFilter)
    }

    // Ordenação
    results = results.sort((a, b) => 
      sortOrder === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Paginação
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    setFilteredPayments(results.slice(startIndex, endIndex))
  }, [data, search, statusFilter, paymentFilter, sortOrder, limit, page])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const handleStatusFilter = (option: any) => setStatusFilter(option ? option.value : null)
  const handlePaymentFilter = (option: any) => setPaymentFilter(option ? option.value : null)
  const toggleSortOrder = () => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  const handleLimitChange = (option: any) => setLimit(option.value)

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
    <div className="px-8 space-y-12">
      {/* FILTERS, SORTING AND PAGINATION */}
      <div className="grid grid-cols-5 gap-12">
        <div className="flex flex-col space-y-2 items-start">
          <Label>
            Busque um pagamento:
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-foreground rounded-full text-white dark:text-black size-4">?</TooltipTrigger>
                <TooltipContent>
                  <p>Consulte pelo ID do cliente Appmax</p>
                  <p>Consulte pelo ID do pedido Appmax</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          </Label>
          <Input className="bg-white w-full" value={search} onChange={handleSearchChange} />
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Status de pagamento:</Label>
          {/* <Select
            options={[
              { value: "Pago", label: "Pago"},
              { value: "Pendente", label: "Pendente"},
              { value: "Cancelado", label: "Cancelado"}
            ]}
            placeholder="Filtrar pagamento"
            onChange={handlePaymentFilter}
          /> */}
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Limite por página</Label>
          {/* <Select
            options={[
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" }
            ]}
            placeholder="Limite por página"
            defaultValue={{ value: 20, label: "20" }}
            onChange={handleLimitChange}
          /> */}
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Ordenação:</Label>
          <Button onClick={toggleSortOrder} className="">
            {sortOrder === 'asc' ? 'Recente -> Antigo' : 'Antigo -> Recente'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPayments.map((payment) => (
          <div className="p-4 border rounded-md bg-muted-foreground/10 space-y-2 min-w-3xs" key={payment.id}>
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
            <hr />
            <div>
              {
                payment.solicitations.map((customer, index) => (
                  <p key={index}>
                    {capitalizeWords(`${customer.solicitations.name} ${customer.solicitations.surname}`)}
                  </p>
                ))
              }
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</Button>
        <p>Página {page}</p>
        <Button disabled={filteredPayments.length < limit} onClick={() => setPage(page + 1)}>Próxima</Button>
      </div>
    </div>
  )
}
