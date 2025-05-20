'use server'

import { api } from "@/http/api-client"

interface getCheckoutInfoResponse {
  cotacaoCompra: number
  cotacaoVenda: number
  dataHoraCotacao: string
}

export async function getCheckoutInfo() {
  const result = await api.get<getCheckoutInfoResponse>('checkout/get-info').json()
  return result
}

type CardPaymentProps = {
  cardDetails: {
    cardNumber: string
    cardHolderName: string
    CVV: string
    cpfNumber: string
    expiryMonth: string
    expiryYear: string
    installment: string
  }
  solicitationId: string
}

interface cardPayment {
  status: string
  id: string
  idClient: string
  idOrder: string
  transactionAmount: number
  transactionId: string
  docType: string
  docNumber: string
  paymentTypeId: string
  qrCode: string | null
  qrCodeBase64: string | null
  createdAt: Date
}

export async function cardPayment({ cardDetails, solicitationId }: CardPaymentProps) {
  const result = await api.post<cardPayment>('checkout/card-payment', {
    json: {
      cardDetails,
      solicitationId
    },
  }).json()

  return result
}

type PixPaymentProps = {
  pixDetails: {
    fullName: string
    cpfNumber: string
  }
  solicitationId: string
}

interface pixPayment {
  status: string
  id: string
  idClient: string
  idOrder: string
  transactionAmount: number
  transactionId: string
  docType: string
  docNumber: string
  paymentTypeId: string
  qrCode: string | null
  qrCodeBase64: string | null
  createdAt: Date
}

export async function pixPayment({ pixDetails, solicitationId }: PixPaymentProps) {
  const result = await api.post<pixPayment>('checkout/pix-payment', {
    json: {
      pixDetails,
      solicitationId
    },
  }).json()

  return result
}

export async function checkPixPayment(paymentId: string) {
  const result = await api.post<pixPayment>('checkout/check-pix-payment', {
    json: {
      paymentId
    },
  }).json()

  return result
}
