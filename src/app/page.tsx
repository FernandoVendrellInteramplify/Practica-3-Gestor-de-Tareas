import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          Registrarse
        </Link>
        <Link href="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          Iniciar sesión
        </Link>
      </main>
    </div>
  );
}
