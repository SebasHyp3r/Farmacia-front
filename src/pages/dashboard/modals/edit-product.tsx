import { FormEvent, useEffect, useState } from "react";
import { Product } from "../../../types/types";
import { useEditModal, useUpdEditModal } from "./modals-provider";
import { IconCalendarCog, IconCategoryFilled, IconFileDescriptionFilled, IconSettingsDollar, IconStack3Filled, IconStarFilled } from "@tabler/icons-react";
import { toast } from "sonner";

export function EditModal({ product }: { product: Product | null }) {

  const [isSubmiting, setIsSubmiting] = useState(false)
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [categoria, setCategoria] = useState("");

  const modal = useEditModal();
  const updateModal = useUpdEditModal();

  // Set each value to the state
  useEffect(() => {
    if(product){
      setNombre(product.nombre)
      setPrecio(product.precio)
      setStock(product.stock)
      setDescripcion(product.descripcion)
      setFechaVencimiento(product.fechaVencimiento)
      setCategoria(product.categoria)
    }
  }, [product])

  const handleEdit = async (e: FormEvent) => {

    e.preventDefault()
    setIsSubmiting(true)
    await fetch(`https://farmacia-backend-1ahx.onrender.com/api/productos/${product?._id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        nombre,
        precio,
        stock,
        descripcion,
        categoria,
        fechaVencimiento
      })
    })
    .then(async (res) => {
      const response: {mensaje: string} = await res.json()
      if(response) toast.success(response.mensaje)
    })
    .finally(() => { setIsSubmiting(false); updateModal() })

  };

  if (!modal) return;

  if (product) {
    return (
      <section className="w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center backdrop-blur-sm">
        <form
          onSubmit={handleEdit}
          className="w-[500px] p-5 rounded-lg bg-neutral-950 flex flex-col gap-3"
        >
          <header>
            <p className="text-2xl font-semibold">
              Editar producto - {product.nombre}
            </p>
          </header>

          <div>
            <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
              <IconStarFilled className="w-3 h-3"/>
              Product Name
            </label>
            <input required type="text" value={nombre} onChange={(e) => setNombre(e.currentTarget.value)} className="w-full text-sm rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
          </div>

          <div>
            <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
              <IconCategoryFilled className="w-3 h-3"/>
              Categoria
            </label>
            <input required type="text" value={categoria} onChange={(e) => setCategoria(e.currentTarget.value)} className="w-full text-sm rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
          </div>

          <div>
            <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
              <IconCalendarCog className="w-3 h-3"/>
              Fecha de Vencimiento
            </label>
            <input required type="datetime-local" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.currentTarget.value)} className="rounded-lg text-sm bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
          </div>

          <div>
            <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
              <IconFileDescriptionFilled className="w-3 h-3"/>
              Descripcion
            </label>
            <textarea rows={4} value={descripcion} onChange={(e) => setDescripcion(e.currentTarget.value)} className="w-full text-sm font-medium bg-neutral-900 p-3 rounded-lg resize-none text-gray-300"/>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
                <IconSettingsDollar className="w-3 h-3"/>
                Precio
              </label>
              <input type="number" value={precio} onChange={(e) => setPrecio(Number(e.currentTarget.value))} className="w-full rounded-lg bg-neutral-900 py-2 px-3 font-medium text-sm text-gray-300" />
            </div>

            <div>
              <label className="flex gap-3 font-semibold items-center pb-2 text-neutral-400">
                <IconStack3Filled className="w-3 h-3"/>
                Stock
              </label>
              <input type="number" value={stock} onChange={(e) => setStock(Number(e.currentTarget.value))} className="w-full rounded-lg bg-neutral-900 py-2 px-3 font-medium text-sm text-gray-300" />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <div className="flex gap-4">
              <button type="button" disabled={isSubmiting} className="rounded-lg bg-neutral-900 py-1 px-3 font-semibold opacity-70 disabled:opacity-30"
              onClick={() => updateModal()}>Cancelar</button>
              <button disabled={isSubmiting} className="rounded-lg bg-sky-500 text-sky-200 py-1 px-3 font-semibold disabled:opacity-30">
                {isSubmiting ? "Editando..." : "Editar"}
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
