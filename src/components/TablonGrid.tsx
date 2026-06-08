import { TablonConTareas} from "@/types";
import TaskModal from "@/components/TaskModal";
import { CrearTarea,Borrar,EditarEstado } from "@/lib/actions";
import Confirm from "./confirm";
import { SubmitButton } from "./confirm";



interface TablonesGridProps {
  tablones: TablonConTareas[];
}

export function TablonesGrid({
  tablones,
}: TablonesGridProps) {

const colores = [
  "bg-yellow-100 border-yellow-200 ",
  "bg-rose-100 border-rose-200 ",
  "bg-sky-100 border-sky-200 ",
  "bg-lime-100 border-lime-200",
  "bg-orange-100 border-orange-200",
];
const coloresT = [
  "bg-yellow-200 border-yellow-300",
  "bg-rose-200 border-rose-300",
  "bg-sky-200 border-sky-300",
  "bg-lime-200 border-lime-300",
  "bg-orange-200 border-orange-300",
];

  return (
    <div className="animate-[fadeUp_0.6s_ease-out] grid grid-cols-3 gap-6 justify-center p-4 text-black">
      {tablones.map((tablon) => (
        
        <div key={tablon.id}
          className={`w-80 shrink-0 rounded-xl border p-4 shadow ${colores[Number(tablon.id) % 5]}`}>
            <h2 className="mb-4 text-xl font-bold text-black">
                {tablon.titulo}
            </h2>

            <div className="space-y-3">
                {tablon.tareas.length === 0 ? (
                <p className="text-sm text-zinc-500">Sin tareas</p>
                ) : (
                tablon.tareas.map((tarea) => (
                <div key={tarea.id}
                  className={`rounded-lg border p-3
                    ${coloresT[Number(tablon.id) % 5]}
                    ${tarea.estado === "Completado" ? "text-zinc-500" : ""}
                    ${tarea.estado === "Anulada" ? "line-through text-zinc-500" : ""}`}>
                    <h3 className="font-bold">
                        {`${tarea.titulo} ${tarea.estado === "Completado" ? " ✓" : ""}`}
                    </h3>

                  {tarea.descripcion && (
                    <p className={`mt-1 text-sm ${tarea.estado === "Pendiente"? "text-zinc-700" : ""}
                     ${tarea.estado === "Completado" ? "text-zinc-500" : ""}
                     ${tarea.estado === "Anulada" ? "line-through text-zinc-500" : ""}`}>
                      {tarea.descripcion}
                    </p>
                  )}

                    <div className="flex gap-2 items-center">
                        <span className={`mt-2 inline-block font-semibold rounded text-black ${colores[Number(tablon.id) % 5]}  px-2 py-1 text-xs`} >
                            {tarea.estado}
                        </span>

                        <Confirm formAction={EditarEstado} message="¿Marcar tarea como completada?" successMessage="Tarea Completada">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="estado" value="Completado"/>

                            <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Tarea completa" className="mt-2 cursor-pointer inline-block rounded-lg bg-green-400 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-green-600"
                            t1="✓"  t2="" />

                        </Confirm>

                        <Confirm formAction={EditarEstado} message="¿Marcar tarea como anulada?" successMessage="Tarea Anulada">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="estado" value="Anulada"/>

                            <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Anular tarea" className="mt-2 cursor-pointer inline-block rounded-lg bg-orange-300 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-orange-600"
                            t1="⊘"  t2="" />

                        </Confirm>
                        <Confirm formAction={Borrar} message="¿Desea eliminar esta tarea?" successMessage="Tarea eliminada correctamente">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="tabla" value="tareas"/>

                            <SubmitButton title="Eliminar tarea" className="mt-2 cursor-pointer inline-block rounded-lg bg-red-400 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-red-600"
                            t1="🗑" t2=""/>
                                  
                        </Confirm>
                    </div>
                </div>
                ))
                )}
            </div>
            <div className="flex gap-2 p-2">
                <TaskModal title=" Añadir nueva tarea" tablon_id={tablon.id} buttonText="📝" submitText="Añadir" formAction={CrearTarea}/>
                <Confirm formAction={Borrar} message="¿Desea eliminar este tablon?" successMessage="Tablon eliminado correctamente">
                    <input type="hidden" name="id" value={tablon.id}/>
                    <input type="hidden" name="tabla" value="tablones"/>

                    <SubmitButton title="Eliminar tablón" className="rounded-lg cursor-pointer bg-red-500 px-3 py-2 text-sm font-medium text-zinc-50 hover:bg-red-700"
                     t1="🗑" t2=""/>
                </Confirm>
            </div>
        </div>
      ))}
    </div>
  );
}