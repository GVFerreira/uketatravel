
export default async function Admin() {

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col items-start">
        <h1 className="font-semibold text-lg md:text-2xl">Painel administrativo - UK ETA Travel</h1>
        <p className="text-md md:text-lg">Informações sensíveis</p>
      </div>
      <div className="grid grid-cols-2 gap-20">
        <div className="w-full">
          <h3 className="font-semibold text-sm mb-2 md:text-md">Leads</h3>
          {/* <LeadsTable data={leads}/> */}
        </div>
        <div className="w-full">
          <h3 className="font-semibold text-sm mb-2 md:text-md">Newsletter</h3>
          {/* <NewsletterTable data={newsletter}/> */}
        </div>
      </div>
    </main>
  )
}