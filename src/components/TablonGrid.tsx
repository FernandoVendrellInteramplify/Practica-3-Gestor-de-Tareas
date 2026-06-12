"use client"

import { TablonConTareas} from "@/types";
import TaskModal from "@/components/TaskModal";
import { CrearTarea,Borrar,EditarEstado, moverTarea } from "@/lib/actions";
import Confirm from "./confirm";
import { SubmitButton } from "./confirm";
import { Trash2, Ban, Check } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState, useEffect} from "react";



interface TablonesGridProps {
  tablones: TablonConTareas[];
}

export function TablonesGrid({tablones }: TablonesGridProps) {
   const [data, setData] = useState(tablones);

   useEffect(() => {
  setData(tablones);
}, [tablones]);

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

const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {return;}

    const sourceBoardIndex = data.findIndex(
      (t) => String(t.id) === source.droppableId);

    const destBoardIndex = data.findIndex(
      (t) => String(t.id) === destination.droppableId);

    const sourceBoard = data[sourceBoardIndex];
    const destBoard = data[destBoardIndex];

    const sourceTasks = [...sourceBoard.tareas];
    const destTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destBoard.tareas];

    const [movedTask] = sourceTasks.splice(source.index, 1);

    destTasks.splice(destination.index, 0, movedTask);

    const newData = [...data];

    newData[sourceBoardIndex] = {...sourceBoard,tareas: sourceTasks,};

    newData[destBoardIndex] = {...destBoard,tareas: destTasks,};

    setData(newData);

    moverTarea(movedTask.id,Number(destination.droppableId));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="animate-[fadeUp_0.6s_ease-out] grid grid-cols-3 gap-6 justify-center p-4 text-black">
        {data.map((tablon) => (
          <Droppable key={tablon.id} droppableId={String(tablon.id)}>
            {(provided) => (
              <div
                ref={provided.innerRef}{...provided.droppableProps}
                className={`w-80 shrink-0 rounded-xl border p-4 shadow ${colores[Number(tablon.id) % 5]}`}>

                <h2 className="mb-4 text-xl font-bold text-black">
                  {tablon.titulo}
                </h2>

                <div className="space-y-3 min-h-[100px]">
                  {tablon.tareas.length === 0 ? (
                    <p className="text-sm text-zinc-500">Sin tareas</p>
                  ) : (
                    tablon.tareas.map((tarea, index) => (
                      <Draggable key={tarea.id} draggableId={String(tarea.id)} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps}
                            className={`rounded-lg border p-3
                              ${coloresT[Number(tablon.id) % 5]}
                              ${tarea.estado === "Completado"? "text-zinc-500": ""}
                              ${tarea.estado === "Anulada"? "line-through text-zinc-500": ""}`}>

                            <h3 className="font-bold">
                              {`${tarea.titulo} ${tarea.estado === "Completado"? "✓": ""}`}
                            </h3>

                            {tarea.descripcion && (
                              <p className="mt-1 text-sm">
                                {tarea.descripcion}
                              </p>)}

                            <div className="flex gap-2 items-center">
                              <span
                                className={`mt-2 inline-block rounded px-2 py-1 text-xs font-semibold ${
                                  colores[
                                    Number(tablon.id) % 5
                                  ]
                                }`}
                              >
                                {tarea.estado}
                              </span>

                              <Confirm formAction={EditarEstado} message="¿Marcar tarea como completada?" successMessage="Tarea Completada">
                                <input type="hidden" name="id" value={tarea.id}/>
                                <input type="hidden" name="estado" value="Completado"/>

                                <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Tarea completa" className="mt-2 cursor-pointer inline-block rounded-lg bg-green-400 p-1 text-zinc-50 hover:bg-green-600" t2="">
                                <Check />
                                </SubmitButton>

                            </Confirm>

                            <Confirm formAction={EditarEstado} message="¿Marcar tarea como anulada?" successMessage="Tarea Anulada">
                                <input type="hidden" name="id" value={tarea.id}/>
                                <input type="hidden" name="estado" value="Anulada"/>

                                <SubmitButton  disabled={tarea.estado !== "Pendiente"} title="Anular tarea" className="mt-2 cursor-pointer inline-block rounded-lg bg-orange-300 p-1 text-zinc-50 hover:bg-orange-600" t2="">
                                <Ban/>
                                </SubmitButton>

                            </Confirm>
                            <Confirm formAction={Borrar} message="¿Desea eliminar esta tarea?" successMessage="Tarea eliminada correctamente">
                                <input type="hidden" name="id" value={tarea.id}/>
                                <input type="hidden" name="tabla" value="tareas"/>

                                <SubmitButton title="Eliminar tarea" className="mt-2 cursor-pointer inline-block rounded-lg bg-red-500 p-1 text-zinc-50 hover:bg-red-600" t2=""> 
                                    <Trash2/>
                                </SubmitButton>
                                      
                            </Confirm>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}

                  {provided.placeholder}
                </div>

                <div className="flex gap-2 p-2">
                  <TaskModal title="Añadir nueva tarea" tablon_id={tablon.id} submitText="Añadir" formAction={CrearTarea} />

                  <Confirm formAction={Borrar} message="¿Desea eliminar este tablón?" successMessage="Tablón eliminado correctamente">
                    <input type="hidden" name="id" value={tablon.id}/>
                    <input type="hidden" name="tabla" value="tablones"/>

                    <SubmitButton title="Eliminar tablón" t2=""
                      className="rounded-lg cursor-pointer bg-red-500 p-2 text-sm font-medium text-zinc-50 hover:bg-red-700">
                      <Trash2 />
                    </SubmitButton>
                  </Confirm>
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
