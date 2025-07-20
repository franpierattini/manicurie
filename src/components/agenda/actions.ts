"use server";

import { supabaseServerActionClient } from "@/api/supabaseServerActions";

export async function handleCrearAgenda(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  const fecha = formData.get("fecha")?.toString() ?? "";
  const hora_inicio = formData.get("horaInicio")?.toString() ?? "";
  const hora_fin = formData.get("horaFin")?.toString() ?? "";
  const perfil_id = formData.get("manicuristaId")?.toString() ?? "";
  const usuario_id = formData.get("userId")?.toString() ?? "";

  if (!fecha || !hora_inicio || !hora_fin || !perfil_id || !usuario_id) {
    return { success: false, error: "Todos los campos son obligatorios" };
  }

  const { error } = await supabaseServerActionClient.from("Agenda").insert({
    fecha,
    hora_inicio,
    hora_fin,
    perfil_id,
    usuario_id,
  });

  if (error) return { success: false, error: error.message };
  return { success: true, error: "" };
}
