import { IconSend } from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type Mensaje = {
  autor: "usuario" | "bot";
  texto: string;
}

export function ChatBot() {

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Mensaje[]>([])
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (message == "") { toast.warning("Ingrese un mensaje") } else {

      const newMessage: Mensaje = { autor: "usuario", texto: message }

      setMessages(prev => [...prev, newMessage])
      setMessage("")

      setLoading(true)

      await fetch("https://farmacia-backend-1ahx.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ mensaje: message })
      })
        .then((res) => res.json())
        .then((response: { respuesta: string }) => {
          console.log(response)

          if (response.respuesta) {
            const botResponse: Mensaje = { autor: "bot", texto: response.respuesta }
            setMessages(prev => [...prev, botResponse])
          }

        })
        .finally(() => setLoading(false))
    }
  }

  return (

    <section className=" w-screen h-screen bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 z-10" id="chat-modal">
      <div className="w-full h-full flex justify-center p-10">
        <form className="w-[600px] bg-neutral-950 rounded-xl border border-[#1c1d1d]" onSubmit={handleSubmit}>
          <header className="p-3 border-b border-[#1c1d1d]">
            <span className="font-semibold">ChatBot v1.1.0</span>
          </header>

          <section className="h-[404px] overflow-y-auto p-4 flex flex-col gap-3 scroll-hidden">
            {
              messages.map((el, index) => (
                <div key={index} className={`w-full flex ${el.autor === "usuario" ? "justify-end" : "justify-start"}`}>
                  <span className={`p-2 rounded-xl max-w-[250px] ${el.autor === "usuario" ? "bg-neutral-900" : "bg-blue-800"}`}>
                    {el.texto}
                  </span>
                </div>
              ))
            }
            {
              loading &&
              <div className="w-full">
                <span className="p-2 rounded-xl bg-neutral-900">
                  ...
                </span>
              </div>
            }
          </section>

          <div className="p-3 border-t border-[#1c1d1d]">
            <div className="flex">
              <input type="text" className="w-full py-2 px-4 rounded-s-full text-sm font-semibold bg-neutral-900"
                onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
              <button className="rounded-e-full py-2 px-4 bg-neutral-900 disabled:opacity-25" disabled={loading}>
                <IconSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}