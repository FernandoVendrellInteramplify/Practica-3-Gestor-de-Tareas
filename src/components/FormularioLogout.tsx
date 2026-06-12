"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutAction } from "@/lib/actions";
import { SubmitButton } from "./confirm";

const initialState = {
  success: false,
  error: null as string | null,
};

export default function LogoutForm() {
  const router = useRouter();

  const [state, formAction] = useActionState(
    logoutAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Sesrion Cerrada correctamente");

      setTimeout(() => {
        router.push("/login");
      }, 10);
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>

      <SubmitButton title="Cerrar sesion" className="animate-[fadeRight_0.5s_ease-out] cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 hover:scale-101" 
       t2="Cerrando">
        Cerrar sesion
      </SubmitButton>
        
    </form>
  );
}

export function RefreshOnMount() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return null;
}