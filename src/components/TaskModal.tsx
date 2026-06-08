"use client";

import { useState } from "react";
import Confirm from "./confirm";
import { SubmitButton } from "./confirm";


type TaskModalProps = {
    title: string;
    tablon_id: string;
    buttonText: string;
    submitText: string;

    formAction: (
        formData: FormData
    ) => Promise<void>;
}

export default function TaskModal({
  title,
  tablon_id,
  buttonText,
  submitText,
  formAction,
}: TaskModalProps) {
    const [open, setOpen] =
    useState(false);

    const [titulo, setTitulo] = useState("");


    return (
        <>
            <button type="button" onClick={() => setOpen(true)} title="Añadir Tarea"
                className="rounded-lg bg-blue-500 px-2 py-2 text-sm font-medium text-zinc-50 hover:bg-blue-700">
                {buttonText}
            </button>

            {open&&(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 dark:text-white">
                    <section>
                        <div className="w-42  rounded-2xl justify-text-center text-zinc-100 bg-blue-600"> 
                            <h2 className="text-center font-bold p-2">
                                {title}
                            </h2>
                        </div>

                        <Confirm formAction={async (formData) => {await formAction(formData);setOpen(false);}}
                         message="¿Añadir esta tarea?" successMessage={`Tarea "${titulo}" añadida correctamente`}
                         className="grid gap-4 rounded-2xl border border-zinc-600 bg-zinc-400 p-6 text-black md:grid-cols-2">
                                                     
                            <input type="hidden" name="tablon_id" value={tablon_id}/>
                            
                            <label htmlFor="titulo" className="font-semibold" >Tutulo de la Tarea</label>
                            <input type="text" name="titulo" required value={titulo} onChange={(e) => setTitulo(e.target.value)}
                            className="bg-zinc-200 rounded"/>
                 
                            <label htmlFor="descripcion" className="font-semibold">Descripcion de la tarea</label>
                            <input type="text" name="descripcion" required className="bg-zinc-200 rounded"/>
                            
                            <div className="mt-4 flex justify-end font-bold  gap-3">
                                <button type="button" onClick={() => setOpen(false)}
                                className="rounded-xl bg-red-700 px-4 py-2 text-zinc-50 hover:bg-red-600">
                                    Cancelar
                                </button>
                                <SubmitButton title={submitText}
                                className="rounded-xl bg-blue-600 px-4 py-2 text-zinc-50 hover:bg-blue-500" t1={submitText} t2="" />
                    
                            </div>
                        </Confirm>

                    </section>
                </div>
            )}
        </>
    )
}