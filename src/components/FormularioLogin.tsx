"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginAction } from "@/lib/actions";
import { SubmitButton } from "./confirm";

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
    <form action={formAction} className="grid justify-content gap-2 p-2">

      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="Email" required
      className="round border bg-zinc-50 rounded-lg border-zinc-300 text-black p-2"/>

      <label htmlFor="password">Contraseña</label>
      <input type="password" name="password" placeholder="Contraseña" required
      className="round border bg-zinc-50 rounded-lg border-zinc-300 text-black p-2"/>

      <SubmitButton title="Iniciar Sesion" className="rounded-lg cursor-pointer bg-blue-600 px-4 py-2 text-white mt-6 hover:bg-blue-500"
      t1="Iniciar sesion" t2="Iniciando ..."  />
    </form>
    
  );
}