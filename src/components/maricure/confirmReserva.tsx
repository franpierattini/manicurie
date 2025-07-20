"use client";

import { useActionState, useEffect } from "react";
import { UpadateStatusReserva } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../button";
import { useRouter } from "next/navigation";

const initialState = { success: false, message: "" };

export default function ConfirmReserva({
  reservaId,
  status,
}: {
  reservaId: string;
  status: string;
}) {
  const [state, formAction] = useActionState<
    { success: boolean | null; message: string },
    FormData
  >(UpadateStatusReserva, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state.success, router]);
  return (
    <form action={formAction} className="space-y-6 max-w-md">
      <input type="hidden" name="reserva_id" value={reservaId} />

      <label htmlFor="estado" className="text-sm font-medium text-gray-700">
        Cambiar estado de la reserva:
      </label>

      <div className="flex items-center gap-2">
        <Select name="estado" defaultValue={status}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="confirmado">Confirmado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="max-w-md bg-pink-700">
          Actualizar
        </Button>
      </div>

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
