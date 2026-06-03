import { TablonConTareas} from "@/types";
import TaskModal from "@/components/TaskModal";
import { CrearTarea,Borrar,EdiarEstado } from "@/lib/actions";
import Confirm from "./confirm";
import { SubmitButton } from "./confirm";



interface TablonesGridProps {
  tablones: TablonConTareas[];
}

export function TablonesGrid({
  tablones,
}: TablonesGridProps) {
  return (
    <div className="flex gap-6 overflow-x-auto p-4">
      {tablones.map((tablon) => (
        <div key={tablon.id}
          className="w-80 shrink-0 rounded-xl border border-zinc-200 bg-white p-4 shadow dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-bold">
                {tablon.titulo}
            </h2>

            <div className="space-y-3">
                {tablon.tareas.length === 0 ? (
                <p className="text-sm text-zinc-500">Sin tareas</p>
                ) : (
                tablon.tareas.map((tarea) => (
                <div key={tarea.id}
                  className={`rounded-lg border border-zinc-200 p-3 dark:border-zinc-700
                    ${tarea.estado === "Completado" ? "text-zinc-400" : ""}
                    ${tarea.estado === "Anulada" ? "line-through text-zinc-500" : ""}`}>
                    <h3 className="font-medium">
                        {tarea.titulo}
                    </h3>

                  {tarea.descripcion && (
                    <p className="mt-1 text-sm text-zinc-500">
                      {tarea.descripcion}
                    </p>
                  )}

                    <div className="flex gap-2 items-center">
                        <span className="mt-2 inline-block rounded bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800">
                            {tarea.estado}
                        </span>

                        <Confirm formAction={EdiarEstado} message="¿Marcar tarea como completada?" successMessage="Tarea Completada">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="estado" value="Completado"/>

                            <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Tarea completa" className="mt-2 inline-block rounded-lg bg-green-600 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-green-700"
                            t1="✓"  t2="" />

                        </Confirm>

                        <Confirm formAction={EdiarEstado} message="¿Marcar tarea como anulada?" successMessage="Tarea Anulada">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="estado" value="Anulada"/>

                            <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Anular tarea" className="mt-2 inline-block rounded-lg bg-orange-400 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-orange-600"
                            t1="⊘"  t2="" />

                        </Confirm>
                        <Confirm formAction={Borrar} message="¿Desea eliminar esta tarea?" successMessage="Tarea eliminada correctamente">
                            <input type="hidden" name="id" value={tarea.id}/>
                            <input type="hidden" name="tabla" value="tareas"/>

                            <SubmitButton title="Eliminar tarea" className="mt-2 inline-block rounded-lg bg-red-600 px-2 py-1 text-sm font-medium text-zinc-50 hover:bg-red-700"
                            t1="🗑" t2=""/>
                                  
                        </Confirm>
                    </div>
                </div>
                ))
                )}
            </div>
            <div className="flex gap-2">
                <TaskModal title="Añadir nueva tarea" tablon_id={tablon.id} buttonText="📝" submitText="añadir" formAction={CrearTarea}/>
                <Confirm formAction={Borrar} message="¿Desea eliminar este tablon?" successMessage="Tablon eliminado correctamente">
                    <input type="hidden" name="id" value={tablon.id}/>
                    <input type="hidden" name="tabla" value="tablones"/>

                    <button type="submit" title="Eliminar tablón" className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-zinc-50 hover:bg-red-700">
                        🗑
                    </button>
                </Confirm>
            </div>
        </div>
      ))}
    </div>
  );
}