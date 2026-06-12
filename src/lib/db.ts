import Database from "better-sqlite3";
import { Usuario, Tablon, Tarea } from "@/types";

const db= new Database('taskdoit.db');

db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS tablones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tablon_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    estado TEXT NOT NULL DEFAULT 'Pendiente'
        CHECK(estado IN ('Pendiente', 'Completado', 'Anulada')),

    FOREIGN KEY (tablon_id)
        REFERENCES tablones(id)
        ON DELETE CASCADE
);
`);

export function getUsuarioEmail(email:string): Usuario | undefined {
    return db.prepare(`
      SELECT
        id,
        nombre,
        email,
        password_hash
      FROM usuarios 
      WHERE email =?
    `).get(email) as Usuario | undefined;
}

export function getTablonUsuario(user_id:string):Tablon[]{
    const datos= db.prepare(`
        SELECT
         id,
         titulo
        FROM tablones
        WHERE usuario_id =?
        `).all(user_id) as Tablon[];
        return datos;
}

export function getTareaTablon(tablon_id:string):Tarea[]{
    return db.prepare(`
        SELECT
         id,
         titulo,
         descripcion,
         estado
        FROM tareas
        WHERE tablon_id =?
        `).all(tablon_id) as Tarea[];
}

export function getEmail(email:string): Boolean{
    if(
        db.prepare(`
            SELECT
            email
            FROM usuarios
            WHERE email =?
            `).get(email) === email
    ){return true} else{
        return false
    }
}

export default db; 