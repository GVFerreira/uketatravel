"use client"

import { useState } from "react"
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ProgressBar } from "./components/progress-bar"
import { Passport } from "./components/passport"
import { Photo } from "./components/photo"
import { Details } from "./components/details"
import { Questions } from "./components/questions"
import Header from "../_components/header"
import Footer from "../_components/footer"
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { name: "Detalhes",  number: 1 },
    { name: "Perguntas", number: 2 },
    { name: "Passaporte", number: 3 },
    { name: "Foto Pessoal", number: 4 },
  ]

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToCheckout = () => {
    router.replace('/checkout')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto py-12 px-4 md:px-6">
        <ProgressBar currentStep={currentStep} steps={steps} />
        <Card>
          <CardHeader>
            <CardTitle className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Passo {currentStep}: {steps[currentStep - 1].name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStep === 1 && <Details onSuccess={goToNextStep}/>}
              {currentStep === 2 && <Questions onSuccess={goToNextStep} />}
              {currentStep === 3 && <Passport onSuccess={goToNextStep}/>}
              {currentStep === 4 && <Photo onSuccess={goToCheckout}/>}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
