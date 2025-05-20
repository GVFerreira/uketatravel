import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

export default function FAQuestions() {

  const faqs = [
    {
      question: "Existem isenções na obtenção de uma ETA para viajar para o Reino Unido?",
      answer: "Sim, cidadãos de outros países isentos de visto, como Canadá, Austrália, países da UE e Estados Unidos, atualmente não precisam de um ETA, mas podem ser obrigados a solicitar um no futuro. Indivíduos com um visto válido, permissão para viver, trabalhar ou estudar no Reino Unido, ou aqueles que possuem um passaporte britânico ou irlandês também estão isentos."
    },
    {
      question: "O que posso fazer no Reino Unido enquanto tenho um ETA?",
      answer: "Um ETA é adequado para vários propósitos, incluindo turismo, visita a familiares e amigos, negócios, estudos de curta duração (até 6 meses), concessões para Trabalhadores Criativos (até 3 meses), Compromissos Remunerados Permitidos (até 1 mês) e trânsito pelo Reino Unido."
    },
    {
      question: "Por quanto tempo o ETA do Reino Unido é válido?",
      answer: "O ETA é válido por dois anos e permite estadias com base na finalidade específica, variando de até 6 meses para visitas gerais a durações mais curtas para trabalho criativo ou compromissos remunerados permitidos."
    },
    {
      question: "Como cidadão da UE, é necessário obter uma ETA para minha viagem a Londres?",
      answer: "Atualmente, cidadãos da UE não precisam de uma ETA. No entanto, espera-se que a ETA do Reino Unido para cidadãos da UE se torne um pré-requisito para viajantes para a Inglaterra, Escócia, País de Gales e Irlanda do Norte.​"
    },
    {
      question: "O que é ETA Visa UK? É um visto eletrônico?",
      answer: "O ETA do Reino Unido é uma autorização eletrônica de viagem, servindo como um pré-requisito necessário para a entrada de cidadãos de países que estão isentos de obter um visto do Reino Unido, não um e-visa do Reino Unido. Isso difere do eVisa do Reino Unido, que é um registro online detalhando o status de imigração de um viajante e as condições de sua permissão para entrar ou permanecer no Reino Unido."
    },
    {
      question: "A WIS DIGITAL é responsável pela emissão do ETA do Reino Unido?",
      answer: "Não! A WIS DIGITAL é uma empresa privada e uma agência de viagens registrada, devidamente certificada pelo Ministério do Turismo – Cadastur, conforme evidenciado pela certificação disponível neste link. Entre outros serviços, auxiliamos nossos clientes com a emissão e renovação de ETAs para o Reino Unido. Nosso serviço consiste em organizar e revisar documentação, processar pagamentos de taxas e agendar consultas para emissão de passaporte. Supervisionamos todas as etapas necessárias para garantir um processo rápido e eficiente para nossos clientes."
    },
    {
      question: "Esta atividade é legal?",
      answer: "Sim! O negócio de agência de viagens é integralmente regulado pela Lei 11.771/2008 e Lei 12.974/2014. LEI Nº 11.771, DE 17 DE SETEMBRO DE 2008 Artigo 27. Entende-se por agência de viagens a pessoa jurídica que exerce atividade econômica de intermediação remunerada entre prestadores e consumidores de serviços turísticos ou a prestação direta desses serviços. § 4º. São atividades complementares das agências de viagens a intermediação ou execução dos seguintes serviços: I – Obtenção de passaportes, vistos ou quaisquer outros documentos necessários à viagem. LEI Nº 12.974, DE 15 DE MAIO DE 2014 Artigo 4º. As agências de viagens poderão, ainda, sem exclusividade, exercer as seguintes atividades: I – Obtenção e legalização de documentos de viagem para viajantes. V – Intermediação remunerada na reserva e contratação de hospedagem e locação de veículos. Art. 8º São prerrogativas das agências de viagens registradas nos termos desta lei: II – Direito de receber remuneração pelos serviços prestados."
    }
  ]

  return (
    <Accordion type="single" collapsible className="w-full">
      { faqs.map((item, index) => (
          <AccordionItem key={index} value={`Questão ${index}`}>
            <AccordionTrigger className="scroll-m-20 text-xl font-semibold tracking-tight text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
          </AccordionItem>
      ))}
    </Accordion>
  )
}