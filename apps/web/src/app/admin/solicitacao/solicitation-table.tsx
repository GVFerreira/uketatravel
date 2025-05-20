'use client'


import { useState, useEffect } from "react"

import type { GetSolicitationsResponse } from "./actions"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import Link from "next/link"
import { Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SolicitationsTable({ data }: { data: GetSolicitationsResponse[]}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [limit, setLimit] = useState(25)
  const [page, setPage] = useState(1)
  const [filteredSolicitations, setFilteredSolicitations] = useState<GetSolicitationsResponse[] | []>([])

  useEffect(() => {
    let results = data
    
    if (search) {
      results = results.filter(solicitation =>
        solicitation.email.toLowerCase().includes(search.toLowerCase()) ||
        solicitation.passportNumber.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filtro de status e pagamento
    if (statusFilter) {
      results = results.filter(solicitation => solicitation.status === statusFilter)
    }
    if (paymentFilter) {
      results = results.filter(solicitation => solicitation.payment[0].payment.status === paymentFilter)
    }

    // Ordenação
    results = results.sort((a, b) => 
      sortOrder === 'asc' 
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Paginação
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    setFilteredSolicitations(results.slice(startIndex, endIndex))
  }, [data, search, statusFilter, paymentFilter, sortOrder, limit, page])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
  const handleStatusFilter = (option: string | null) => setStatusFilter(option === 'all' ? null : option)
  const handlePaymentFilter = (option: string | null) => setPaymentFilter(option === 'all' ? null : option)
  const toggleSortOrder = () => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
  const handleLimitChange = (option: string | null) => setLimit(option ? parseInt(option) : 25)

  function capitalizeWords(str: string) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }  
  
  return (
    <div className="px-8 space-y-12">
      {/* FILTERS, SORTING AND PAGINATION */}
      <div className="grid grid-cols-5 gap-12">
        <div className="flex flex-col space-y-2 items-start">
          <div className="w-full flex gap-2">
            <Label>Busque uma solicitação:</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-foreground rounded-full text-white dark:text-black size-4 text-xs">?</TooltipTrigger>
                <TooltipContent>
                  <p>Busque pelo número do passaporte ou e-mail</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input className="w-full" value={search} onChange={handleSearchChange} placeholder="Nº do Passporte ou E-mail"/>
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <Label>Status da aplicação:</Label>
          <Select onValueChange={handleStatusFilter} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as solicitações</SelectItem>
              <SelectItem value="Solicitação em análise interna">Solicitação em análise interna</SelectItem>
              <SelectItem value="Recebido pelo Governo UK">Recebido pelo Governo UK</SelectItem>
              <SelectItem value="Aprovado">Aprovado</SelectItem>
              <SelectItem value="Recusado">Recusado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Status de pagamento:</Label>
          <Select onValueChange={handlePaymentFilter} defaultValue="all">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as solicitações</SelectItem>
              <SelectItem value="Aprovado">Aprovado</SelectItem>
              <SelectItem value="Negado">Negado</SelectItem>
              <SelectItem value="Falha ao gerar Pix">Falha ao gerar Pix</SelectItem>
              <SelectItem value="Pagamento pendente">Pagamento pendente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Limite por página:</Label>
          <Select onValueChange={handleLimitChange} defaultValue="25">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrar pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2 items-start">
          <Label>Ordenação:</Label>
          <Button onClick={toggleSortOrder} className="">
            {sortOrder === 'asc' ? 'Recente -> Antigo' : 'Antigo -> Recente'}
          </Button>
        </div>
      </div>

      <div>
        {filteredSolicitations.map((solicitation, index) => (
          <div key={index} className="border border-muted-foreground">
            <div className="flex justify-between items-center py-2 px-6 bg-muted">
              <h2 className="font-bold text-2xl">{capitalizeWords(`${solicitation.name} ${solicitation.surname}`)}</h2>
              <div className="text-right">
                <span className="text-sm">Criado: {new Date(solicitation.createdAt).toLocaleString("pt-br")}</span> <br />
                <span className="text-sm">Atualizado: {new Date(solicitation.updatedAt).toLocaleString("pt-br")}</span>
              </div>
            </div>
            <div className="bg-muted-foreground/10 flex flex-row justify-between items-center py-2 px-6">
              <div>
                { solicitation.profilePhotoUrl ?
                  <>
                    <Image src={`http://localhost:3000/${solicitation.profilePhotoUrl}`} width={300} height={300} alt={solicitation.name + solicitation.surname} className="w-full max-w-[100px] aspect-[3/4] object-cover max-h-xs border-2 border-gray-300" />
                  </>
                  :
                  <div className="flex max-w-[180px] w-full justify-center items-center aspect-[3/4] max-h-xs border-2 bg-gray-300">
                    <p className="text-center">Sem<br />imagem</p>
                  </div>
                }
              </div>
              <div className="px-8 w-full grid grid-cols-3">
                <div>
                  <p><b>Cód. acompanhamento:</b> </p>
                  <p><b>Número passaporte:</b> {solicitation.passportNumber}</p>
                </div>
                <div>
                  <p><b>E-mail:</b> {solicitation.email}</p>
                  <p><b>Telefone:</b> {solicitation.phone}</p>
                </div>
                <div>
                  <p><b>Status aplicação:</b> {solicitation.status}</p>
                  <p><b>Pagamento:</b> {solicitation.payment[0]?.payment.status ? solicitation.payment[0]?.payment.status : "Sem pagamento" }</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row justify-center flex-grow gap-6">
                  <Button className="bg-blue-500 hover:bg-blue-400 transition-all" asChild>
                    <Link href={`solicitacao/${solicitation.id}`} prefetch={false}>
                      <Eye className="size-6 text-white cursor-pointer" />
                    </Link>
                  </Button>
                  {/* <AlertDialog open={updateProcess?.id === visa.id} onOpenChange={() => setUpdateProcess(visa)}>
                    <AlertDialogTrigger asChild>
                      <Pencil className="size-6 text-yellow-500 cursor-pointer"/>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="p-0">
                      { updateProcess && (
                        <>
                          <AlertDialogHeader className="p-4 border-b">
                            <div className="flex justify-between items-center">
                              <AlertDialogTitle className="text-2xl font-bold">Gerenciar solicitação</AlertDialogTitle>
                              <Button variant="ghost" size="icon" onClick={() => setUpdateProcess(null)}>
                                <X className="h-6 w-6" />
                              </Button>
                            </div>
                          </AlertDialogHeader>
                          <p className="px-4"><b>Cliente: {updateProcess.name + " " + updateProcess.surname}</b></p>
                          <Tabs defaultValue="update">
                            <TabsList className="w-full">
                              <TabsTrigger value="update">Atualizar status</TabsTrigger>
                              <TabsTrigger value="email">Atualizar e-mail</TabsTrigger>
                              <TabsTrigger value="message">Enviar mensagem</TabsTrigger>
                            </TabsList>

                            <TabsContent value="update">
                              <UpdateStatus data={{
                                id: updateProcess.id,
                                name: updateProcess.name,
                                email: updateProcess.email,
                                codeETA: updateProcess.codeETA,
                                passportNumber: updateProcess.passportNumber,
                                statusETA: "",
                                attachment: ""
                              }}/>
                            </TabsContent>

                            <TabsContent value="email">
                              <UpdateEmail data={{id: updateProcess.id, email: updateProcess.email}}/>
                            </TabsContent>

                            <TabsContent value="message">
                              <SendMessage data={{id: updateProcess.id, message: ""}} />
                            </TabsContent>
                          </Tabs>
                        </>
                      )}
                      <AlertDialogDescription className="hidden">
                        <p>Modal para atualizacão de Informações</p>
                      </AlertDialogDescription>
                    </AlertDialogContent>
                  </AlertDialog>

                  <AlertDialog open={selectedVisa?.id === visa.id} onOpenChange={() => setSelectedVisa(visa)}>
                    <AlertDialogTrigger asChild>
                      <Eye className="size-6 text-blue-500 cursor-pointer" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-full w-full h-full overflow-y-auto p-0">
                      <div className="container mx-auto h-full flex flex-col">
                        <AlertDialogHeader className="py-6 border-b">
                          <div className="flex justify-between items-center">
                            <AlertDialogTitle className="text-2xl font-bold">Dados da solicitação</AlertDialogTitle>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedVisa(null)}>
                              <X className="h-6 w-6" />
                            </Button>
                          </div>
                        </AlertDialogHeader>
                        {selectedVisa && (
                          <div className="grid grid-cols-2 gap-16 flex-grow overflow-auto p-6">
                            <div className="space-y-6 max-w-2xl mx-auto">
                              <h3 className="text-lg font-bold">Informações do aplicante</h3>
                              { selectedVisa.imagePath ? 
                                <>
                                  <Image src={`${process.env.NEXT_PUBLIC_APP_URL}/${selectedVisa.imagePath}`} width={300} height={300} alt={selectedVisa.name + " " + selectedVisa.surname} className="w-[180px] aspect-[3/4] object-cover border-2 border-gray-300" />
                                  <Button>
                                    <a href={`${process.env.NEXT_PUBLIC_APP_URL}/${selectedVisa.imagePath}`} download>
                                      Download da imagem
                                    </a>
                                  </Button>
                                </>
                                :
                                <div className="w-[180px] flex justify-center items-center aspect-[3/4] border-2 bg-gray-300">
                                  <p>Sem imagem</p>
                                </div>
                              }
                              {
                                selectedVisa.attachmentPath && (
                                  <Button>
                                    <a href={selectedVisa.attachmentPath} download>
                                      Download do NZeTA
                                    </a>
                                  </Button>
                                )
                              }
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Nacionalidade do passaporte</Label>
                                  <Input id="name" value={selectedVisa.passportNationality} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="name">País emissor do passaporte</Label>
                                  <Input id="name" value={selectedVisa.passportNationality} readOnly />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="passport">Passaporte</Label>
                                  <Input id="passport" value={selectedVisa.passportNumber} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="passport">Validade do passaporte</Label>
                                  <Input id="passport" value={new Date(selectedVisa.passportExpiration).toLocaleDateString()} readOnly />
                                </div>
                              </div>
                              <hr />
                              <div className="space-y-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input id="name" value={selectedVisa.name} readOnly />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="name">Sobrenome</Label>
                                <Input id="name" value={selectedVisa.surname} readOnly />
                              </div>
                              <div>
                                <Label>Já possuiu um nome diferente?</Label>
                                <div className="mt-2">
                                  <RadioGroup
                                    className="flex flex-row gap-5"
                                    disabled
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="true"
                                        id="had-other-name-option-yes"
                                        checked={selectedVisa?.hadOtherName}
                                      />
                                      <Label htmlFor="had-other-name-option-yes">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="false"
                                        id="had-other-name-option-no"
                                        checked={!selectedVisa?.hadOtherName}
                                      />
                                      <Label htmlFor="had-other-name-option-no">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              {selectedVisa?.hadOtherName && selectedVisa?.otherName && (
                                <div>
                                  <Label htmlFor="user_othername">Insira seu outro nome completo</Label>
                                  <Input type="text" id="user_othername" className="md:w-1/2" value={selectedVisa.otherName} readOnly/>
                                </div>
                              )}
                              
                              <div>
                                <Label>Selecione seu gênero conforme consta em seu passaporte.</Label>
                                <div className="mt-2">
                                  <RadioGroup disabled>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="Masculino" id="user_gender-m" checked={selectedVisa?.gender === "Masculino"} />
                                      <Label htmlFor="user_gender-m">Masculino</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="Feminino" id="user_gender-f" checked={selectedVisa?.gender === "Feminino"} />
                                      <Label htmlFor="user_gender-f">Feminino</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="Gênero diverso" id="user_gender-d" checked={selectedVisa?.gender === "Gênero diverso"} />
                                      <Label htmlFor="user_gender-d">Gênero diverso</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="passport">Data de nascimento</Label>
                                <Input id="passport" value={new Date(selectedVisa.dateBirth).toLocaleDateString()} readOnly />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="passport">Local de nascimento</Label>
                                  <Input id="passport" value={selectedVisa.cityBirth} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="passport">País de nascimento</Label>
                                  <Input id="passport" value={selectedVisa.countryBirth} readOnly />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" type="email" value={selectedVisa.email} readOnly />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email">Celular</Label>
                                  <Input id="email" type="email" value={selectedVisa.telephone} readOnly />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email">CPF</Label>
                                <Input id="email" type="email" value={selectedVisa.nationalDocument} readOnly />
                              </div>
                              <div className="space-y-2">
                                <Label>Residente permanente na Austrália e tem um visto que permite retornar à Austrália?</Label>
                                <div className="mt-2">
                                  <RadioGroup
                                    className="flex flex-row gap-5"
                                    disabled
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="true"
                                        id="option-one"
                                        checked={selectedVisa.returnToAustralia}
                                      />
                                      <Label htmlFor="option-one">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="false"
                                        id="option-two"
                                        checked={!selectedVisa.returnToAustralia}
                                      />
                                      <Label htmlFor="option-two">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>
                                  Você vai permanecer na Nova Zelândia ou é apenas trânsito?
                                </Label>
                                <div className="mt-2">
                                  <RadioGroup
                                    className="flex flex-row gap-5"
                                    required
                                    disabled
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="true"
                                        id="stay-nz-yes"
                                        checked={selectedVisa.stayInNZ}
                                      />
                                      <Label htmlFor="stay-nz-yes">Sim, vou permanecer</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="false"
                                        id="stay-nz-no"
                                        checked={!selectedVisa.stayInNZ}
                                      />
                                      <Label htmlFor="stay-nz-no">Não, apenas trânsito</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <hr />
                              <div>
                                <Label>Viajará para a Nova Zelândia para consulta ou tratamento médico?</Label>
                                <div className="mt-2">
                                  <RadioGroup className="flex flex-row gap-5" disabled>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="1"
                                        id="option-one"
                                        checked={selectedVisa.medicalTreatment}
                                      />
                                      <Label htmlFor="option-one">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="0"
                                        id="option-two"
                                        checked={!selectedVisa.medicalTreatment}
                                      />
                                      <Label htmlFor="option-two">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <div>
                                <Label>Já foi deportado, removido ou excluído de outro país (não da Nova Zelândia)?</Label>
                                <div className="mt-2">
                                  <RadioGroup className="flex flex-row gap-5" disabled>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="1"
                                        id="option-one"
                                        checked={selectedVisa.beenDeported}
                                      />
                                      <Label htmlFor="option-one">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="0"
                                        id="option-two"
                                        checked={!selectedVisa.beenDeported}
                                      />
                                      <Label htmlFor="option-two">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <div>
                                <Label>Está atualmente proibido de entrar na Nova Zelândia após ter sido deportado da Nova Zelândia no passado?</Label>
                                <div className="mt-2">
                                  <RadioGroup className="flex flex-row gap-5" disabled>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="1"
                                        id="option-one"
                                        checked={selectedVisa?.forbiddenEnter}
                                      />
                                      <Label htmlFor="option-one">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="0"
                                        id="option-two"
                                        checked={!selectedVisa?.forbiddenEnter}
                                      />
                                      <Label htmlFor="option-two">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              <div>
                                <Label>Já foi condenado por algum crime (em algum país)?</Label>
                                <div className="mt-2">
                                  <RadioGroup className="flex flex-row gap-5" disabled>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="1"
                                        id="option-one"
                                        checked={selectedVisa?.beenConvicted}
                                      />
                                      <Label htmlFor="option-one">Sim</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="0"
                                        id="option-two"
                                        checked={!selectedVisa?.beenConvicted}
                                      />
                                      <Label htmlFor="option-two">Não</Label>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                              { selectedVisa.beenConvicted && (
                                <div className="space-y-2">
                                  <Label>Já foi condenado por um crime pelo qual foi sentenciado a cinco anos ou mais de prisão? </Label>
                                  <div>
                                    <RadioGroup className="flex flex-row gap-5" disabled>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value="true"
                                          id="option-one"
                                          checked={selectedVisa.convictedMoreThanFive}
                                        />
                                        <Label htmlFor="option-one">Sim</Label>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value="false"
                                          id="option-two"
                                          checked={!selectedVisa.convictedMoreThanFive}
                                        />
                                        <Label htmlFor="option-two">Não</Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                  { !selectedVisa.convictedMoreThanFive &&
                                    <div className="space-y-2">
                                      <Label>Nos últimos 10 anos foi condenado por um crime pelo qual foi condenado a uma pena de prisão igual ou superior a 12 meses?</Label>
                                      <div>
                                        <RadioGroup className="flex flex-row gap-5" disabled>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="true"
                                              id="option-one"
                                              checked={selectedVisa.convictedMoreThanTwelve}
                                            />
                                            <Label htmlFor="option-one">Sim</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem
                                              value="false"
                                              id="option-two"
                                              checked={!selectedVisa.convictedMoreThanTwelve}
                                            />
                                            <Label htmlFor="option-two">Não</Label>
                                          </div>
                                        </RadioGroup>
                                      </div>
                                    </div>
                                  }
                                </div>
                              )}
                            </div>
                            <div className="space-y-6 max-w-2xl mx-auto">
                              <h3 className="text-lg font-bold">Informações de pagamento</h3>
                              <div className="grid grid-cols-2 gap-4">
                                { selectedVisa.payments.map(({payment}: any, index: number) => (
                                  <Card key={index}>
                                    <CardHeader>Tentativa de pagamento #{index+1}</CardHeader>
                                    <CardContent>
                                      <p>Valor: {payment.transactionAmount}</p>
                                      <p>Status: {payment.status}</p>
                                      <p>Método de pagamento: {payment.paymentTypeId === "pix" ? "Pix" : "Cartão de crédito"}</p>
                                      <hr className="my-2"/>
                                      <p>Criado em: {new Date(payment.createdAt).toLocaleDateString()}</p>
                                    </CardContent>
                                  </Card>
                                )) }
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <AlertDialogDescription className="hidden">
                        <p>Modal para exibição de Informações</p>
                      </AlertDialogDescription>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  <AlertDialog open={deletedVisa?.id === visa.id} onOpenChange={() => setDeletedVisa(visa)}>
                    <AlertDialogTrigger asChild>
                      <Trash2 className="size-6 text-red-500 cursor-pointer"/>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader className="pb-6 border-b">
                        <div className="flex justify-between items-center">
                          <AlertDialogTitle className="text-2xl font-bold">Tem certeza?</AlertDialogTitle>
                          <Button variant="ghost" size="icon" onClick={() => setDeletedVisa(null)}>
                            <X className="h-6 w-6" />
                          </Button>
                        </div>
                      </AlertDialogHeader>
                      <div className="space-y-4">
                        <h2>Você realmente deseja excluir a solicitação deste cliente?</h2>
                        { deletedVisa && (
                          <b>Cliente: {deletedVisa.name + " " + deletedVisa.surname}</b>
                        )}
                        <div className="flex flex-row gap-4">
                          <Button variant="destructive" onClick={() => handleDelete(deletedVisa.id)}>Excluir</Button>
                          <Button variant="outline" onClick={() => setDeletedVisa(null)}>Cancelar</Button>
                        </div>
                      </div>
                    </AlertDialogContent>
                  </AlertDialog>
                  */}
                </div>
              </div>
            </div>
            <hr className="border-black" />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</Button>
        <p>Página {page}</p>
        <Button disabled={filteredSolicitations.length < limit} onClick={() => setPage(page + 1)}>Próxima</Button>
      </div>
    </div>
  )
}
