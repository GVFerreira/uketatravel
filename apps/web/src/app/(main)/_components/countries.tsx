type Country = {
  code: string
  name: string
}

type CountriesByContinent = {
  [continent: string]: Country[]
}

const countriesByContinent: CountriesByContinent = {
  "África": [
    { code: "BW", name: "Botsuana" },
    { code: "MU", name: "Maurício" },
    { code: "SC", name: "Seicheles" }
  ],
  "América": [
    { code: "AG", name: "Antígua e Barbuda" },
    { code: "AR", name: "Argentina" },
    { code: "BS", name: "Bahamas" },
    { code: "BB", name: "Barbados" },
    { code: "BZ", name: "Belize" },
    { code: "BR", name: "Brasil" },
    { code: "CA", name: "Canadá" },
    { code: "CL", name: "Chile" },
    { code: "CR", name: "Costa Rica" },
    { code: "GD", name: "Granada" },
    { code: "GT", name: "Guatemala" },
    { code: "GY", name: "Guiana" },
    { code: "MX", name: "México" },
    { code: "NI", name: "Nicarágua" },
    { code: "PA", name: "Panamá" },
    { code: "PY", name: "Paraguai" },
    { code: "PE", name: "Peru" },
    { code: "LC", name: "Santa Lúcia" },
    { code: "KN", name: "São Cristóvão e Neves" },
    { code: "VC", name: "São Vicente e Granadinas" },
    { code: "TT", name: "Trindade e Tobago" },
    { code: "US", name: "Estados Unidos" },
    { code: "UY", name: "Uruguai" }
  ],
  "Ásia": [
    { code: "BH", name: "Bahrein" },
    { code: "BN", name: "Brunei" },
    { code: "HK", name: "Hong Kong" },
    { code: "IL", name: "Israel" },
    { code: "JP", name: "Japão" },
    { code: "KW", name: "Kuwait" },
    { code: "MO", name: "Macau" },
    { code: "MY", name: "Malásia" },
    { code: "MV", name: "Maldivas" },
    { code: "OM", name: "Omã" },
    { code: "QA", name: "Catar" },
    { code: "SA", name: "Arábia Saudita" },
    { code: "SG", name: "Singapura" },
    { code: "KR", name: "Coreia do Sul" },
    { code: "TW", name: "Taiwan" },
    { code: "AE", name: "Emirados Árabes Unidos" }
  ],
  "Oceania": [
    { code: "AU", name: "Austrália" },
    { code: "KI", name: "Quiribati" },
    { code: "MH", name: "Ilhas Marshall" },
    { code: "FM", name: "Micronésia" },
    { code: "NR", name: "Nauru" },
    { code: "NZ", name: "Nova Zelândia" },
    { code: "PW", name: "Palau" },
    { code: "PG", name: "Papua-Nova Guiné" },
    { code: "WS", name: "Samoa" },
    { code: "SB", name: "Ilhas Salomão" },
    { code: "TO", name: "Tonga" },
    { code: "TV", name: "Tuvalu" }
  ]
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Countries () {
  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
      {Object.entries(countriesByContinent).map(([continent, countries]) => (
        <AccordionItem key={continent} value={continent}>
          <AccordionTrigger className="text-xl font-medium">
            {continent}
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {countries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-slate-100 dark:bg-slate-800 dark:border-slate-700 transition-colors"
                >
                  <div className="w-8 h-8 overflow-hidden rounded-full flex-shrink-0">
                    <img
                      src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                      alt={`Bandeira de ${country.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-100">
                    {country.name}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
