import { getSolicitations } from "./actions"
import SolicitationsTable from "./solicitation-table"

export default async function SolicitationComponent() {
  const solicitations = await getSolicitations()

  return (
    <div>
      <SolicitationsTable data={solicitations} />
    </div>
  )
}