import { IconAdjustmentsAlt, IconCalendarCog, IconCategoryFilled, IconCirclePlusFilled,  IconEdit, IconEraser,  IconFidgetSpinnerFilled,  IconLabelImportantFilled,  IconPlus,  IconReload,  IconSearch,  IconSettingsDollar, IconStack3Filled, IconTextPlus } from "@tabler/icons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Product } from "../../../types/types";
import { useUpdDeleteModal, useUpdEditModal } from "../modals/modals-provider";
import { EditModal } from "../modals/edit-product";
import { DeleteModal } from "../modals/delete-product";

export function AddProductForm() {

  const [loading, setLoading] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [productInfo, setProductInfo] = useState<Product | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const name = useRef<HTMLInputElement>(null)
  const desc = useRef<HTMLTextAreaElement>(null)
  const price = useRef<HTMLInputElement>(null)
  const stck = useRef<HTMLInputElement>(null)
  const cate = useRef<HTMLInputElement>(null)
  const fevenc = useRef<HTMLInputElement>(null)

  // Context for modals
  const showEditModal = useUpdEditModal()
  const showDeleteModal = useUpdDeleteModal()

  // Filtrer by input search
  useEffect(() => {
    let filter = []
    if (searchTerm == "") {
      filter = products
    } else {
      filter = products.filter((item) => item.nombre.toLowerCase().startsWith(searchTerm))
    }
    setFilteredProducts(filter)
  }, [searchTerm])

  // Function to Fetch Product Info
  const fetchData = async () => {
  
    setLoading(true)
    await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos")
      .then(async (res) => {
        const response: Product[] = await res.json()
        if (response.length > 0) {
          setProducts(response)
          setFilteredProducts(response)
        }
      })
      .finally(() => setLoading(false))
  
  }

  // Fetching Data
  useEffect(() => {
    fetchData()
  }, [])

  // Submit 
  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault()

    const nombre = name.current?.value
    const descripcion = desc.current?.value
    const precio = price.current?.value
    const stock = stck.current?.value
    const categoria = cate.current?.value
    const fechaVencimiento = fevenc.current?.value

    if(nombre == "" || descripcion == "" || precio == null || stock == null || categoria == "" || fechaVencimiento == ""){
      toast.error("Rellene todos los campos")
    }else{

      setIsSubmiting(true)
      await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio,
          stock,
          categoria,
          fechaVencimiento
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
        .finally(() => {setIsSubmiting(false); fetchData()})
    }

  }

  return (

    <main className="w-full h-screen px-7 p-9 overflow-auto">
      <EditModal product={productInfo} />
      <DeleteModal product={productInfo}/>

      <header className="flex justify-between text-gray-200">
        <div className="flex items-center gap-2">
          <IconCirclePlusFilled className="w-8 h-8" />
          <h1 className="text-3xl font-bold ">Add new Product</h1>
        </div>

        <div className="flex gap-4">
          <button disabled={isSubmiting} className="flex items-center font-semibold text-lg gap-2 py-2 px-3 rounded-lg bg-neutral-950" onClick={() => fetchData()}>
            <IconReload className="w-8 h-8" />
            Recargar datos
          </button>
          <button disabled={isSubmiting} className="flex items-center font-semibold text-lg gap-2 py-2 px-3 rounded-lg bg-neutral-950 disabled:opacity-50" 
          onClick={handleSubmit}>
            <IconPlus className="w-8 h-8"/>
            {isSubmiting ? "Creando..." : "Crear Producto"}
          </button>
        </div>
        
      </header>

      <form className="my-5">
        <section className="flex gap-5">
          <article className="grid grid-cols-2 gap-7 p-5 w-4/6 bg-neutral-950">
            <div className="flex flex-col gap-5">

              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconLabelImportantFilled />
                Product Name
              </label>
              <input ref={name} type="text" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3">
                  <label className="flex gap-3 text-xl font-semibold items-center">
                    <IconSettingsDollar />
                    Product Price
                  </label>
                  <input ref={price} type="number" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex gap-3 text-xl font-semibold items-center">
                    <IconStack3Filled />
                    Product Stock
                  </label>
                  <input ref={stck} type="number" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300 text-lg" />
                </div>
              </div>

            </div>

            {/* Text Area */}
            <div className="flex flex-col gap-5">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconTextPlus />
                Product Description
              </label>
              <textarea ref={desc} rows={4} className="h-44 bg-neutral-900 p-3 rounded-lg resize-none text-lg text-gray-300" />
            </div>
          </article>

          {/* Category and Date */}
          <div className="w-2/6 flex flex-col gap-5">
            <article className="p-5 bg-neutral-950 flex flex-col gap-3">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconCalendarCog />
                Fecha de Vencimiento
              </label>
              <input ref={fevenc} type="datetime-local" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
            </article>

            <article className="p-5 bg-neutral-950 flex flex-col gap-3">
              <label className="flex gap-3 text-xl font-semibold items-center">
                <IconCategoryFilled />
                Categoria
              </label>
              <input ref={cate} type="text" className="rounded-lg bg-neutral-900 py-2 px-3 font-medium text-gray-300" />
            </article>
          </div>
        </section>
      </form>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconAdjustmentsAlt className="w-8 h-8" />
          <h1 className="text-3xl font-bold ">Product Management</h1>
        </div>

        <div className="rounded-lg p-3 bg-neutral-950 flex items-center justify-between w-72">
          <input type="text" className="bg-transparent text-gray-200 font-semibold" placeholder="Buscar por nombre"
            onChange={(e) => setSearchTerm(e.target.value)} />
          <IconSearch />
        </div>
      </div>
      
      <section className={loading ? `h-96 flex justify-center items-center` : `grid grid-cols-4 gap-5 pt-5`}>
        {loading ? 
          <div className="">
            <IconFidgetSpinnerFilled className="animate-spin"/>
          </div>
        :
        filteredProducts.map((item) => (
          <article key={item._id} className="rounded-lg p-4 bg-neutral-950 flex justify-between">
            <div>
              <p className="text-lg font-semibold ">{item.nombre} - {item.stock} units</p>
              <p className="text-neutral-400 font-medium">{item.categoria}</p>
              <p className="text-neutral-500 font-medium">{item.precio}</p>
            </div>
            <div className="flex flex-col justify-between">
              <button className="p-1 rounded-lg bg-emerald-200 text-green-500"
              onClick={() => {
                setProductInfo(item) 
                showEditModal()
              }}><IconEdit /></button>

              <button className="p-1 rounded-lg bg-red-200 text-red-500"
              onClick={() => {
                setProductInfo(item)
                showDeleteModal()
              }}><IconEraser /></button>
            </div>
          </article>
        ))
        }
      </section>        
    </main>

  )

}