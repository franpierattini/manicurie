"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../input";
import { Button } from "@/components/button";
import { handleCrearAgenda } from "./actions";

const initialState = { success: false, error: "" };

export default function FormCrearAgenda({
  manicuristaId,
  userId,
}: {
  manicuristaId: string;
  userId: string;
}) {
  const router = useRouter();

  const [state, formAction] = useActionState(handleCrearAgenda, initialState);

  if (state.success) {
    router.push("/agenda");
  }
  return (
    <form
      action={formAction}
      className="space-y-4 p-6 bg-pink-50 rounded-xl shadow-sm max-w-md"
    >
      <h2 className="text-xl font-bold text-pink-800">
        Agregar bloque disponible
      </h2>

      <input type="hidden" name="manicuristaId" value={manicuristaId} />
      <input type="hidden" name="userId" value={userId} />

      <Input
        type="date"
        name="fecha"
        className="w-full border rounded px-3 py-2"
        required
      />
      <Input
        type="time"
        name="horaInicio"
        className="w-full border rounded px-3 py-2"
        required
      />
      <Input
        type="time"
        name="horaFin"
        className="w-full border rounded px-3 py-2"
        required
      />

      {state.error && (
        <p className="text-sm text-red-600 font-semibold">{state.error}</p>
      )}
      {state.success && (
        <p className="text-sm text-green-600 font-semibold">Agenda creada</p>
      )}

      <Button type="submit" className="bg-pink-600 hover:bg-pink-800 w-full">
        Guardar disponibilidad
      </Button>
    </form>
  );
}
