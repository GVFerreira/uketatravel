'use client'

import Logotype from "../../_components/logotype"

export default function FooterCKT () {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logotype />
            </div>
            <p className="text-gray-400 mb-4">
              Assistência profissional para a sua aplicação.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <p className="mb-2">
          uketatravel.com is a website owned by Wis Digital, a travel and tourism agency based in Brazil, licensed by CADASTUR of the Brazilian Ministry of Tourism.
          Important: uketatravel.com is a company specialized in providing assistance with applications for the UK ETA and other travel authorizations. We are not a law firm, we do not provide legal advice, we do not mediate the process and we do not submit applications on behalf of clients. Our service consists of verifying the information provided, identifying possible errors or omissions and guiding clients to correctly complete their application on the official website of the UK government (gov.uk). The ETA fee is USD 12.90, paid directly to the government, and our assistance fee is USD 47. We offer 24/7 customer support in your language to clarify any questions and ensure that your application is free of errors that may cause delays or refusals. If your request is denied despite our verification, we will refund the service fee in full, provided there have been no previous denials for the same traveler. For more information <a href="/termos-condicoes">click here</a>
          </p>
          <p>© {new Date().getFullYear()} UK ETA Travel. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}