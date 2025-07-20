import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { Label } from "@/components/label";
import EditImageProfile from "@/components/maricure/EditImageProfile";
import EditPerfilFormManicurie from "@/components/maricure/EditPerfilForm";
import { ButtonBack } from "@/components/ui/ButtonBack";
import { Card } from "@/components/ui/card";
import { IEditManicure } from "@/types/users";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Perfil | Mi Manicurista",
  description: "Perfil",
};
export default async function EditPerfilManicurePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabaseServerActionClient
    .from("Usuario")
    .select(
      `
    id,
    nombre,
    correo,
    telefono,
    rut,
    tipo_usuario,
    perfil:PerfilManicurista (
        id,
        modalidad_atencion,
        disponibilidad,
        servicio_id,
        perfil_url,
        fotos_trabajos_id,
        ubicacion,
        latitud,
        longitud
    )
  `
    )
    .eq("id", id)
    .single();

  const manicure = data as IEditManicure;

  return (
    <>
      <ButtonBack />
      <div className=" flex flex-col items-center justify-center">
        <Card className="p-6 space-y-4 mt-3 ">
          <h2 className="text-lg font-semibold text-gray-800">Editar perfil</h2>
          <div className="space-y-2">
            <Label htmlFor="perfil_url">Foto de perfil</Label>
            <EditImageProfile userId={manicure.id} />
          </div>
          <EditPerfilFormManicurie manicure={manicure} />
        </Card>
      </div>
    </>
  );
}
