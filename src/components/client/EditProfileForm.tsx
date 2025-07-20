"use client";
import { IUser } from "@/types/users";
import React, { useActionState } from "react";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { updateClientaProfile } from "./actions";
import { useRouter } from "next/navigation";
const initialState = { success: null, message: "" };
const EditProfileForm = ({ clienta }: { clienta: IUser }) => {
  const [state, formAction] = useActionState<
    { success: boolean | null; message: string },
    FormData
  >(updateClientaProfile, initialState);
  const router = useRouter();

  if (state.success) {
    router.push("/profile");
  }
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={clienta.id} />

      <div className="space-y-2">
        <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
          Nombre
        </Label>
        <Input
          type="text"
          id="nombre"
          name="nombre"
          defaultValue={clienta.nombre}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="correo" className="text-sm font-medium text-gray-700">
          Correo
        </Label>
        <Input
          type="email"
          id="correo"
          name="correo"
          defaultValue={clienta.correo}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono" className="text-sm font-medium text-gray-700">
          Teléfono
        </Label>
        <Input
          type="text"
          id="telefono"
          name="telefono"
          defaultValue={clienta.telefono}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rut" className="text-sm font-medium text-gray-700">
          RUT
        </Label>
        <Input type="text" id="rut" name="rut" defaultValue={clienta.rut} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Tipo</label>
        <p className="text-sm text-gray-500">{clienta.tipo_usuario}</p>
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
      <Button type="submit" className="bg-pink-600 text-white w-full">
        Guardar cambios
      </Button>
    </form>
  );
};

export default EditProfileForm;
