'use client'

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

type ActionResult = {
  redirectTo?: string;
};

type ConfirmProps = {
  formAction: (formData: FormData) => Promise<ActionResult | void>;
  message: string;
  successMessage?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Confirm({
  formAction,
  message,
  successMessage,
  children,
  className,
}: ConfirmProps) {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [success, setSuccess] =
    useState(false);

  const [pendingData, setPendingData] =
    useState<FormData | null>(null);

  async function handleSubmit(
    formData: FormData
  ) {

    setPendingData(formData);

    setOpen(true);
  }

  async function confirmAction() {

    if (!pendingData) return;

    const result = await formAction(pendingData);

    setOpen(false);

    toast.success(successMessage);

    if (result?.redirectTo) {
      setTimeout(() => {
            router.push(result.redirectTo!);
        }, 10);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);}
  }

  return (
    <>
      <form action={handleSubmit} className={className}>
        {children}
      </form>

      {/*Confirmación */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50">
          <div className="animate-[fadeUp_0.2s_ease-out] w-full max-w-md rounded-2xl bg-zinc-100 p-6 shadow-2xl border border-zinc-200 shadow-blue-600/30 dark:bg-zinc-800 dark:border-zinc-950">

            <p className="mt-3 text-zinc-700 text-center dark:text-zinc-300">
              {message}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" onClick={() => setOpen(false)}
                className="rounded-xl bg-red-700 px-4 py-2 text-zinc-50 hover:bg-red-600">
                Cancelar
              </button>
              
              <button type="button" onClick={confirmAction}
                className="rounded-xl bg-blue-600 px-4 py-2 text-zinc-50 hover:bg-blue-400 cursor-pointer">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface SubmitButtonProps {
  className?: string;
  title: string
  t1: string;
  t2: string;
  disabled?:boolean;
}


export function SubmitButton({title, className, t1, t2}:SubmitButtonProps) {
  const { pending } = useFormStatus();

  const boton = t2==="";

  return (
    <button
      type="submit"
      title= {title}
      disabled={pending}
      className= {className}
    >
    {pending ? t2 : t1}

    {pending && boton &&(<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />)}
     
    </button>
  );
}