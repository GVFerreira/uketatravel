"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { countries } from './countries-list'
import { saveQuestions } from "../action"
import { useState } from "react"

export const formSchema = z.object({
  hasOtherNationality: z.enum(["true", "false"]),
  otherNationality: z.string().transform((val) => val?.trim() || undefined).optional(),

  hasOccupation: z.enum(["true", "false"]),
  occupation: z.string().transform((val) => val?.trim() || undefined).optional(),

  hasCriminalConviction: z.enum(["true", "false"]),
  crimeHasBeenConvicted: z.string().optional().optional(),
  countryCrimeHasBeenConvicted: z.string().optional(),
  hasCriminalConvictionLastYear: z.enum(["true", "false"]).optional(),
  convictedMoreThanOneYear: z.enum(["true", "false"]).optional(),

  hasEverConvictedMoreThanOneYear: z.enum(["true", "false"]).optional(),
  crimeConvictedMoreThanOneYear: z.string().optional(),
  countryConvictedMoreThanOneYear: z.string().optional(),
  initialDateConvictedMoreThanOneYear: z.string().optional(),
  endDateConvictedMoreThanOneYear: z.string().optional(),

  involvedIn: z.enum(["true", "false"]),
  whichSituationWasInvolvedIn: z.array(z.string()).optional(),
})
.superRefine((data, ctx) => {
  // Outras nacionalidades
  if (data.hasOtherNationality === "true" && !data.otherNationality?.trim()) {
    ctx.addIssue({
      path: ["otherNationality"],
      message: "Digite uma nacionalidade válida.",
      code: "custom"
    })
  }

  // Ocupação
  if (data.hasOccupation === "true" && !data.occupation?.trim()) {
    ctx.addIssue({
      path: ["occupation"],
      message: "Digite sua ocupação.",
      code: "custom"
    })
  }

  // Condenação criminal
  if (data.hasCriminalConviction === "true") {
    if (!data.crimeHasBeenConvicted?.trim()) {
      ctx.addIssue({
        path: ["crimeHasBeenConvicted"],
        message: "Descreva o crime pelo qual foi condenado.",
        code: "custom"
      })
    }

    if (!data.countryCrimeHasBeenConvicted?.trim()) {
      ctx.addIssue({
        path: ["countryCrimeHasBeenConvicted"],
        message: "Informe o país da condenação.",
        code: "custom"
      })
    }

    if (!data.hasCriminalConvictionLastYear) {
      ctx.addIssue({
        path: ["hasCriminalConvictionLastYear"],
        message: "Responda se a condenação foi nos últimos 12 meses.",
        code: "custom"
      })
    }

    if (!data.convictedMoreThanOneYear) {
      ctx.addIssue({
        path: ["convictedMoreThanOneYear"],
        message: "Responda se a pena foi superior a 12 meses.",
        code: "custom"
      })
    }

    if (data.convictedMoreThanOneYear === "true") {
      if (!data.hasEverConvictedMoreThanOneYear) {
        ctx.addIssue({
          path: ["hasEverConvictedMoreThanOneYear"],
          message: "Informe se já foi condenado a mais de 12 meses.",
          code: "custom"
        })
      }

      if (data.hasEverConvictedMoreThanOneYear === "true") {
        if (!data.crimeConvictedMoreThanOneYear?.trim()) {
          ctx.addIssue({
            path: ["crimeConvictedMoreThanOneYear"],
            message: "Descreva o crime da condenação superior a 12 meses.",
            code: "custom"
          })
        }

        if (!data.countryConvictedMoreThanOneYear?.trim()) {
          ctx.addIssue({
            path: ["countryConvictedMoreThanOneYear"],
            message: "Informe o país dessa condenação.",
            code: "custom"
          })
        }

        if (!data.initialDateConvictedMoreThanOneYear?.trim()) {
          ctx.addIssue({
            path: ["initialDateConvictedMoreThanOneYear"],
            message: "Informe a data de início da condenação.",
            code: "custom"
          })
        }

        if (!data.endDateConvictedMoreThanOneYear?.trim()) {
          ctx.addIssue({
            path: ["endDateConvictedMoreThanOneYear"],
            message: "Informe a data de término da condenação.",
            code: "custom"
          })
        }
      }
    }
  }

  // Envolvimento em situações
  if (data.involvedIn === "true") {
    if (!data.whichSituationWasInvolvedIn || data.whichSituationWasInvolvedIn.length === 0) {
      ctx.addIssue({
        path: ["whichSituationWasInvolvedIn"],
        message: "Se marcou 'Sim', selecione pelo menos uma situação.",
        code: "custom"
      })
    }
  }
})

const situations = [
  {
    id: "war-crimes",
    label: "Crimes de guerra",
    description: "Inclui genocídio ou crimes contra a humanidade."
  },
  {
    id: "terrorism",
    label: "Terrorismo",
    description: "Inclui apoio ou participação em grupos terroristas."
  },
  {
    id: "extremism",
    label: "Extremismo",
    description: "Inclui apoio a grupos extremistas ou expressão de opiniões extremistas."
  }
]
type Props = {
  onSuccess: () => void
}

export function Questions({ onSuccess }: Props) {
  const [openNationality, setOpenNationality] = useState(false)
  function handleNationality(value: string) { setOpenNationality(value === "true") }

  const [openOcuppation, setOpenOccupation] = useState(false)
  function handleOccupation(value: string) { setOpenOccupation(value === "true") }

  const [openHasCriminalConviction, setOpenHasCriminalConviction] = useState(false)
  function handleHasCriminalConviction(value: string) { setOpenHasCriminalConviction(value === "true") }

  const [openConvictedMoreThanOneYear, setOpenConvictedMoreThanOneYear] = useState(false)
  function handleConvictedMoreThanOneYear(value: string) { setOpenConvictedMoreThanOneYear(value === "true") }

  const [openSpecificSituations, setOpenSpecificSituations] = useState(false)
  function handleSpecificSituations(value: string) { setOpenSpecificSituations(value === "true") }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      otherNationality: "",
      occupation: "",
      crimeHasBeenConvicted: "",
      countryCrimeHasBeenConvicted: "",
      crimeConvictedMoreThanOneYear: "",
      countryConvictedMoreThanOneYear: "",
      initialDateConvictedMoreThanOneYear: "",
      endDateConvictedMoreThanOneYear: "",
      whichSituationWasInvolvedIn: []
    },
  })
 
  async function onSubmit(questions: z.infer<typeof formSchema>) {
    try {
      const solicitationId = localStorage.getItem('solicitation_id')
      if (solicitationId) {
        await saveQuestions({solicitationId, ...questions})
        onSuccess()
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col space-y-10 md:w-1/2">
          {/* Nationality */}
          <FormField
            control={form.control}
            name="hasOtherNationality"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Você possui outra nacionalidade?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleNationality(value)
                    }}                  
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="true"/>
                      </FormControl>
                      <FormLabel className="font-normal">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            openNationality && (
              <FormField
                control={form.control}
                name="otherNationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nacionalidades</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Liste a sua nacioliadade adicional. Se houver mais de uma, separe-as por vírgula. Ex.: Português, Espanhol, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          {/* Occupation */}
          <FormField
            control={form.control}
            name="hasOccupation"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Você trabalha atualmente?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleOccupation(value)
                    }}  
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            openOcuppation && (
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual sua ocupação no emprego atual?</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Se houver mais de uma ocupação, separe-as por vírgula. Ex.: Médico, Advogado, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          <hr />

          <FormField
            control={form.control}
            name="hasCriminalConviction"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Você já teve uma condenação criminal?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) =>{
                      field.onChange(value)
                      handleHasCriminalConviction(value)
                    }}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <div className="text-sm text-muted-foreground">
                  Inclua condenações em qualquer país. Não é necessário nos informar sobre as seguintes condenações:
                  <ul className="list-disc pl-4">
                    <li>Condenações por atividades legais no Reino Unido, como, por exemplo, filiação sindical ou relacionamentos entre pessoas do mesmo sexo</li>
                  </ul>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            openHasCriminalConviction && (
              <>
                <FormField
                  control={form.control}
                  name="crimeHasBeenConvicted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crime pelo qual você foi condenado.</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Descreva brevemente o crime. Se você teve outras condenações criminais nos últimos 12 meses, pode nos contar sobre elas posteriormente.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="countryConvictedMoreThanOneYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País da condenação</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o país" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            countries.map((country, index) => (
                              <SelectItem key={index} value={country.nome_pais}>{country.nome_pais} ({country.sigla})</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="convictedMoreThanOneYear"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Você foi condenado a mais de 12 meses de prisão?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleConvictedMoreThanOneYear(value)
                          }}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-1">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Sim
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-1">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Não
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {
                  openConvictedMoreThanOneYear && (
                    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
                      <FormField
                        control={form.control}
                        name="initialDateConvictedMoreThanOneYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de início da condenação</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDateConvictedMoreThanOneYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de término da condenação</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )
                }
              </>
            )
          }

          <hr /> 

          <FormField
            control={form.control}
            name="involvedIn"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Você já esteve envolvido ou é suspeito de alguma das seguintes situações?</FormLabel>
                <div className="text-sm text-muted-foreground">
                  <ul className="list-disc pl-4">
                    <li>Crimes de guerra, genocídio ou crimes contra a humanidade</li>
                    <li>Terrorismo, incluindo apoio ou participação em grupos terroristas</li>
                    <li>Apoio a grupos extremistas ou expressão de opiniões extremistas</li>
                  </ul>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      handleSpecificSituations(value)
                    }}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Sim
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-1">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Não
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            openSpecificSituations && (
              <FormField
                control={form.control}
                name="whichSituationWasInvolvedIn"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Em quais destas situações você se envolveu?</FormLabel>
                      <FormDescription>
                        Selecione todas as opções aplicáveis.
                      </FormDescription>
                    </div>
                    <div className="space-y-4">
                      {
                        situations.map((situation) => (
                          <FormField
                            key={situation.id}
                            control={form.control}
                            name="whichSituationWasInvolvedIn"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={situation.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(situation.id) ?? false}
                                      onCheckedChange={(checked) => {
                                        const newValue = checked
                                          ? [...(field.value || []), situation.id]
                                          : (field.value || []).filter((value) => value !== situation.id)
                                      
                                        field.onChange(newValue)
                                      }}
                                    />
                                  </FormControl>
                                  <div className="w-full flex flex-col">
                                    <FormLabel className="font-normal">
                                      {situation.label}
                                    </FormLabel>
                                    <FormDescription>
                                      {situation.description}
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))
                      }
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

        </div>
        <Button type="submit">Próximo</Button>
      </form>
    </Form>
  )
}
