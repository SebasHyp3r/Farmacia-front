import { useState } from "react"
import { AddProductForm } from "../components/add-product"
import { ShowProducts } from "../components/show-products"

export function Dashboard () {

  const [page, setPage] = useState("show")
  

  return (

    <section className="w-screen h-screen bg-neutral-950 text-white flex">

      <aside className="p-3 bg-neutral-900 h-screen w-72">

        <header className="border-b border-gray-500 text-center text-3xl font-semibold pb-2">
          <h1>DASHBOARD</h1>
        </header>

        <ul className="felx gap-5 py-5 space-y-3">
          <li className="flex gap-3 px-5 py-2 rounded-lg bg-neutral-800 cursor-pointer active:bg-neutral-950 duration-200" onClick={() => setPage("show")}>
            <h2 className="font-semibold">Listar Productos</h2>
          </li>
          <li className="flex gap-3 px-5 py-2 rounded-lg bg-neutral-800 cursor-pointer active:bg-neutral-950 duration-200" onClick={() => setPage("create")}>
            <h2 className="font-semibold">Crear Producto</h2>
          </li>
        </ul>

      </aside>

      {
        page == "show" &&
        <ShowProducts />
      }
      {
        page == "create" &&
        <AddProductForm />
      }

    </section>

  )

}