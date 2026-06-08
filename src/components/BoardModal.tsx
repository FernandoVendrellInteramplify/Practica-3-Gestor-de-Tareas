"use client";

import { useState } from "react";
import Confirm from "./confirm";
import { SubmitButton } from "./confirm";


type BoardModalProps = {
  title: string;
  user_id: string;
  buttonText: string;
  submitText: string;

  formAction: (
    formData: FormData
  ) => Promise<void>;
}

export default function BoardModal({
  title,
  user_id,
  buttonText,
  submitText,
  formAction,
}: BoardModalProps) {
    const [open, setOpen] =
    useState(false);

    const [titulo, setTitulo] = useState("");

    return (
        <>
            <button type="button" onClick={() => setOpen(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                {buttonText}
            </button>

            {open&&(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ">
                    <section>
                        <div>
                            <h2>
                                {title}
                            </h2>
                        </div>

                        <Confirm formAction={async (formData) => {await formAction(formData);setOpen(false);}}
                            message="¿Crear este tablón?" successMessage={`Tablón "${titulo}" creado correctamente`}
                                className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 md:grid-cols-2">

                            <input type="hidden" name="usuario_id" required value={user_id}/>

                            <input type="text" name="titulo" required value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Nombre del Tablón"/>

                            <div className="mt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setOpen(false)}
                                className="rounded-xl bg-red-700 px-4 py-2 text-zinc-50 hover:bg-red-600">
                                    Cancelar
                                </button>
                                <SubmitButton title={submitText} className="rounded-xl bg-blue-600 px-4 py-2 text-zinc-50 hover:bg-blue-500" t1={submitText} t2="" />
                            </div>
                        </Confirm>

                    </section>
                </div>
            )}
        </>
    )
}

