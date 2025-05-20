import Header from "../_components/header"
import Footer from "../_components/footer"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function Contact () {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container m-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Nos envie uma mensagem</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="first-name" className="text-sm font-medium">
                        Nome
                      </label>
                      <input
                        id="first-name"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="last-name" className="text-sm font-medium">
                        Sobrenome
                      </label>
                      <input
                        id="last-name"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      E-mail
                    </label>
                    <input
                      id="email"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Assunto
                    </label>
                    <input
                      id="subject"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-3 py-2 border border-border rounded-md h-32 bg-background"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                    Enviar mensagem
                  </Button>
                </form>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Precisa de ajuda?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Nossa dedicada equipe está disponível para você através dos canais abaixo para sanar suas dúvidas sobre a aplicação do ETA do Reino Unido.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-500">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">E-mail</h3>
                      <a href="mailto:info@uketatravel.com" className="text-muted-foreground">info@uketatravel.com</a>
                      <p className="text-sm text-muted-foreground">Envie e-mail a qualquer momento que responderemos o mais breve possível.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-5" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                    </svg>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground">+55 (19) 99175-3506.</p>
                      <p className="text-sm text-muted-foreground">Tire suas dúvidas, faça perguntas... Estaremos aqui para te auxiliar.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}