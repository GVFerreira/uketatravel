import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

export default function AddUser() {
  return(
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          Adicionar usuário
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Usuário</SheetTitle>
          <SheetDescription>
            Adicione mais perfis para sua aplicação
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input id="email" name="email" type="email" className="col-span-3" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className="text-right">
              Senha
            </Label>
            <Input id="password" name="password" type="password" className="col-span-3" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="passwordCheck" className="text-right">
              Confirmar senha
            </Label>
            <Input id="passwordCheck" name="passwordCheck" type="password" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Adicionar</Button>
          <SheetClose asChild>
            <Button variant="destructive">
              Cancelar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}