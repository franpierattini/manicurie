import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import EditProfileForm from "@/components/client/EditProfileForm";
import { ButtonBack } from "@/components/ui/ButtonBack";
import { Card } from "@/components/ui/card";
import { IUser } from "@/types/users";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Perfil | Mi Manicurista",
  description: "Perfil",
};
export default async function EditPerfilClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await supabaseServerActionClient
    .from("Usuario")
    .select("*")
    .eq("id", id)
    .single();

  const clienta = data as IUser;
  return (
    <>
      <ButtonBack />
      <Card className="p-6 space-y-4 mx-auto max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">Editar perfil</h2>

        <EditProfileForm clienta={clienta} />
      </Card>
    </>
  );
}
