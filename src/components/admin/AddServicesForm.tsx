"use client";

import { useActionState } from "react";
import { handleCreateServicio } from "./actions";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "@/components/button";

const initialState = { success: false, error: "" };

export default function ServiceForm() {
  const [state, formAction] = useActionState(
    handleCreateServicio,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="nombre">Nombre del servicio</Label>
        <Input id="nombre" name="nombre" required />
      </div>

      <div>
        <Label htmlFor="precio">Precio</Label>
        <Input id="precio" name="precio" type="number" required />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input id="descripcion" name="descripcion" />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 font-semibold">{state.error}</p>
      )}
      {state.success && (
        <p className="text-sm text-green-600 font-semibold">
          Servicio creado con éxito
        </p>
      )}

      <Button type="submit" className="bg-pink-600 hover:bg-pink-800 w-full">
        Crear servicio
      </Button>
    </form>
  );
}
