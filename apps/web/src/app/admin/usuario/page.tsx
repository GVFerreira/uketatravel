import AddUser from "./add-user"
import Users from "./users-table"

export default function Destino() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Usuários</h1>
        <AddUser />
      </div>
      <div className="border shadow-sm rounded-lg">
        <Users />
      </div>
    </main>
  )
}