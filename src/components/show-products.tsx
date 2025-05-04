import { useEffect, useState } from "react"
import { Product } from "../types/types"
import { IconChartPieFilled, IconFirstAidKit, IconSearch } from "@tabler/icons-react"

export function ShowProducts() {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
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

  // Filter products by search term
  useEffect(() => {
    let filter = []
    if(searchTerm == ""){
      filter = products
    }else{
      filter = products.filter((item) => item.nombre.toLowerCase().startsWith(searchTerm))
    }
    setFilteredProducts(filter)
  }, [searchTerm])

  // Set the data to the state
  useEffect(() => {
    fetchData()
  }, [])

  return (

    <main className="w-full h-screen px-7 overflow-auto">

      <header className="flex items-center gap-2 text-gray-200 pt-9 pb-5">
        <IconChartPieFilled className="w-8 h-8"/>
        <h1 className="text-3xl font-bold ">Welcome to the Dashboard</h1>
      </header>

      <section className="grid grid-cols-3 gap-5">
        <article className="bg-neutral-950 p-5 rounded-lg">
          <h1>NONO</h1>
        </article>

        <article className="bg-neutral-950 p-5 rounded-lg">
          <h1>NONO</h1>
        </article>

        <article className="bg-neutral-950 p-5 rounded-lg">
          <h1>NONO</h1>
        </article>
      </section>

      <section className="py-5">
        <div className="flex items-center gap-2 pb-5">
          <IconFirstAidKit className="text-gray-200" />
          <p className="text-2xl font-bold text-gray-200">Our Products</p>
        </div>

        <div className="rounded-lg p-3 bg-neutral-950 flex items-center justify-between max-w-xs">
          <input type="text" className="bg-transparent text-gray-200 font-semibold" placeholder="Buscar por nombre" 
          onChange={(e) => setSearchTerm(e.target.value)}/>
          <IconSearch />
        </div>
      </section>

      {
        <section className="relative overflow-auto shadow-md rounded-lg mb-9 max-h-[460px]">
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

            <tbody>
              { 
                loading == true ?

                  <div className="bg-neutral-950 p-7 flex items-center justify-center">
                    <div className="w-5 h-5 bg-blue-700 animate-spin"></div>
                  </div>
                :
                filteredProducts.map((item) => (

                  <tr className="border-b border-neutral-900 bg-neutral-950 text-lg" key={item.id}>
                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                      {item.nombre}
                    </td>

                    <td className="px-6 py-4">
                      {item.descripcion}
                    </td>

                    <td className="px-6 py-4">
                      {item.precio}
                    </td>

                    <td className="px-6 py-4">
                      {item.stock}
                    </td>

                    <td className="px-6 py-4 ">
                      {item.categoria}
                    </td>

                    <td className="px-6 py-4">
                      {item.fechaVencimiento}
                    </td>
                  </tr>

                ))
              }
            </tbody>
          </table>
        </section>
      }
    </main>

  )

}