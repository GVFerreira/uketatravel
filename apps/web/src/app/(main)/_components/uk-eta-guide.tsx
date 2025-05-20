"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  Users,
  GraduationCap,
  Palette,
  Plane,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

type ActivityType = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  image: string
}

export default function UKEtaGuide() {
  const [activeTab, setActiveTab] = useState<number>(1)

  const activities: ActivityType[] = [
    {
      id: 1,
      title: "Atividades comerciais de curto prazo",
      description:
        "Participar de reuniões, conferências, seminários e entrevistas de emprego. Negociar e assinar contratos ou acordos.",
      icon: <Briefcase className="h-6 w-6" />,
      image: "/backgrounds/keyboard.webp",
    },
    {
      id: 2,
      title: "Turismo ou visita a familiares e amigos",
      description:
        "Explorar atrações turísticas, participar de eventos culturais ou visitar amigos e familiares residentes no Reino Unido.",
      icon: <Users className="h-6 w-6" />,
      image: "/backgrounds/bigben.png",
    },
    {
      id: 3,
      title: "Fins acadêmicos",
      description:
        "Participar de conferências acadêmicas, realizar pesquisas de curto prazo ou participar de programas de intercâmbio educacional.",
      icon: <GraduationCap className="h-6 w-6" />,
      image: "/backgrounds/youngs.png",
    },
    {
      id: 4,
      title: "Trabalhadores criativos",
      description:
        "Realizar atividades criativas como fotografia, filmagem, apresentações artísticas ou participar de eventos culturais.",
      icon: <Palette className="h-6 w-6" />,
      image: "/backgrounds/worker.png",
    },
    {
      id: 5,
      title: "Trânsito pelo Reino Unido",
      description:
        "Passar pelo Reino Unido em trânsito para outro destino, com permanência máxima de 48 horas sem sair da área de trânsito.",
      icon: <Plane className="h-6 w-6" />,
      image: "/backgrounds/transit.webp",
    },
  ]

  return (
    <div className="container mx-auto rounded-2xl shadow-xl overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="p-8 md:p-12">
        <div className="max-w-3xl">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            O que posso fazer com o ETA do Reino Unido?
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-300 mb-8 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            O ETA do Reino Unido foi criado para permitir que viajantes qualificados tenham uma maneira conveniente de
            experimentar tudo o que o Reino Unido tem a oferecer. No entanto, há algumas diretrizes sobre o que o
            portador do ETA pode fazer.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[500px_1fr] gap-8 mt-8">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveTab(activity.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 text-left rounded-xl transition-all duration-200",
                  activeTab === activity.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-700 dark:hover:bg-slate-600 hover:bg-slate-100 text-slate-700 dark:text-slate-200",
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full shrink-0",
                    activeTab === activity.id ? "bg-white/20" : "bg-blue-100 dark:bg-slate-600",
                  )}
                >
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.title}</div>
                </div>
              </button>
            ))}
          </motion.div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {activities.map(
                (activity) =>
                  activeTab === activity.id && (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <div className="h-64 md:h-80 overflow-hidden relative">
                        <img
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          className="ml-auto w-1/2"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/78 to-transparent flex items-end">
                          <div className="p-6 text-white">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                                {activity.icon}
                              </div>
                              <h2 className="text-xl font-semibold">{activity.title}</h2>
                            </div>
                            <p className="text-sm">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-blue-600 font-medium mb-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            {activity.icon}
                          </div>
                          <h3 className="text-lg">O que você precisa saber:</h3>
                        </div>

                        <div className="space-y-3 text-slate-600">
                          {activity.id === 1 && (
                            <>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Você pode participar de reuniões de negócios, conferências e seminários.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Negociar e assinar contratos ou acordos comerciais.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Participar de entrevistas de emprego ou avaliações.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Você não pode trabalhar ou receber pagamento de empresas britânicas.</span>
                              </p>
                            </>
                          )}

                          {activity.id === 2 && (
                            <>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Você pode visitar atrações turísticas, museus e participar de tours.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Visitar amigos e familiares que residem no Reino Unido.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Participar de eventos culturais, esportivos ou festivais.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>A estadia máxima permitida é de até 6 meses por visita.</span>
                              </p>
                            </>
                          )}

                          {activity.id === 3 && (
                            <>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Participar de conferências acadêmicas e seminários.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Realizar pesquisas independentes de curto prazo.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Participar de programas de intercâmbio educacional de curta duração.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Para estudos formais de longa duração, é necessário um visto de estudante.</span>
                              </p>
                            </>
                          )}

                          {activity.id === 4 && (
                            <>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Realizar atividades criativas como fotografia e filmagem.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Participar de apresentações artísticas ou exposições.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Promover seu trabalho criativo em eventos culturais.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>
                                  Para trabalhos remunerados de longa duração, é necessário um visto específico.
                                </span>
                              </p>
                            </>
                          )}

                          {activity.id === 5 && (
                            <>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Passar pelo Reino Unido em trânsito para outro destino.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Permanência máxima de 48 horas em trânsito.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>Você não pode sair da área de trânsito do aeroporto em alguns casos.</span>
                              </p>
                              <p className="flex items-start gap-2">
                                <ChevronRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                <span>
                                  Verifique se você precisa de um visto de trânsito específico dependendo da sua
                                  nacionalidade.
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
