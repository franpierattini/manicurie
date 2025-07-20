// File: app/manicurista/agenda/page.tsx

import FormCrearAgenda from "@/components/agenda/FormCrearAgenda";
import { ButtonBack } from "@/components/ui/ButtonBack";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "Agenda| Mi Manicurista",
  description: "Agenda",
};
export default async function AgendaPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div className="text-center py-12">❌ Debes iniciar sesión</div>;
  }

  const { data: perfil } = await supabase
    .from("PerfilManicurista")
    .select("*")
    .eq("usuario_id", user.id)
    .single();

  if (!perfil) {
    return (
      <div className="text-center py-12">
        Solo manicuristas pueden acceder aquí
      </div>
    );
  }

  return (
    <>
      <ButtonBack />
      <div className="max-w-xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-pink-700 mb-6">
          Crear disponibilidad
        </h1>
        <FormCrearAgenda manicuristaId={perfil.id} userId={user.id ?? ""} />
      </div>
    </>
  );
}
