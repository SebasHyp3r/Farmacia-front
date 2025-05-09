import { useState } from "react"
import { AddProductForm } from "./components/add-product"
import { ShowProducts } from "./components/show-products"
import { IconList, IconPlus } from "@tabler/icons-react"

export function Dashboard () {

  // bg-gradient-to-r from-black via-neutral-950 to-black

  const [page, setPage] = useState("show")
  

  return (

    <main className="w-screen h-screen bg-black text-white flex" id="main-content">
      <section className="w-1/4 p-4 h-screen max-w-xs">
        <aside className="h-full rounded-lg p-4 bg-neutral-950">

          <ul className="felx gap-5 py-5 space-y-2">
            <li className="flex gap-3 py-2 cursor-pointer active:bg-neutral-950 duration-200 hover:text-amber-200" 
            onClick={() => setPage("show")}>
              <IconList />
              <h2 className="font-semibold">Listar Productos</h2>
            </li>
            <li className="flex gap-3 py-2 cursor-pointer active:bg-neutral-950 duration-200 hover:text-amber-200" 
            onClick={() => setPage("create")}>
              <IconPlus />
              <h2 className="font-semibold">Administrar Producto</h2>
            </li>
          </ul>

        </aside>

      </section>

      {
        page == "show" &&
        <ShowProducts />
      }
      {
        page == "create" &&
        <AddProductForm />
      }

    </main>

  )

}