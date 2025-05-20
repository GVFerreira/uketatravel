'use client'

import { Check, IdCard, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { analyzePassport, savePassport } from "../action"

type Props = {
  onSuccess: () => void
}

export function Passport({ onSuccess }: Props) {
  const MAX_FILE_SIZE_MB = 4
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<string[]>([])

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError([`A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`])
        setImageSrc(null)
        return
      }

      setError([])

      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError([`A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`])
        setImageSrc(null)
        return
      }

      setError([])

      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => event.preventDefault()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const solicitationId = localStorage.getItem('solicitation_id')

    if(imageSrc) {
      const analyzePassportResponse = await analyzePassport(imageSrc)
      if(analyzePassportResponse.errors.length > 0) {
        setError(analyzePassportResponse.errors)
      } else {
        if (solicitationId) {
          await savePassport({solicitationId, imageBase64: imageSrc})
          onSuccess()
        }
      }
    }
    
  }

  return (
    <>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Requisitos para a imagem do seu passaporte.</h3>
        <p>A imagem deve ser:</p>
        <ul className="list-disc pl-4">
          <li>inalterada por efeitos ou filtros</li>
          <li>original, não uma captura de tela ou fotocópia</li>
          <li>de um passaporte físico, não um passaporte digital</li>
          <li>colorida</li>
          <li>horizontal (paisagem)</li>
          <li>um arquivo jpg ou jpeg</li>
        </ul>
      </div>
      <hr/>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">A imagem do seu passaporte deve seguir os seguintes padrões.</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8">
          <div>
            <Image
              src="/assets/passport-clear.jpeg"
              className="w-10/12 md:w-08/12 mx-auto"
              width={200}
              height={143}
              alt={"Passaporte padrão"}
            />
            <p className="flex gap-1 items-center justify-center">Imagem com clareza e foco <Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/passport-blur.png"
              className="w-10/12 md:w-08/12 mx-auto"
              width={200}
              height={143}
              alt={"Passaporte sem foco"}
            />
            <p className="flex gap-1 items-center justify-center">Imagem sem clareza e foco <X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/passport-no-lights.jpeg"
              className="w-10/12 md:w-08/12 mx-auto"
              width={200}
              height={143}
              alt={"Passaporte sem reflexos"}
            />
            <p className="flex gap-1 items-center justify-center">Imagem sem brilho <Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/passport-glare.png"
              className="w-10/12 md:w-08/12 mx-auto"
              width={200}
              height={143}
              alt={"Passaporte com reflexos"}
            />
            <p className="flex gap-1 items-center justify-center">Imagem com brilho e reflexos <X className="text-red-400 size-6"/></p>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit} className="space-y-2">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Faça o envio da imagem do seu passaporte seguindo os requisitos acima.</h3>
          <div 
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dotted border-gray-500 hover:cursor-pointer bg-nzwhite rounded-md"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
              <IdCard className="size-12" />
              <span className="mt-2 text-muted-foreground">Clique ou arraste a imagem aqui.</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
          </div>
          {
            imageSrc && (
              <div className="w-full flex flex-col items-center gap-2 mt-4">
                <p className="font-bold">Imagem enviada:</p>
                <Image
                  src={imageSrc}
                  alt="Preview da imagem"
                  className="md:w-1/2 w-full aspect-[10/7] object-cover border border-muted-foreground"
                  width={1000}
                  height={700}
                />
              </div>
            )
          }
          {
            error.length > 0 && (
              <div className="w-full text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md">
                <strong className="text-lg font-bold">Alertas:</strong>
                <ul className="mt-2 list-disc pl-5">
                  {error.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )
          }
          <div className="flex md:justify-end mt-8">
            <Button disabled={imageSrc === null}>Próximo</Button>  
          </div>
        </form>
      </div>
    </>
  )
}
