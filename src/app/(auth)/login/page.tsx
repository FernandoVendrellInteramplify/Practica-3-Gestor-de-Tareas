import LoginForm from "@/components/FormularioLogin";
import Link from "next/link";

export default function PaginaLogin() {
  return (
    <main>
      <div>
        <header>
          <h1>Iniciar Sesión</h1>
        </header>

        <section className="flex gap-2">
          <LoginForm />
          <Link href="/" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            Volver a inicio
          </Link>

        </section>
      </div>
    </main>
  );
}