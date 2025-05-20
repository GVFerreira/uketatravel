import { getSolicitation } from "../actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, FileImage, User, CreditCard, Phone, Gavel, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default async function SolicitationDetailsComponent({ id }: { id: string }) {
  const solicitation = await getSolicitation(id)

  // Format date function
  const formatDate = (dateString: Date | null) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Get status badge color
  const getStatusColor = (status: string | null) => {
    switch (status?.toLowerCase()) {
      case "aprovado":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "negado":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "pendente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detalhes da Solicitação</h1>
          <p className="text-muted-foreground">ID: {solicitation.id}</p>
          <div className="grid grid-cols-2 gap-4 md:w-1/3 mt-2">
            <Button className="bg-yellow-500 hover:bg-yellow-400 transition-all">
              <Pencil className="size-4 text-yellow-800" />
            </Button>
            <Button className="bg-red-600 hover:bg-red-500 transition-all">
              <Trash2 className="size-4 text-red-100" />
            </Button>
          </div>
        </div>
        <Badge className={`${getStatusColor(solicitation?.status)} text-lg`}>{solicitation.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome</p>
                <p className="capitalize">{solicitation.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sobrenome</p>
                <p className="capitalize">{solicitation.surname}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Nascimento</p>
              <p>{formatDate(solicitation.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Outra Nacionalidade</p>
              <p>{solicitation.otherNationality || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ocupação</p>
              <p>{solicitation.occupation || "Não informado"}</p>
            </div>
          </CardContent>
        </Card>

        {/* Passport Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="size-5" />
              Detalhes do Passaporte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Número do Passaporte</p>
              <p>{solicitation.passportNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Validade</p>
              <p>{formatDate(solicitation.passportExpiryDate)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">País de Emissão</p>
                <p>{solicitation.passportCountryOfIssue}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nacionalidade</p>
                <p>{solicitation.nationality}</p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">Documentos Enviados</p>
              <div className="grid grid-cols-2 gap-4">
                {solicitation.passaportUrl && (
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-muted-foreground mb-1">Passaporte</p>
                    <div className="relative w-auto h-40 mx-auto aspect-[10/7] bg-gray-100 rounded-md overflow-hidden">
                      <Image src={`/${solicitation.passaportUrl}`} alt="Passaporte" fill className=" object-cover" />
                    </div>
                    <Button variant="link" className="w-full" asChild>
                      <a
                        href={`/${solicitation.passaportUrl}`}
                        download
                      >
                        Donwload
                      </a>
                    </Button>
                  </div>
                )}
                {solicitation.profilePhotoUrl && (
                  <div className="border rounded-md p-2">
                    <p className="text-xs text-muted-foreground mb-1">Foto de Perfil</p>
                    <div className="relative w-auto h-40 mx-auto aspect-[3/4] bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={`/${solicitation.profilePhotoUrl}`}
                        alt="Foto de Perfil"
                        fill
                        className="object-cover h-auto"
                      />
                    </div>
                    <Button variant="link" className="w-full" asChild>
                      <a
                        href={`/${solicitation.profilePhotoUrl}`}
                        download
                      >
                        Donwload
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="size-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{solicitation.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p>{solicitation.phone}</p>
            </div>
            <Separator className="my-2" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Endereço</p>
              <p>{solicitation.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cidade</p>
                <p>{solicitation.city}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">CEP</p>
                <p>{solicitation.zipCode}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">País</p>
              <p>{solicitation.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Criminal History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="size-5" />
              Histórico Criminal
            </CardTitle>
            <CardTitle></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">Possui condenação criminal?</p>
              {solicitation.hasCriminalConviction ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> Sim
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <X className="h-3 w-3" /> Não
                </Badge>
              )}
            </div>

            {solicitation.hasCriminalConviction && (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crime cometido</p>
                  <p>{solicitation.crimeHasBeenConvicted || "Não especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">País da condenação</p>
                  <p>{solicitation.countryCrimeHasBeenConvicted || "Não especificado"}</p>
                </div>
              </>
            )}

            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">Condenação criminal no último ano?</p>
              {solicitation.hasCriminalConvictionLastYear ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> Sim
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <X className="h-3 w-3" /> Não
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">Condenado por mais de um ano?</p>
              {solicitation.convictedMoreThanOneYear ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> Sim
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <X className="h-3 w-3" /> Não
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">Já foi condenado por mais de um ano?</p>
              {solicitation.hasEverConvictedMoreThanOneYear ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Check className="h-3 w-3" /> Sim
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-1">
                  <X className="h-3 w-3" /> Não
                </Badge>
              )}
            </div>

            {solicitation.hasEverConvictedMoreThanOneYear && (
              <>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Crime cometido</p>
                  <p>{solicitation.crimeConvictedMoreThanOneYear || "Não especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">País da condenação</p>
                  <p>{solicitation.countryConvictedMoreThanOneYear || "Não especificado"}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data inicial</p>
                    <p>{formatDate(solicitation.initialDateConvictedMoreThanOneYear) || "Não especificado"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Data final</p>
                    <p>{formatDate(solicitation.endDateConvictedMoreThanOneYear) || "Não especificado"}</p>
                  </div>
                </div>
              </>
            )}

            {/* Parse and display situations if any */}
            {solicitation.whichSituationWasInvolvedIn && solicitation.whichSituationWasInvolvedIn !== "[]" && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Situações envolvidas</p>
                <ul className="list-disc pl-5 mt-2">
                  {JSON.parse(solicitation.whichSituationWasInvolvedIn).map((situation: string, index: number) => (
                    <li key={index}>{situation}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="size-5" />
            Histórico de Pagamentos
          </CardTitle>
          <CardDescription>Total de pagamentos: {solicitation.payment.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {solicitation.payment.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(item.payment.createdAt)}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.payment.transactionAmount)}
                  </TableCell>
                  <TableCell className="capitalize">
                    {item.payment.paymentTypeId === "pix"
                      ? "PIX"
                      : item.payment.paymentTypeId === "credit_card"
                        ? "Cartão de Crédito"
                        : item.payment.paymentTypeId}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.payment.status)}>{item.payment.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.payment.docType}: {item.payment.docNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Application Status */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Solicitação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <Badge className={getStatusColor(solicitation.status)}>{solicitation.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Criação</p>
              <p>{formatDate(solicitation.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
              <p>{formatDate(solicitation.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
