import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import EditAgendaForm from "@/components/maricure/EditAgendaForm";
import { Agenda } from "@/types/books";

export default async function AgendaEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await supabaseServerActionClient
    .from("Agenda")
    .select("*")
    .eq("id", id)
    .single();
  const agenda = data as Agenda;
  return (
    <div>
      <EditAgendaForm
        agendaId={id}
        initialFecha={agenda.fecha}
        initialFin={agenda.hora_fin}
        initialInicio={agenda.hora_inicio}
      />
    </div>
  );
}
