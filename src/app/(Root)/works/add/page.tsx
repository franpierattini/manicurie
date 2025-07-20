"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { uploadTrabajosAction } from "@/components/works/actions";
import { ImagePlus } from "lucide-react";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Image from "next/image";
import { ButtonBack } from "@/components/ui/ButtonBack";
import { toast } from "sonner";

const initialState = { success: false, error: "" };

export default function WorksAddPage() {
  const [previews, setPreviews] = useState<string[]>([]);
  const [state, formAction] = useActionState(
    uploadTrabajosAction,
    initialState
  );
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  if (state.success) {
    router.push("/profile");
    toast.success("Trabajos agregados correctamente");
  }

  return (
    <>
      <ButtonBack />
      <form
        action={formAction}
        className="flex items-center justify-center px-4"
      >
        <div className="p-6 w-full max-w-md space-y-6">
          {/* Título */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <ImagePlus size={22} className="text-pink-600" />
              Subir trabajos
            </h2>
            <p className="text-sm text-gray-500">
              Agregá fotos de tus trabajos para que tus clientes vean tu arte.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label
              htmlFor="trabajos"
              className="text-sm font-medium text-gray-700"
            >
              Seleccioná las imágenes
            </Label>
            <Input
              type="file"
              id="trabajos"
              name="trabajos"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <p className="text-xs text-muted-foreground">
              Podés subir varias a la vez.
            </p>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="rounded-md overflow-hidden border border-pink-200 bg-pink-50 shadow-inner hover:shadow-md transition"
                >
                  <Image
                    src={src}
                    alt={`Preview ${i}`}
                    className="w-full h-36 object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Submit + Feedback */}
          <Button
            type="submit"
            className="w-full bg-pink-800 hover:bg-pink-700"
          >
            Subir imágenes
          </Button>
          {state.error && (
            <p className="text-sm text-destructive text-center">
              {state.error}
            </p>
          )}
        </div>
      </form>
    </>
  );
}
