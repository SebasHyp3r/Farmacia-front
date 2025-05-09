import { useEffect, useState } from "react"
import { Product } from "../../../types/types"
import { IconAlertTriangle, IconChartPieFilled, IconCoin, IconFirstAidKit, IconPackage, IconSearch } from "@tabler/icons-react"
import { ProductTable } from "./products-table"

export function ShowProducts() {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [moreStock, setMoreStock] = useState<Product>()
  const [lessStock, setLessStock] = useState<Product>()
  const [searchTerm, setSearchTerm] = useState("")

  // Fetching of data from DB
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

  // Set the more and less stock
  useEffect(() => {
    if(products.length > 0){
      setMoreStock(products.reduce((max, item) => item.stock > max.stock ? item : max))
      setLessStock(products.reduce((max, item) => item.stock < max.stock ? item : max))
    }
  }, [products])

  // Filter products by search term
  useEffect(() => {
    let filter = []
    if (searchTerm == "") {
      filter = products
    } else {
      filter = products.filter((item) => item.nombre.toLowerCase().startsWith(searchTerm))
    }
    setFilteredProducts(filter)
  }, [searchTerm])

  // Set the data to the state
  useEffect(() => {
    fetchData()
  }, [])

  return (

    <main className="w-full h-screen px-7 p-9 overflow-auto">

      <header className="flex items-center gap-2 text-gray-200">
        <IconChartPieFilled className="w-8 h-8" />
        <h1 className="text-3xl font-bold ">Welcome to the Dashboard</h1>
      </header>

      <section className="grid grid-cols-3 gap-5 py-5">
        <article className="bg-neutral-950 p-5 rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-300">Total de productos</h1>
            <div className="p-1 rounded-full bg-amber-200">
              <IconPackage className="text-orange-400" />
            </div>
          </div>

          <div>
            <p className="text-3xl text-neutral-100 font-semibold">{products.length}</p>
          </div>
        </article>

        <article className="bg-neutral-950 p-5 rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-300">
              Mas Stock - {moreStock?.nombre}
            </h1>
            <div className="p-1 rounded-full bg-red-200">
              <IconAlertTriangle className="text-red-500" />
            </div>
          </div>

          <p className="text-3xl text-neutral-100 font-semibold">
            {moreStock?.stock} <span className="text-xl">units</span>
          </p>
        </article>

        <article className="bg-neutral-950 p-5 rounded-lg">
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-300">
              Menos Stock - {lessStock?.nombre}
            </h1>
            <div className="p-1 rounded-full bg-emerald-200">
              <IconCoin className="text-green-500" />
            </div>
          </div>

          <p className="text-3xl text-neutral-100 font-semibold">
            {lessStock?.stock} <span className="text-xl">units</span>
          </p>
        </article>

      </section>

      <section className="pb-5 flex justify-between">

        <div className="flex items-center gap-2">
          <IconFirstAidKit className="text-gray-200" />
          <p className="text-2xl font-bold text-gray-200">Our Products</p>
        </div>
        <div className="rounded-lg p-3 bg-neutral-950 flex items-center justify-between w-72">
          <input type="text" className="bg-transparent text-gray-200 font-semibold" placeholder="Buscar por nombre"
            onChange={(e) => setSearchTerm(e.target.value)} />
          <IconSearch />
        </div>

      </section>

      {
        <section className="relative overflow-auto shadow-md rounded-lg max-h-[630px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="uppercase bg-neutral-900 text-gray-400 sticky top-0 left-0">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Descripcion</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Categoria</th>
                <th className="px-6 py-3">Fecha de Vencimiento</th>
              </tr>
            </thead>

            {loading == true ?
              <tbody className="bg-neutral-950">
                <tr>
                  <td colSpan={6}>
                    <div className="w-full flex justify-center py-7">
                      <div className="w-7 h-7 bg-amber-300 animate-spin"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
              :
              <ProductTable filteredProducts={filteredProducts} />
            }

          </table>

        </section>
      }
    </main>

  )

}