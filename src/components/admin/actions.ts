"use server";

import { supabaseServerActionClient } from "@/api/supabaseServerActions";

export async function handleCreateServicio(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  const nombre = formData.get("nombre")?.toString().trim() || "";
  const precio_base = parseFloat(formData.get("precio")?.toString() || "0");
  const descripcion = formData.get("descripcion")?.toString().trim() || "";

  if (!nombre || precio_base <= 0) {
    return {
      success: false,
      error: "Nombre y precio son obligatorios y deben ser válidos",
    };
  }

  const { error } = await supabaseServerActionClient.from("Servicio").insert({
    nombre,
    precio_base,
    descripcion,
  });
  console.log(error);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: "" };
}

export async function deleteServicioAction(servicioId: string) {
  const { error } = await supabaseServerActionClient
    .from("Servicio")
    .delete()
    .eq("id", servicioId);

  if (error) throw new Error(error.message);
  return true;
}
