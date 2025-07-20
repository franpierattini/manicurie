"use client";

import { useActionState } from "react";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createCalificacion } from "./actions"; // server action
import { Star } from "lucide-react";

const initialState = { success: null, message: "" };

export default function FormCalificacion({
  reserva_id,
  userId,
  manicuristaId,
}: {
  reserva_id: string;
  userId: string;
  manicuristaId: string;
}) {
  const [state, formAction] = useActionState<
    { success: boolean | null; message: string },
    FormData
  >(createCalificacion, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="reserva_id" value={reserva_id} />
      <input type="hidden" name="usuario_id" value={userId} />
      <input type="hidden" name="manicurista_id" value={manicuristaId} />

      <div className="space-y-2">
        <Label htmlFor="puntaje">Puntaje</Label>
        <Select name="puntaje" defaultValue="5">
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar puntuación" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((val) => (
              <SelectItem
                key={val}
                value={val.toString()}
                className="flex items-center gap-2"
              >
                <div className="flex">
                  {Array.from({ length: val }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500" />
                  ))}
                </div>
                <span>{val}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comentario">Comentario</Label>
        <textarea
          id="comentario"
          name="comentario"
          rows={3}
          className="border rounded px-3 py-2 w-full text-sm"
          placeholder="¿Qué te pareció la atención?"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-600 text-white hover:bg-pink-800"
      >
        Enviar reseña
      </Button>

      {state.message && (
        <p
          className={`text-sm text-center ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
