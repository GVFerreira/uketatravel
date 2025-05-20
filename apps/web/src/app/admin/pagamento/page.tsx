import PaymentComponent from "./payment-component"

export default function Payments() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Pagamentos</h1>
      </div>
      <div className="border shadow-sm rounded-lg py-12">
        <PaymentComponent />
      </div>
    </main>
    )
}