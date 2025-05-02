import { useEffect, useState } from "react"

export function ShowProducts () {

  const [loading, setLoading] = useState(false)

  const fetchData = async () => {

    setLoading(true)

    await fetch("https://farmacia-backend-1ahx.onrender.com/api/productos")
    .then(async (res) => {

      const response = await res.json()
      console.log(response)

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
        <div className="w-5 h-5 animate-spin"></div>
      }
      {

      }
    </main>

  )

}