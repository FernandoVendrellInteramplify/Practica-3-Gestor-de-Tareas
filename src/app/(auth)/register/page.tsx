
import { Registro } from "@/lib/actions";

export default function PaginaResgistro(){

    return(
        <main>
            <div>
                <header>
                    <h1>
                        Registro
                    </h1>
                </header>
                <section>
                    <form action={Registro}>
                        <input type="text" name="nombre" placeholder="Nombre de usuario" required/>

                        <input type="email" name="email" placeholder="Email" required/>

                        <input type="password" name="password" placeholder="Contraseña" required/>

                        <button  type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
                            Registrarse
                        </button>

                    </form>
                </section>
            </div>
        </main>
    )
}