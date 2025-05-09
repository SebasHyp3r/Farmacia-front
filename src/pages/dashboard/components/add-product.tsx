import { IconBrandStocktwits, IconCalendarCog, IconCategoryFilled, IconCirclePlusFilled, IconLabel, IconLabelImportantFilled, IconRecordMail, IconSettingsDollar, IconStack3, IconStack3Filled, IconTextPlus } from "@tabler/icons-react";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

export function AddProductForm() {

  const [loading, setLoading] = useState(false)

  const name = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const price = useRef<HTMLInputElement>(null)
  const stck = useRef<HTMLInputElement>(null)
  const cate = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()
    setLoading(true)

    const nombre = name.current?.value
    const descripcion = desc.current?.value
    const precio = price.current?.value
    const stock = stck.current?.value
    const categoria = cate.current?.value

    await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        nombre,
        descripcion,
        precio,
        stock,
        categoria
      })
    })
      .then(async (res) => {

        const response: { mensaje: string } = await res.json()
        if (res.ok) {
          toast.success(response.mensaje)
        } else {
          toast.error(response.mensaje)
        }


      })
      .finally(() => setLoading(false))

  }

  return (

    <main className="w-full h-screen px-7 p-9 overflow-auto">

      <header className="flex items-center gap-2 text-gray-200">
        <IconCirclePlusFilled className="w-8 h-8" />
        <h1 className="text-3xl font-bold ">Add new Product</h1>
      </header>

      <form className="my-5">
        <section className="flex gap-5">

          <article className="grid grid-cols-2 gap-7 p-5 w-4/6 bg-neutral-950">
            <div className="flex flex-col gap-5">

              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconLabelImportantFilled />
                Product Name
              </label>
              <input type="text" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="flex gap-3 text-xl font-semibold items-center">
                    <IconSettingsDollar />
                    Product Price
                  </label>
                  <input type="number" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex gap-3 text-xl font-semibold items-center">
                    <IconStack3Filled />
                    Product Stock
                  </label>
                  <input type="number" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />
                </div>
              </div>

            </div>

            {/* Text Area */}
            <div className="flex flex-col gap-5">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconTextPlus />
                Product Description
              </label>
              <textarea rows={4} className="h-44 bg-neutral-900 p-3 rounded-lg resize-none text-lg text-gray-300" />
            </div>
          </article>

          {/* Category and Date */}
          <div className="w-2/6 flex flex-col gap-5">
            <article className="p-5 bg-neutral-950 flex flex-col gap-3">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconCalendarCog />
                Fecha de Vencimiento
              </label>
              <input type="datetime-local" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
            </article>

            <article className="p-5 bg-neutral-950 flex flex-col gap-3">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconCategoryFilled />
                Categoria
              </label>
              <input type="text" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
            </article>
          </div>

        </section>
      </form>
    </main>

  )

}