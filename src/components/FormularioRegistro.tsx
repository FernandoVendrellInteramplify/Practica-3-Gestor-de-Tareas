"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Registro } from "@/lib/actions";
import { SubmitButton } from "./confirm";

const initialState = {
  success: false,
  error: null as string | null,
};

export default function RegistroForm() {
    const router = useRouter();
    const [state, formAction] = useActionState(
        Registro,
        initialState
    );

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }}, [state.error]);

    useEffect(() => {
    if (state.success) {
      toast.success("Registro exitoso");

      setTimeout(() => {
        router.push("/login");
      }, 10);
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="grid justify-content gap-2 p-2">
      
      <label htmlFor="nombre">Nombre de Usuario</label>
      <input type="text" name="nombre" placeholder="Nombre de Usuario" required
      className="round border bg-zinc-50 rounded-lg border-zinc-300 text-black p-2"/>

      <label htmlFor="email">Email</label>
      <input type="email" name="email" placeholder="Email" required 
      className="round border bg-zinc-50 rounded-lg border-zinc-300 text-black p-2"/>

      <label htmlFor="password">Contraseña</label>
      <input type="password" name="password" placeholder="Contraseña" required 
      className="round border bg-zinc-50 rounded-lg border-zinc-300 text-black p-2"/>

      <SubmitButton title="Registrarse" t1="Registrarse" t2="Registrando"
      className="rounded-lg cursor-pointer bg-blue-600 px-4 py-2 text-white mt-6 hover:bg-blue-500"/>
    </form>
  );
}