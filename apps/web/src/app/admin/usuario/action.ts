import { api } from "@/http/api-client"

interface GetUsersResponse {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
  createdAt: Date
  updatedAt: Date
}

export async function getUsers() {
  const result = await api.get('get-users').json<GetUsersResponse[]>()
  
  return result
}