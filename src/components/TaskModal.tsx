"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SubmitButton } from "./confirm";
import { PenLine, ClipboardPlus } from "lucide-react";



type TaskModalProps = {
    title: string;
    tablon_id: string;
    submitText: string;

    formAction: (
        formData: FormData
    ) => Promise<void>;
}

export default function TaskModal({
  title,
  tablon_id,
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
                <PenLine/>
            </button>

            {open&&(
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <section className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95">
                        <div className="border-b border-zinc-200 bg-blue-600 px-6 py-4">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                                <ClipboardPlus className="h-5 w-5" />
                                {title}
                            </h2>
                        </div>

                        <form action={async (formData) => {await formAction(formData);
                         toast.success(`Tarea "${titulo}" añadida correctamente`);
                         setOpen(false);setTitulo("");}} className="space-y-5 p-6">

                            <input type="hidden" name="tablon_id" value={tablon_id} />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="titulo" className="text-sm font-semibold text-zinc-700">
                                Título de la tarea
                                </label>
                                <input type="text" name="titulo" required value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Titulo de la tarea"
                                className="rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="descripcion" className="text-sm font-semibold text-zinc-700">
                                Descripción
                                </label>
                                <textarea name="descripcion" required rows={4} placeholder="Describe la tarea..."
                                className="resize-none rounded-lg border border-zinc-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"/>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
                                <button type="button" onClick={() => {setOpen(false); setTitulo("");}}
                                className="rounded-lg border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:bg-zinc-100">
                                Cancelar
                                </button>

                                <SubmitButton title={submitText} t2=""
                                className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500">
                                {submitText}
                                </SubmitButton>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </>
    )
}