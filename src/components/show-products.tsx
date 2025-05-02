import { useEffect, useState } from "react"

interface Product {
  nombre:string,
  descripcion: string,
  precio: number,
  stock: number,
  categoria: string,
  fechaVencimiento: string
}

export function ShowProducts () {

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  const fetchData = async () => {

    setLoading(true)

    await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos")
    .then(async (res) => {

      const response: Product[] = await res.json()
      if(response.length > 0){
        setProducts(response)
      }
      
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(

    <main className="w-full h-screen flex justify-center items-center">
      {
        loading == true && 
        <div className="w-5 h-5 bg-blue-700 animate-spin"></div>
      }
      
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <table className="table text-gray-400 space-y-6 text-sm">
              <thead className="bg-neutral-900 text-gray-500">
                <tr>
                  <th className="p-3 text-center">Nombre</th>
                  <th className="p-3 text-left">Descripcion</th>
                  <th className="p-3 text-left">Precio</th>
                  <th className="p-3 text-left">Stock Disponible</th>
                  <th className="p-3 text-left">Categoria</th>
                  <th className="p-3 text-left">Fecha de Vencimiento</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((item) => (

                    <tr className="bg-neutral-900">
                      <td className="p-3">
                        {item.nombre}
                      </td>

                      <td className="p-3 font-semibold">
                        {item.descripcion}
                      </td>

                      <td className="p-3 font-bold">
                        {item.precio}
                      </td>

                      <td className="p-3">
                        {item.stock}
                      </td>

                      <td className="p-3 ">
                        {item.categoria}
                      </td>

                      <td className="p-3">
                        {item.fechaVencimiento}
                      </td>
                    </tr>

                  ))
                }
                
              </tbody>
            </table>
          </div>
        </div>
      
    </main>

  )

}