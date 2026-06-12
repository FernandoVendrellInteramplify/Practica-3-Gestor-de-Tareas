"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/lib/actions";
import { SubmitButton } from "./confirm";
import { Mail, Lock } from "lucide-react";

const initialState = {
  success: false,
  error: null as string | null,
};

export default function LoginForm() {
  const router = useRouter();

  const [state, formAction] = useActionState(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  useEffect(() => {
    if (state.success) {
      toast.success("Inicio de sesión correcto");

      setTimeout(() => {
        router.push("/dashboard");
      }, 10);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="grid gap-4 p-2">

      <div>
        <label htmlFor="email" className="mb-1 block">
          Email
        </label>

        <div className="relative">
          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/>

          <input type="email"  name="email" placeholder="Email" required
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2 pl-10 text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"/>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block">
          Contraseña
        </label>

        <div className="relative">
          <Lock size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"/>

          <input type="password" name="password" placeholder="Contraseña" required
            className="w-full rounded-lg border border-zinc-300 bg-zinc-50 p-2 pl-10 text-black focus:border-blue-500  focus:ring-2 focus:ring-blue-200 outline-none"/>
        </div>
      </div>

      <SubmitButton title="Iniciar Sesión"  t2="Iniciando..."
        className="mt-6 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 transition-colors">
        Iniciar sesión
      </SubmitButton>
    </form>
    
  );
}