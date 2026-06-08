import LoginForm from "@/components/FormularioLogin";
import Link from "next/link";

export default function PaginaLogin() {
  return (
    <main className="min-h-screen p-8  font-sans bg-zinc-200 dark:bg-zinc-800" >
      <div className="mx-auto max-w-7xl ">
        <header className="mb-8 flex items-center justify-between ">

          <h1 className="text-6xl justify-center">Gestor de Tareas</h1>

          <Link href="/" className="rounded-lg bg-blue-600 animate-[fadeRight_0.6s_ease-out] px-4 py-2 text-white hover:bg-blue-500">
            Volver a inicio
          </Link>

        </header>

        <section className="rounded-lg animate-[fadeUp_0.6s_ease-out]  w-100 items-center justify-between p-18 bg-zinc-300 dark:bg-zinc-900 ml-100  sm:items-start">

          <h2 className="text-3xl justify-center mb-5">
            Inicio de Sesión
          </h2>
          <LoginForm />

        </section>
      </div>
    </main>
  );
}