import { getUsuarioById } from "@/utils/getUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CardResumen } from "@/components/maricure/cardResumen";
import { CalendarDays, Clock, ListChecks } from "lucide-react";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Inicio | Mi Manicurista",
  description: "Inicio",
};

export default async function Page() {
  const cookieStore = await cookies();
  const usuario = await getUsuarioById(cookieStore);

  if (usuario.tipo_usuario === "clienta") {
    redirect("/manicuristas");
  }

  if (!usuario) {
    return <div>No se encontró el usuario</div>;
  }

  const { data: agendas } = await supabaseServerActionClient
    .from("Agenda")
    .select("id")
    .eq("usuario_id", usuario.id);

  const agendaIds = agendas?.map((a) => a.id) ?? [];
  const fechaHoy = new Date().toISOString().split("T")[0];

  const { count: reservasHoy } = await supabaseServerActionClient
    .from("Reserva")
    .select("*", { count: "exact", head: true })
    .in("agenda_id", agendaIds)
    .gte("fecha_reserva", fechaHoy);

  const { count: turnosPendientes } = await supabaseServerActionClient
    .from("Reserva")
    .select("*", { count: "exact", head: true })
    .in("agenda_id", agendaIds)
    .eq("estado", "pendiente");
  const { data: reservas } = await supabaseServerActionClient
    .from("Reserva")
    .select("agenda_id");

  const agendaOcupadas = reservas?.map((r) => r.agenda_id) ?? [];

  const { count: agendasDisponibles } = await supabaseServerActionClient
    .from("Agenda")
    .select("*", { count: "exact", head: true })
    .eq("usuario_id", usuario.id)
    .not("id", "in", `(${agendaOcupadas.join(",")})`);

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">
        Hola, {usuario.nombre} ¿Lista para trabajar hoy?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/reservas">
          <CardResumen
            title="Reservas de hoy"
            value={reservasHoy ?? 0}
            icon={CalendarDays}
          />
        </Link>
        <Link href="/reservas">
          <CardResumen
            title="Turnos pendientes"
            value={turnosPendientes ?? 0}
            icon={Clock}
          />
        </Link>
        <Link href="/agenda">
          <CardResumen
            title="Agendas disponibles"
            value={agendasDisponibles ?? 0}
            icon={ListChecks}
          />
        </Link>
      </div>
    </section>
  );
}
