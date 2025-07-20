import { cookies } from "next/headers";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { getUsuarioById } from "@/utils/getUser";
import { Reserva } from "@/types/books";
import ConfirmReserva from "@/components/maricure/confirmReserva";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Calendar, Phone, User } from "lucide-react";
import DeleteReservaButton from "@/components/client/DeleteReservaButton";

export default async function ReservasPage() {
  const cookieStore = await cookies();
  const usuario = await getUsuarioById(cookieStore);

  const { data: agendas } = await supabaseServerActionClient
    .from("Agenda")
    .select("id")
    .eq("usuario_id", usuario.id);

  const agendaIds = agendas?.map((a) => a.id) ?? [];

  const { data: reserva } = await supabaseServerActionClient
    .from("Reserva")
    .select(
      `
    id,
    fecha_reserva,
    estado,
    clienta:clienta_id (
      nombre,
      telefono,
      tipo_usuario
    ),
    agenda:agenda_id (
      fecha,
      hora_inicio,
      hora_fin,
      usuario_id
    )
  `
    )
    .in("agenda_id", agendaIds);

  const reservas = reserva as unknown as Reserva[];
  if (!reservas || reservas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tenés reservas asignadas por el momento
      </div>
    );
  }

  return (
    <section className="py-8 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-pink-700 mb-6">
        Reservas recibidas
      </h1>
      <div className="space-y-4">
        {reservas.map((r) => (
          <div key={r.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="space-y-2 text-sm text-gray-700">
              <p className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-pink-600" />
                <span>
                  <strong>{r.agenda?.fecha}</strong> — {r.agenda?.hora_inicio}–
                  {r.agenda?.hora_fin}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-pink-600" />
                <span>
                  <strong>Clienta:</strong> {r.clienta?.nombre ?? "—"}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-600" />
                <span>
                  <strong>Teléfono:</strong> {r.clienta?.telefono ?? "—"}
                </span>
              </p>
            </div>
            <StatusBadge status={r.estado} />
            <ConfirmReserva reservaId={r.id} status={r.estado} />
            {r.estado !== "confirmado" && (
              <div className="mt-4">
                <DeleteReservaButton reservaId={r.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
