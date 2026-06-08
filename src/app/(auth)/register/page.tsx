import Link from "next/link";
import RegistroForm from "@/components/FormularioRegistro"


export default function PaginaResgistro(){
    return (
    <main className="min-h-screen p-8  font-sans bg-zinc-200" >
      <div className="mx-auto max-w-7xl ">
        <header className="mb-8 flex items-center justify-between ">

          <h1 className="text-6xl justify-center">Gestor de Tareas</h1>

          <Link href="/login" className="rounded-lg animate-[fadeRight_0.6s_ease-out] bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            Volver al Login
          </Link>

        </header>

        <section className="rounded-lg animate-[fadeDown_0.6s_ease-out] w-100 items-center justify-between p-10 bg-zinc-300 ml-100  sm:items-start">

          <h2 className="text-3xl justify-center mb-5">
            Registrar Usuario
          </h2>
          <RegistroForm />

        </section>
      </div>
    </main>
  );
}