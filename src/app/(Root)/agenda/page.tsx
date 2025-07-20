import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { DeleteAgenda } from "@/components/maricure/deleteAgenda";
import { AgendaItem } from "@/types/books";
import { getUsuarioById } from "@/utils/getUser";
import { EditIcon } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agenda | Mi Manicurista",
  description: "Agenda",
};
export default async function AgendaPage() {
  const cookieStore = await cookies();
  const user = await getUsuarioById(cookieStore);

  const { data } = await supabaseServerActionClient
    .from("Agenda")
    .select("*")
    .eq("usuario_id", user.id);
  const agendas = data as AgendaItem[];
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-pink-700">
          Mis bloques de agenda
        </h2>
        <Button variant="link" className="text-pink-700">
          <Link href="profile/agenda">
            <Label className="text-pink-700">Agregar Agenda</Label>
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {agendas?.map((bloque) => (
          <div
            key={bloque.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-700">
                <strong>{bloque.fecha}</strong>
              </p>
              <p className="text-sm text-gray-700">
                {bloque.hora_inicio} – {bloque.hora_fin}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/agenda/${bloque.id}`}
                className="text-sm text-gray-600 hover:text-pink-600"
              >
                <EditIcon />
              </Link>
              <DeleteAgenda agendaId={bloque.id} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
