import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import FormCalificacion from "@/components/client/formCalificacion";
import { ButtonBack } from "@/components/ui/ButtonBack";
import { IBooks } from "@/types/books";
import { getUsuarioById } from "@/utils/getUser";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Calificar | Mi Manicurista",
  description: "Calificar",
};

export default async function CalificarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const user = await getUsuarioById(cookiesStore);
  const { data } = await supabaseServerActionClient
    .from("Reserva")
    .select(
      `
    id,
    agenda:agenda_id (
      perfil:perfil_id (
        id,
        perfil:usuario_id (
            id ,
            nombre,
            telefono
        )
      )
    )
  `
    )
    .eq("id", id)
    .single();
  const reserva = data as unknown as IBooks;

  return (
    <>
      <ButtonBack />
      <div className="max-w-md mx-auto my-8 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold text-pink-700 text-center mb-4">
          Calificar atención recibida
        </h2>

        <FormCalificacion
          reserva_id={id}
          userId={user.id ?? ""}
          manicuristaId={reserva.agenda?.perfil.perfil.id}
        />
      </div>
    </>
  );
}
