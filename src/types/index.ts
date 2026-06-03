import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {id: string;} & DefaultSession["user"];
    }

    interface User {id: string;}
}


export type Estado= |'Pendiente'|'Completado'|'Anulada';

export interface Tarea{
    id:number;
    titulo:string;
    descripcion:string;
    estado:Estado;
}
export interface Usuario{
    id:string;
    nombre:string;
    email:string;
    password_hash:string;
}
export interface Tablon{
    id:string
    titulo:string
}
export interface TablonConTareas {
  id: string;
  titulo: string;
  tareas: Tarea[];
}