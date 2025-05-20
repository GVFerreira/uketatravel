"use client"

import { ChevronRight, Check, Clock, Shield, MessageSquare, TextCursorInput, BadgeCheck, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Header from "./_components/header"
import Footer from "./_components/footer"
import Countries from "./_components/countries"
import Testemonial from "./_components/testemonial"
import FAQuestions from "./_components/faq"
import Comparison from "./_components/comparsion"
import UKEtaGuide from "./_components/uk-eta-guide"
import Link from "next/link"

export default function Home() {
  const howItWorks = [
    {
      step: 1,
      title: "Compartilhe seus detalhes",
      description: "Envie suas informações para obter esclarecimentos sobre os requisitos de inscrição e elegibilidade.",
      // icon: "📝",
      icon: <TextCursorInput className="size-12"/>
    },
    {
      step: 2,
      title: "Acesse a orientação",
      description: "Receba instruções passo a passo para garantir um processo de inscrição tranquilo e preciso.",
      icon: <BadgeCheck className="size-12"/> ,
    },
    {
      step: 3,
      title: "Site oficial do governo do Reino Unido",
      description: "Finalize sua solicitação enviando-a diretamente pela plataforma autorizada.",
      icon: <MailCheck className="size-12" />,
    },
  ]

  const allBenefits = [
    {
      bg: "uketa_paper.webp",
      title: "Expertise em ETA",
      description: "Nossos especialistas verificam se sua aplicação está livre de erros antes do envio ao governo",
      icon: <Shield className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
    },
    {
      bg: "clock.webp",
      title: "Tempo de processamento",
      description: "A maioria das aplicações são retornadas em até 72 horas úteis.",
      icon: <Clock className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
    },
    {
      bg: "support.png",
      title: "Suporte ao cliente",
      description: "Obtenha assistência a qualquer momento através do nosso time de atendimento.",
      icon: <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-500" />,
    }
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 dark:to-transparent">
          <div
            className="container shadow-2xl rounded-3xl md:pt-16 md:pb-56 flex flex-col items-center text-center mx-auto"
            style={{background: "url(/backgrounds/teste.png) center center no-repeat", backgroundSize: "cover", backgroundPositionY: "0px"}}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Aplique para o Reino Unido ETA
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Brasileiros precisam solicitar a Autorização Eletrônica de Viagem (ETA) para o Reino Unido <b>a partir de 8 de janeiro de 2025</b>.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/form">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-lg px-8"
                >
                  Inicie sua aplicação <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#eligibility">
                <Button size="lg" variant="outline" className="text-lg">
                  Verifique sua elegibilidade
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span className="text-black dark:text-white">Suporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span className="text-black dark:text-white">Taxa de aprovação 98%</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                <span className="text-black dark:text-white">Processo seguro</span>
              </div>
            </div>
          </div>
        </section>

        {/* Electronic Travel Authorization vs Traditional Visa */}
        <section id="eta-vs-visa" className="py-20">
          <div className="container mx-auto">
            <Comparison />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Como solicitar o ETA?</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              O processo de solicitação de ETA do Reino Unido é muito direto e pode ser concluído on-line. Cidadãos elegíveis podem finalizar rapidamente sua solicitação em instantes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center p-6 rounded-lg  shadow-lg hover:shadow-md transition-shadow bg-card"
                >
                  <div className="flex items-center justify-center rounded-full p-4 bg-blue-100 dark:bg-blue-950/50 text-2xl mb-4">
                    {item.icon}
                  </div>
                  <div className="bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/form">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                >
                  Inicie sua aplicação agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Eligibility Section */}
        <section id="eligibility" className="py-20 bg-background">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Quem precisa de um ETA do Reino Unido?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A Autorização Eletrônica de Viagem (ETA) do Reino Unido está sendo implementada em etapas. Atualmente, os seguintes países são obrigados a solicitar com antecedência antes de viajar para o Reino Unido. 
                </p>
                <Countries />
              </div>
              <div className="bg-muted shadow-xl p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Requerimentos do ETA</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-1" />
                    <span>Passaporte válido (recomendável com pelo menos 2 anos de validade)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-1" />
                    <span>Informações pessoais (nome, nacionalidade, etc.)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-1" />
                    <span>Detalhes de contato (e-mail)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-1" />
                    <span>Foto pessoal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mt-1" />
                    <span>Método de pagamento válido</span>
                  </li>
                </ul>
                <Image src="/passport.webp" width={800} height={100} alt="Passaporte" className="w-10/12 mx-auto mt-8 rounded-3xl"/>
                {/* <div className="mt-6 p-4 bg-card rounded border border-blue-200 dark:border-blue-950">
                  <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Important Note:</h4>
                  <p className="text-sm text-muted-foreground">
                    The UK ETA is typically valid for multiple entries over a 2-year period or until your passport
                    expires, whichever comes first.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* ETA Guide */}
        <section id="guide" className="py-20">
          <div className="container mx-auto">
            <UKEtaGuide />
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Por que nos escolher?</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Nós fazemos o processo para que sua aplicação ao ETA do Reino Unido seja simples, rápida e sem preocupações.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allBenefits.map((item, index) => (
                <Card
                  key={index}
                  className="shadow-lg hover:shadow-xl transition-shadow md:min-h-96"
                  style={{background: `url(/backgrounds/${item.bg}) bottom right no-repeat`, backgroundSize: "320px"}}
                >
                  <CardContent className="p-6">
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">O que nossos clientes dizem</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Se junte a milhares de viajantes que usaram nossos serviços.
              </p>
            </div>

            <Testemonial />

            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mr-2" />
                <span className="font-medium">10,000+ Aplicações processadas</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mr-2" />
                <span className="font-medium">98% Satisfação de cliente</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-blue-600 dark:text-blue-500 mr-2" />
                <span className="font-medium">4.8/5 Média de avaliação</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div
            className="container shadow-2xl max-w-6xl rounded-3xl md:pt-16 md:pb-56 flex flex-col items-center text-center mx-auto" 
            style={{background: "url(/backgrounds/footer.webp) bottom center no-repeat", backgroundSize: "cover"}}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Está pronto para solicitar sua ETA?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Inicie sua aplicação agora mesmo com confiança. Nossos especialistas estão prontos para te auxiliar em todo o processo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/form">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-lg px-8"
                >
                  Inicie sua aplicação <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section> 

        {/* Trust Signals */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">10k+</div>
                <div className="text-muted-foreground">Aplicações processadas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">98%</div>
                <div className="text-muted-foreground">Taxa de aprovação</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-500 mb-2">4.8/5</div>
                <div className="text-muted-foreground">Avaliações de clientes</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Perguntas frequentes</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Encontre aqui as respostas para suas dúvidas sobre o ETA do Reino Unido.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
             <FAQuestions />
            </div>

            <div className="mt-12 text-center">
              <Button variant="link" className="bg-card">
                <a href="/contato">Continua com dúvidas?</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
