'use server'


import { revalidatePath } from 'next/cache';
import bcryptjs from "bcryptjs";
import db from "./db";
import { getUser } from './db';
import { signIn,signOut,auth } from "@/lib/auth";

const session = await auth();


export async function Registro(prevState: any, formData: FormData){
    const nombre = formData.get("nombre")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    

    if (!nombre || !email || !password) {
        return { success:false, error: "Faltan datos" };
    }

    const hash = await bcryptjs.hash(password, 10);

    try {
    db.prepare(`
        INSERT INTO usuarios (
            nombre,
            email,
            password_hash
        )
        VALUES (?, ?, ?)
    `).run(nombre, email, hash);
    } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return {
            error: "Correo ya registrado",
            success: false,
        };
    }

    throw error;
}
    return{
        success:true,
        error: null,};
}

export async function CrearTablon(formData: FormData): Promise<void>{

    const titulo = formData.get('titulo');
    const usuario_id = Number(formData.get('usuario_id'));


    if(usuario_id !== Number(session?.user.id)){return}

    db.prepare(`
        INSERT INTO tablones (
            usuario_id,
            titulo
        )
        VALUES (?,?)
        `).run(usuario_id, titulo);

    revalidatePath("/dashboard");
}

export async function CrearTarea(formData: FormData): Promise<void>{

    const titulo = formData.get('titulo');
    const tablon_id = Number(formData.get('tablon_id'));
    const descripcion = formData.get('descripcion');
    const usuario = getUser(tablon_id);


    if(usuario != Number(session?.user.id)){return}

    db.prepare(`
        INSERT INTO tareas(
            tablon_id,
            titulo,
            descripcion
        ) 
        VALUES (?,?,?)
        `).run(tablon_id,titulo,descripcion);


     revalidatePath("/dashboard");
}

export async function EditarEstado(formData: FormData): Promise<void>{

    const id = Number(formData.get('id'));
    const estado = formData.get('estado');

    db.prepare(`
        UPDATE tareas
        SET estado = ?
        WHERE id = ?
    `).run(estado,id);

     revalidatePath("/dashboard");
}

export async function Borrar(formData: FormData): Promise<void>{

    const tabla = formData.get('tabla');
    const id = Number(formData.get('id'));

    if (tabla === "tablones"){
        db.prepare(`
            DELETE FROM tablones
            WHERE id = ?
        `).run(id);
    }

    if (tabla === "tareas"){
        db.prepare(`
            DELETE FROM tareas
            WHERE id = ?
        `).run(id);
    }

     revalidatePath("/dashboard");
}

export async function loginAction(
  prevState: any,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return {
      success: true,
      error: null,
    };
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return {
        success: false,
        error: "Correo o contraseña incorrectos",
      };
    }
    throw error;
  }
}

export async function logoutAction(
    prevState: any,
    formData: FormData
) {
    await signOut({redirect: false,}); 
    return{success: true,};
}

export async function moverTarea(id:number,tablon_id:number) {
    db.prepare(`
    UPDATE tareas
    SET tablon_id = ?
    WHERE id = ?
  `).run(tablon_id, id);

  revalidatePath("/dashboard");
    
}