import { IconMessageCircleFilled } from "@tabler/icons-react";
import { NavHeader } from "./components/NavHeader";
import { ChatBot } from "./modals/ChatBot";

export function Home() {

  const showModal = () => {

    const chat = document.getElementById("chat-modal")?.classList
    chat?.toggle("hidden")

  }

  return (
    <main className="w-screen h-screen bg-black text-gray-200 relative">
      <ChatBot />
      <NavHeader />
      <section className="w-full flex justify-center">
        <div className="py-16 max-w-5xl">
          <h1 className="text-6xl font-semibold text-center">Farmacia Salud: Cercanía, Confianza y Bienestar en un solo lugar</h1>

          <p className="text-xl text-neutral-400 text-center py-7">
            En Farmacia Salud nos dedicamos al cuidado integral de tu bienestar. Ofrecemos medicamentos de calidad, atención personalizada y un equipo comprometido con tu salud. Ya sea en nuestra tienda física o a través de nuestro servicio online, estamos aquí para acompañarte en cada etapa.
          </p>

          <div className="flex justify-center">
            <button className="py-4 px-6 rounded-full bg-neutral-200 text-neutral-900 text-2xl font-semibold">Explorar mas</button>
          </div>
        </div>
      </section>

      <button type="button" className="rounded-full p-4 border border-[#1c1d1d] hover: duration-300 absolute bottom-7 right-7 cursor-pointer hover:scale-110" onClick={showModal}>
        <IconMessageCircleFilled />
      </button>
    </main>
  )
}