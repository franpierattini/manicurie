"use client";

import { useActionState } from "react";
import { updateManicurista } from "./actions";
import { Button } from "../button";
import { Label } from "../label";
import { Input } from "../input";
import { IEditManicure } from "@/types/users";
import { ChangeDisponibilidadCheckboxes } from "./changeDisponibilidad";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EditInputPlace } from "./EditInputPlace";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const initialState = { success: null, message: "" };

export default function EditPerfilFormManicurie({
  manicure,
}: {
  manicure: IEditManicure;
}) {
  const [state, formAction] = useActionState<
    { success: boolean | null; message: string },
    FormData
  >(updateManicurista, initialState);
  if (state.success) {
    toast.success("Perfil actualizado con exito");
    redirect("/profile");
  }
  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="usuario_id" value={manicure.id} />

      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" defaultValue={manicure.nombre} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="correo">Correo</Label>
        <Input id="correo" name="correo" defaultValue={manicure.correo} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="telefono">Telefono</Label>
        <Input id="telefono" name="telefono" defaultValue={manicure.telefono} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rut">RUT</Label>
        <Input id="rut" name="rut" defaultValue={manicure.rut} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="modalidad">Modalidad de atención</Label>

        <Select
          name="modalidad_atencion"
          defaultValue={manicure.perfil[0]?.modalidad_atencion}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar modalidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DOMICILIO">Domicilio</SelectItem>
            <SelectItem value="ESTABLECIMIENTO">Establecimiento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <EditInputPlace
        latitudInicial={manicure.perfil[0].latitud}
        longitudInicial={manicure.perfil[0].longitud}
        ubicacionInicial={manicure.perfil[0].ubicacion}
      />
      <div className="space-y-2">
        <Label htmlFor="disponibilidad">Disponibilidad</Label>
        <ChangeDisponibilidadCheckboxes
          disponibilidad={manicure.perfil[0].disponibilidad}
        />
      </div>

      <Button type="submit" className="bg-pink-600 w-full">
        Guardar cambios
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
