"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Comparison() {
  const [activeTab, setActiveTab] = useState<"eta" | "visto">("eta")

  return (
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Content */}
        <div className="space-y-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Visto <span className="text-blue-600">vs</span> ETA
          </motion.h1>

          <motion.div
            className="space-y-4 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              A Autorização Eletrônica de Viagem do Reino Unido não é um visto, mas uma autorização especial de entrada para cidadãos de países específicos isentos de visto. Ao contrário do visto de visitante padrão, que é necessário para uma ampla gama de nacionalidades e normalmente envolve um processo de solicitação detalhado, incluindo etapas off-line, o ETA oferece um método de solicitação eficiente e totalmente on-line.
            </p>
            <p>
              Outra diferença entre o visto de visitante padrão do Reino Unido e o ETA é sua validade e custos associados. O ETA Reino Unido permanece válido por até dois anos ou até que o passaporte ao qual está vinculado expire, permitindo múltiplas entradas no Reino Unido para estadias de até seis meses cada. Em contraste, o visto de visitante padrão é adaptado para várias durações com base no tipo de visto e normalmente permite múltiplas entradas. Notavelmente, o ETA é econômico em comparação com as diversas taxas exigidas para diferentes tipos de vistos de visitante.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("eta")}
              className={cn(
                "py-2 px-4 font-medium text-sm transition-colors relative",
                activeTab === "eta" ? "text-blue-600" : "text-slate-500 hover:text-slate-700",
              )}
            >
              Autorização Eletrônica - ETA
              {activeTab === "eta" && (
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="activeTab" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("visto")}
              className={cn(
                "py-2 px-4 font-medium text-sm transition-colors relative",
                activeTab === "visto" ? "text-blue-600" : "text-slate-500 hover:text-slate-700",
              )}
            >
              Visto
              {activeTab === "visto" && (
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" layoutId="activeTab" />
              )}
            </button>
          </div>

          {/* Tab content */}
          <div className="min-h-[300px]">
            {activeTab === "eta" && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-md mb-4">
                  Autorização Eletrônica - ETA
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Método de inscrição totalmente online.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Processo de inscrição simples e otimizado.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Válido por até dois anos.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mais econômico que os vistos tradicionais.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Permite múltiplas entradas para estadias de até seis meses cada.</span>
                  </li>
                </ul>
              </motion.div>
            )}

            {activeTab === "visto" && (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-block bg-slate-700 text-white font-medium px-4 py-2 rounded-md mb-4">Visto</div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Inclui etapas offline.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Envolve um processo de inscrição detalhado.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>A duração varia de acordo com o tipo de visto.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Pode incluir taxas de visto adicionais.</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Necessário para uma ampla gama de nacionalidades.</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="relative">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <img
                src="/telephone.png"
                alt="Cabine telefônica britânica vermelha"
                className="w-full max-w-md mx-auto rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-lg"></div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-10 right-10 w-20 h-20 rounded-full bg-blue-100 z-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-red-100 z-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          {/* ETA document */}
          <motion.div
            className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg transform rotate-6 z-20 hidden md:block"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">UK</span>
              </div>
              <h3 className="text-sm text-black font-semibold">Electronic Travel Authorization</h3>
            </div>
            <div className="w-40 h-20 bg-gray-100 rounded flex flex-col justify-center items-center">
              <div className="text-xs text-gray-500">UK Electronic</div>
              <div className="text-xs text-gray-500">Travel Authorization</div>
              <div className="mt-2 w-20 h-2 bg-gray-300 rounded"></div>
              <div className="mt-1 w-16 h-2 bg-gray-300 rounded"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
