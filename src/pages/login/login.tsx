import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export function Login () {

  const [loading, setLoading] = useState(false)

  const inputUser = useRef<HTMLInputElement>(null)
  const inputPass = useRef<HTMLInputElement>(null)

  const handleLogin = async (e: FormEvent) => {

    setLoading(true)
    e.preventDefault()
    const usuario = inputUser.current?.value
    const password = inputPass.current?.value

    await fetch("https://farmacia-backend-1ahx.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuario,
        password
      })
    })
    .then((res) => res.json())
    .then((response: {mensaje: string}) => {
      toast.info(response.mensaje)
    })
      .finally(() => setLoading(false))
      
    }

  return (

    <section className="w-screen h-screen bg-neutral-950 text-white flex justify-center items-center">

      <form onSubmit={handleLogin} className="text-black flex flex-col gap-3">

        <input type="text" ref={inputUser} className="rounded-lg px-2 py-1 bg-neutral-900 text-gray-200" required/>
        <input type="password" ref={inputPass} className="rounded-lg px-2 py-1 bg-neutral-900 text-gray-200" required/>
        <button className="text-white rounded-lg bg-neutral-800 py-1" disabled={loading}>
          {loading ? "Iniciando..." : "Iniciar Sesion"}
        </button>

      </form>

    </section>

  )

}