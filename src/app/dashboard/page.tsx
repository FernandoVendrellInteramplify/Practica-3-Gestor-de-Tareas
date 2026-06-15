import { auth } from "@/lib/auth";
import BoardModal from "@/components/BoardModal";
import { CrearTablon } from "@/lib/actions";
import { getTablonUsuario, getTareaTablon} from "@/lib/db";
import { TablonesGrid } from "@/components/TablonGrid";
import LogoutForm from "@/components/FormularioLogout";
import { RefreshOnMount } from "@/components/FormularioLogout";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
     console.log("RENDER DASHBOARD", new Date().toISOString());

    const session = await auth();

    

    const tablones = getTablonUsuario(session!.user.id);
    const tablonesConTareas = tablones.map((tablon) => 
        ({...tablon,
        tareas: getTareaTablon(String(tablon.id)),
        }));

    return (
        <main className="min-h-screen bg-zinc-200 font-sans p-8">
            <RefreshOnMount />

            <div className="mx-auto max-w-7xl">
            <header className="mb-8 flex items-center justify-between">
                <div>
                <h1 className="animate-[fadeLeft_0.3s_ease-out] text-4xl text-black font-bold tracking-tight">
                    Tus Tablones
                </h1>

                <p className="animate-[fadeLeft_0.5s_ease-out] mt-2 text-zinc-600">
                    Bienvenido, {session!.user.name}
                </p>
                </div>

                <LogoutForm />
            </header>

            
                <BoardModal
                title="Crear Tablon"
                user_id={session!.user.id}
                buttonText={<span className="flex items-center gap-2">
                    <Plus size={16} />
                    Nuevo tablón
                    </span>
                }
                submitText="Crear"
                formAction={CrearTablon}
                />
            

            <section>
                <TablonesGrid tablones={tablonesConTareas} />
            </section>
            </div>
        </main>
    );
}