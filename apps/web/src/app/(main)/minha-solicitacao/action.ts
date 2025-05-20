'use server'

import { api } from "@/http/api-client"

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

export async function solicitationPublicInfo(query: string) {
  const result = await api.post<publicInfo>('solicitation/public-info', {
    json: {
      query
    },
  }).json()

  return result
}