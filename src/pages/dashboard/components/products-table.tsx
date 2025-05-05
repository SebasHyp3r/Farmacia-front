import { Product } from "../../../types/types";

export function ProductTable({ filteredProducts }: { filteredProducts: Product[] }) {

  return (

    <tbody>
      {
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

  )

}