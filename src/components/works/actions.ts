"use server";

import { supabase } from "@/api/supabaseClient";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function uploadTrabajosAction(
  prevState: { success: boolean; error: string },
  formData: FormData
) {
  const cookieStore = await cookies();
  const supabaseHeader = createServerActionClient({ cookies });

  const userId = cookieStore.get("user_id")?.value;
  if (!userId)
    return { success: false, error: "Cookie 'user_id' no encontrada" };

  const files = formData.getAll("trabajos") as File[];

  for (const file of files) {
    const fileName = `${userId}-${Date.now()}.${file.name.split(".").pop()}`;

    const { error: uploadError } = await supabase.storage
      .from("perfiles")
      .upload(fileName, file);

    if (uploadError) return { success: false, error: uploadError.message };

    const { data: publicUrlData } = supabase.storage
      .from("perfiles")
      .getPublicUrl(fileName);

    const { error: dbError } = await supabaseHeader.from("Trabajos").insert({
      usuario_id: userId,
      fotos_trabajos: publicUrlData.publicUrl,
    });

    if (dbError) return { success: false, error: dbError.message };
  }

  return { success: true, error: "Imagen subida" };
}
