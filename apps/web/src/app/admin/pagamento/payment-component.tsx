import { getPayments } from "./actions"
import PaymentsTable from "./payment-table"

export default async function PaymentComponent() {
  const payments = await getPayments()

  return (
    <div>
      <PaymentsTable data={payments} />
    </div>
  )
}