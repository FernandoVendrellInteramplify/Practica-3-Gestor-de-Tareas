import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BoardModal from "@/components/BoardModal";
import { CrearTablon } from "@/lib/actions";
import { getTablonUsuario, getTareaTablon} from "@/lib/db";
import { TablonesGrid } from "@/components/TablonGrid";
import LogoutForm from "@/components/FormularioLogout";
import { RefreshOnMount } from "@/components/FormularioLogout";

export default async function DashboardPage() {

    const session = await auth();

    if(!session){redirect("/login");}

    const tablones = getTablonUsuario(session.user.id);
    const tablonesConTareas = tablones.map((tablon) => 
        ({...tablon,
        tareas: getTareaTablon(String(tablon.id)),
        }));

    return (
        <div>
            <RefreshOnMount />
            <h1>Dashboard</h1>  
            <p>
                Hola {session.user.name}
            </p>
            <section>
                <TablonesGrid tablones={tablonesConTareas}/>

            </section>

            
            <BoardModal title="Crear Tablon" user_id={session.user.id} buttonText="Nuevo Tablon"
            submitText="Crear" formAction={CrearTablon}/>  


            <LogoutForm />

        </div>

    );
}