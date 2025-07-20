import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { Button } from "@/components/button";
import DeleteReservaButton from "@/components/client/DeleteReservaButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { IBooks } from "@/types/books";
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  ScanEye,
  User,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Reservas | Mi Manicurista",
  description: "Reservas",
};
export default async function MyBooks() {
  const {
    data: { user },
  } = await supabaseServerActionClient.auth.getUser();

  const { data: book } = await supabaseServerActionClient
    .from("Reserva")
    .select(
      `
    id,
    estado,
    precio,
    fecha_reserva,
    clienta_id,
    agenda:agenda_id (
      fecha,
      hora_inicio,
      hora_fin,
      perfil:perfil_id (
        id,
        ubicacion,
        latitud,
        longitud,
        modalidad_atencion,
        perfil:usuario_id (
          nombre,
          telefono
        )
      )
    )
  `
    )
    .eq("clienta_id", user?.id);

  const books = book as unknown as IBooks[];

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-6 flex items-center gap-2">
        <ScanEye className="w-5 h-5" />
        Mis reservas
      </h2>

      <div className="space-y-6">
        {books.map((reserva) => (
          <div
            key={reserva.id}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-pink-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                {reserva.agenda.perfil.perfil.nombre}
              </h3>
              <StatusBadge status={reserva.estado} />
            </div>

            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.fecha}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500" />
                <span>
                  {reserva.agenda.hora_inicio} – {reserva.agenda.hora_fin}
                </span>
              </li>

              <li className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.modalidad_atencion}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.ubicacion}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500" />
                <span>{reserva.agenda.perfil.perfil.telefono}</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-pink-500" />
                <span>${reserva.precio}</span>
              </li>
            </ul>
            <div className="flex items-center justify-end">
              <Link
                target="_blank"
                href={`https://www.google.com/maps?q=${reserva.agenda.perfil.latitud},${reserva.agenda.perfil.longitud}`}
              >
                <Button
                  variant="link"
                  className="flex items-center gap-1 text-pink-600"
                >
                  <MapPin />
                  Ubicacion
                </Button>
              </Link>
              {reserva.estado === "confirmado" && (
                <Link href={`/calificar/${reserva.id}`}>
                  <Button className="bg-pink-600 hover:bg-pink-800">
                    Calificar
                  </Button>
                </Link>
              )}
            </div>
            {reserva.estado !== "confirmado" && (
              <div className="mt-4">
                <DeleteReservaButton reservaId={reserva.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
