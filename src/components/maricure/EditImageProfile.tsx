"use client";

import { useState } from "react";
import Image from "next/image";
import { supabaseClientComponent } from "@/api/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditImageProfile({ userId }: { userId: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `perfil/${userId}.${fileExt}`;

    const { error: uploadError } = await supabaseClientComponent.storage
      .from("perfiles")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Error al subir imagen.");
      setUploading(false);
      return;
    }

    const { data } = supabaseClientComponent.storage
      .from("perfiles")
      .getPublicUrl(filePath);
    const publicUrl = data.publicUrl;

    const { error: dbError } = await supabaseClientComponent
      .from("Usuario")
      .update({ perfil_url: publicUrl })
      .eq("id", userId);

    if (dbError) {
      toast.error("Error al guardar URL en la base de datos.");
      setUploading(false);
      return;
    }

    setPreviewUrl(publicUrl);
    toast.success("Foto actualizada con éxito");
    router.refresh();
    setUploading(false);
  };

  return (
    <div className="space-y-4">
      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Foto de perfil"
          width={96}
          height={96}
          className="rounded-full border-2 border-pink-300"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="text-sm text-gray-700"
      />

      {uploading && <p className="text-pink-600 text-sm">Subiendo imagen...</p>}
    </div>
  );
}
