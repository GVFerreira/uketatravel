import { api } from "@/http/api-client"


export interface GetPaymentsResponse {
  id: string
  idClient: string
  idOrder: string
  transactionAmount: number
  transactionId: string
  docType: string
  docNumber: string
  status: string
  paymentTypeId: string
  qrCode: string
  qrCodeBase64: string
  createdAt: Date
  solicitations: {
    solicitations: {
      name: string
      surname: string
    }
  }[]
}

export async function getPayments() {
  const result = await api.get('payments').json<GetPaymentsResponse[]>()

  return result
}