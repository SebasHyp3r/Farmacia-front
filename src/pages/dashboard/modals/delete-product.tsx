import { FormEvent, useState } from "react";
import { Product } from "../../../types/types";
import { useDeleteModal, useUpdDeleteModal } from "./modals-provider";
import { toast } from "sonner";

export function DeleteModal ({ product }: { product: Product | null }) {

  const [isDeleting, setIsDeleting] = useState(false)

  const modal = useDeleteModal()
  const updateModal = useUpdDeleteModal()

  const handleDelete = async (e: FormEvent) => {

    e.preventDefault()
    setIsDeleting(true)
    await fetch(`https://farmacia-backend-1ahx.onrender.com/api/productos/${product?._id}`, {
      method: "DELETE",
    })
    .then(async (res) => {
      const response: {mensaje: string} = await res.json()
      toast.success(response.mensaje)
    })
    .finally(() => { setIsDeleting(false); updateModal() })

  }

  if(!modal) return

  if(product){
    return(

      <section className="w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center backdrop-blur-sm">
        <form onSubmit={handleDelete} className="w-[500px] p-5 rounded-lg bg-neutral-950 flex flex-col gap-3">
          <header>
            <p className="text-2xl font-semibold">
              Eliminar producto - {product.nombre}
            </p>
          </header>

          <p>Deseas eliminar este Producto para siempre?</p>

          <div className="flex justify-end pt-2">
            <div className="flex gap-4">
              <button type="button" disabled={isDeleting} className="rounded-lg bg-neutral-900 py-1 px-3 font-semibold opacity-70 disabled:opacity-30"
              onClick={() => updateModal()}>Cancelar</button>
              <button disabled={isDeleting} className="rounded-lg bg-red-500 text-red-200 py-1 px-3 font-semibold disabled:opacity-30">
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </form>
      </section>

    )
  }
}