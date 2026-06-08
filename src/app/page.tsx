import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-200 font-sans dark:bg-zinc-800">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        
        <h1 className="animate-[fadeDown_0.3s_ease-out] text-6xl justify-center">
          Bienvenido a la Aplicación de gestor de tareas
        </h1>
        <h2 className="animate-[fadeDown_0.6s_ease-out] text-2xl text-zinc-700 dark:text-zinc-500">
          Para llevar un orden con tablones de tareas personalizados
        </h2>
        <div className="animate-[fadeDown_0.9s_ease-out] flex gap-10" >
          <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            Registrarse
          </Link>
          <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
            Iniciar sesión
          </Link>
        </div>
      </main>
    </div>
  );
}
