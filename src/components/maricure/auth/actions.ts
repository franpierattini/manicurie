"use server";

import { supabase, supabaseServer } from "@/api/supabaseClient";
export async function handleManicureRegister(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  const file = formData.get("perfil") as File;
  const nombre = formData.get("nombre") as string;
  const rut = formData.get("rut") as string;
  const telefono = formData.get("telefono") as string;
  const correo = formData.get("correo") as string;
  const contrasena = formData.get("contrasena") as string;
  const modalidad_atencion = formData.get("modalidad_atencion");
  const servicio_id = formData.get("servicio_id");
  const disponibilidad = formData.get("disponibilidad");
  const ubicacion = formData.get("ubicacion") as string;
  const latitud = formData.get("latitud") as string;
  const longitud = formData.get("longitud") as string;

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
  const filePath = `perfil/${data.user.id}.jpg`;

  const { error: uploadError } = await supabaseServer.storage
    .from("perfiles")
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
    });

  if (uploadError) {
    return { success: false, error: "Error al subir la imagen" };
  }

  const { data: urlData } = supabaseServer.storage
    .from("perfiles")
    .getPublicUrl(filePath);

  const perfil_url = urlData?.publicUrl;

  await supabaseServer.from("Usuario").insert({
    id: data.user.id,
    nombre,
    rut,
    correo,
    telefono,
    tipo_usuario: "manicura",
    perfil_url,
  });
  await supabaseServer.from("PerfilManicurista").insert({
    ubicacion,
    modalidad_atencion,
    usuario_id: data.user.id,
    servicio_id,
    disponibilidad,
    perfil_url,
    latitud,
    longitud,
  });

  return { success: true, error: "" };
}
