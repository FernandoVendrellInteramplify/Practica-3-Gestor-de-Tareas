import LoginForm from "@/components/FormularioLogin";
import Link from "next/link";

export default function PaginaLogin() {
  return (
    <main className="min-h-screen p-8 font-sans bg-zinc-200">
      <div className="mx-auto max-w-7xl">
        
        <header className="mb-12">
          <h1 className="text-6xl">
            Gestor de Tareas
          </h1>
        </header>

        <div className="flex flex-col items-center">
          
          <section className="rounded-lg bg-zinc-300 p-10 w-full max-w-md animate-[fadeDown_0.6s_ease-out]">
            <h2 className="text-3xl text-center mb-5">
              Inicio de Sesión
            </h2>

            <LoginForm />
          </section>

          <div className="mt-6  animate-[fadeDown_0.8s_ease-out]">
            <Link
              href="/register"
              className=" w-120 bg-blue-600 rounded-lg px-4 py-2 text-white hover:bg-blue-500"
            >
              Registrarse
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}