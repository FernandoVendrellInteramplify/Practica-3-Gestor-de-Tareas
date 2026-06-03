# Gestor de Tareas

Aplicación web de gestión de tareas desarrollada con Next.js, React, TypeScript, Tailwind CSS, SQLite y Auth.js.

## Tecnologías

| Tecnología           | Versión mínima  |
| -------------------- | --------------- |
| Next.js (App Router) | 16              |
| React                | 19              |
| TypeScript           | 5 (Strict Mode) |
| Tailwind CSS         | 4               |
| SQLite               | better-sqlite3  |
| Auth.js (NextAuth)   | v5              |
| bcryptjs             | última          |
| Sonner               | última          |

---

## Requisitos previos

* Node.js 22 o superior
* npm 10 o superior
* Git

Comprobar versiones:

```bash
node -v
npm -v
```

---

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

Instalar dependencias:

```bash
npm install
```

---

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
AUTH_SECRET=
AUTH_URL=http://localhost:3000
```

### AUTH_SECRET

Generar una clave segura:

```bash
openssl rand -base64 32
```

o

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiar el resultado en `AUTH_SECRET`.

## Ejecución en desarrollo

Iniciar el servidor:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

---

## Compilación para producción

Generar el build:

```bash
npm run build
```

Ejecutar:

```bash
npm start
```

---

