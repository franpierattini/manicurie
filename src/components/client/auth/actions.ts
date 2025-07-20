"use server";

import { supabase, supabaseServer } from "@/api/supabaseClient";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { cookies } from "next/headers";
export async function handleClientRegister(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  const nombre = formData.get("nombre") as string;
  const rut = formData.get("rut") as string;
  const telefono = formData.get("telefono") as string;
  const correo = formData.get("correo") as string;
  const contrasena = formData.get("contrasena") as string;

  if (!correo || !correo.includes("@") || !contrasena) {
    return { success: false, error: "Correo o contraseña inválidos" };
  }

  const { data, error } = await supabase.auth.signUp({
    email: correo,
    password: contrasena,
  });

  if (error || !data.user) {
    return { success: false, error: error?.message || "Registro fallido" };
  }

  await supabaseServer.from("Usuario").insert({
    id: data.user.id,
    nombre,
    rut,
    correo,
    telefono,
    tipo_usuario: "clienta",
  });

  return { success: true, error: "" };
}

export async function logout() {
  const cookieStore = cookies();

  const { error } = await supabaseServerActionClient.auth.signOut();

  (await cookieStore).delete("user_id");

  return { success: !error, error: error?.message || "" };
}
