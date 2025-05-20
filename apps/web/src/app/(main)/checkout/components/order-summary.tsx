import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OrderSummaryProps = {
  exchangeRate: number,
  dateExchangeRate: string
}

export function OrderSummary({ exchangeRate, dateExchangeRate }: OrderSummaryProps) {
  const date = new Date(dateExchangeRate)
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`

  const orderItems = [
    { id: 1, name: "Taxa do Governo da União Europeia", price: 12.9 },
    { id: 2, name: "Taxa de assistência", price: 47 },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)
  const USDtoBRL = exchangeRate  // API result
  const total = subtotal * USDtoBRL

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle>Resumo da compra</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="font-medium">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
            </div>
          ))}

          <hr />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p>Sub-total</p>
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' }).format(subtotal)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Cotação do dólar (USD)<br /><span className="text-xs text-muted-foreground">Data da cotação: {formattedDate}</span></p>
              <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(USDtoBRL)}</p>
            </div>
          </div>

          <hr />

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
