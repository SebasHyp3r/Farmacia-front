import { IconPlus, IconTrash } from "@tabler/icons-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export function AddProductForm () {

  const [loading, setLoading] = useState(false)

  const name = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const price = useRef<HTMLInputElement>(null)
  const stock = useRef<HTMLInputElement>(null)
  const cate = useRef<HTMLInputElement>(null)
  
  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()
    setLoading(true)

    const nombre = name.current?.value
    const descripcion = desc.current?.value
    const precio = price.current?.value
    const stock = price.current?.value
    const categoria = cate.current?.value

    await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos", {
      method:"POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        nombre,
        descripcion,
        precio,
        stock,
        categoria
      })
    })
    .then(async (res) => {

      const response: {mensaje: string} = await res.json()
      if(res.ok){
        toast.success(response.mensaje)
      }else{
        toast.error(response.mensaje)
      }
      

    })
    .finally(() => setLoading(false))

  }

  return (

    <main className="w-full h-screen flex justify-center items-center">
      <div>
        <div className="bg-neutral-900 rounded-lg shadow">

          <div className="flex">
            <div className="flex-1 py-5 pl-5 overflow-hidden">
              <h1 className="inline text-2xl font-semibold leading-none">Crear Nuevo Producto</h1>
            </div>
          </div>

          <form className="px-5 pb-5" onSubmit={handleSubmit}>

            <input placeholder="Nombre Producto" ref={name} 
            className=" text-neutral-300 placeholder-neutral-600 w-full px-4 py-2.5 text-base transition duration-500 ease-in-out transform border-transparent border-2
            rounded-lg bg-neutral-800 focus:border-blueGray-500  focus:outline-none focus:shadow-outline focus:border-neutral-700
            ring-offset-current ring-offset-2 ring-gray-400" />

            <textarea placeholder="Descripcion" ref={desc} rows={4} className="text-neutral-300 placeholder-neutral-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent border-2
            rounded-lg bg-neutral-800 focus:border-blueGray-500  focus:outline-none focus:shadow-outline focus:border-neutral-700
            ring-offset-current ring-offset-2 ring-gray-400" />

            <div className="grid grid-cols-2 gap-2">

              <div className="">
                <input placeholder="Price" ref={price} type="number" className=" text-neutral-300 placeholder-neutral-600 w-full px-4 py-2.5 mt-1 text-base transition duration-500 ease-in-out transform border-transparent border-2
                rounded-lg bg-neutral-800 focus:border-blueGray-500  focus:outline-none focus:shadow-outline focus:border-neutral-700
                ring-offset-current ring-offset-2 ring-gray-400" />
              </div>

              <div className="">
                <input placeholder="Stock" ref={stock} type="number" className=" text-neutral-300 placeholder-neutral-600 w-full px-4 py-2.5 mt-1 text-base transition duration-500 ease-in-out transform border-transparent border-2
                rounded-lg bg-neutral-800 focus:border-blueGray-500  focus:outline-none focus:shadow-outline focus:border-neutral-700
                ring-offset-current ring-offset-2 ring-gray-400" />
              </div>

            </div>

            <input placeholder="Categoria" ref={cate} 
            className={`text-neutral-300 placeholder-neutral-600 w-full px-4 py-2.5 mt-2 mb-7 text-base transition duration-500 ease-in-out transform border-transparent border-2
            rounded-lg bg-neutral-800 focus:border-blueGray-500  focus:outline-none focus:shadow-outline focus:border-neutral-700
            ring-offset-current ring-offset-2 ring-gray-400`} />

            <div className="flex flex-row-reverse pt-7 border-t border-neutral-700">
              <div className="flex-initial pl-3">
                
                <button disabled={loading} className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize bg-black rounded-md 
                hover:bg-gray-800 focus:outline-none focus:bg-gray-900 transition duration-300 transform active:scale-95 ease-in-out">
                  <IconPlus />
                  <span className="pl-2 mx-1">{loading ? "Creando..." : "Crear"}</span>
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </main>

  )

}