import { Check, SquareUser, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { analyzePhoto, savePhoto } from "../action"


type Props = {
  onSuccess: () => void
}

export function Photo({ onSuccess }: Props) {
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
      const analyzePassportResponse = await analyzePhoto(imageSrc)
      if(analyzePassportResponse.errors.length > 0) {
        setError(analyzePassportResponse.errors)
      } else {
        if (solicitationId) {
          await savePhoto({solicitationId, imageBase64: imageSrc})
          onSuccess()
        }
      }
    }  
  }

  return (
    <>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Requisitos para a sua foto pessoal.</h3>
        <p>A foto deve ser:</p>
        <ul className="list-disc pl-4">
          <li>diferente daquela do seu passaporte</li>
          <li>tirada recentemente (não mais de 3 meses)</li>
          <li>vertical (retrato)</li>
          <li>um arquivo jpg ou jpeg</li>
        </ul>
        <p>Você não deve:</p>
        <ul className="list-disc pl-4">
          <li>enviar uma foto de outra foto</li>
          <li>usar quaisquer efeitos ou filtros</li>
        </ul>
      </div>
      <hr/>
      <div className="space-y-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">A sua foto deve seguir os seguintes padrões.</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-4">
          <div>
            <Image
              src="/assets/photo-background-plain.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Fundo liso e claro"}
            />
            <p className="flex gap-1 items-center justify-center">Fundo liso e claro <Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-headwear-religious.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Vestimenta religiosa"}
            />
            <p className="flex gap-1 items-center justify-center">Vestimenta religiosa<Check className="text-green-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-background-object.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Vestimenta religiosa"}
            />
            <p className="flex gap-1 items-center justify-center">Objetos ao fundo<X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-background-shadow.jpeg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Sombras atrás da cabeça"}
            />
            <p className="flex gap-1 items-center justify-center">Sombra atrás da cabeça <X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-headwear-hair.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Acessórios na cabeça ou rosto"}
            />
            <p className="flex gap-1 items-center justify-center">Acessórios na cabeça ou rosto <X className="text-red-400 size-6"/></p>
          </div>
          <div>
            <Image
              src="/assets/photo-glasses-covering.jpg"
              className="h-60 w-auto mx-auto"
              width={200}
              height={143}
              alt={"Sombras atrás da cabeça"}
            />
            <p className="flex gap-1 items-center justify-center">Óculos cobrindo os olhos <X className="text-red-400 size-6"/></p>
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
              <SquareUser className="size-12" />
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
                  className="md:w-1/3 w-full aspect-[3/4] object-cover border border-muted-foreground"
                  width={300}
                  height={400}
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
