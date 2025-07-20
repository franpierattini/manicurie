"use client";

import React, { useActionState } from "react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import Link from "next/link";
import { handleManicureRegister } from "./auth/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ServiceSelectorWrapper from "./selectServiceWrapper";
import { useRouter } from "next/navigation";
import { DisponibilidadCheckboxes } from "./disponibilidad";
import { UbicacionInput } from "./inputPlace";
const initialState = { success: false, error: "" };
const RegisterForm = () => {
  const router = useRouter();

  const [state, formAction] = useActionState(
    handleManicureRegister,
    initialState
  );

  if (state.success) {
    router.push("/auth/manicure/login?rol=clienta");
  }
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="nombre">Nombre Completo</Label>
          <Input id="nombre" placeholder="Nombre Completo" name="nombre" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="correo">Correo Electronico</Label>
          <Input id="correo" placeholder="Correo Electronico" name="correo" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="rut">RUT</Label>
          <Input id="rut" placeholder="RUT" name="rut" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="telefono">Telefono</Label>
          <Input id="telefono" placeholder="Telefono" name="telefono" />
        </div>
        <UbicacionInput />
        <div className="flex flex-col gap-1">
          <Label htmlFor="modalidad_atencion">
            ¿Dónde presta sus servicios?
          </Label>
          <Select name="modalidad_atencion" required>
            <SelectTrigger id="modalidad_atencion">
              <SelectValue placeholder="Selecciona una modalidad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DOMICILIO">Domicilio</SelectItem>
              <SelectItem value="ESTABLECIMIENTO">Establecimiento</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="foto">Foto de Perfil</Label>
          <Input id="foto" type="file" name="perfil" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="servicios">Servicios</Label>
          <ServiceSelectorWrapper />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="horarios">Disponibilidad</Label>
          <DisponibilidadCheckboxes />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="contrasena">Contraseña</Label>
          <Input
            id="contrasena"
            placeholder="*******"
            type="password"
            name="contrasena"
          />
        </div>
      </div>

      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state?.success && (
        <p className="text-green-500 text-sm">¡Registro exitoso!</p>
      )}
      <div className="flex flex-col gap-2 mt-4">
        <Button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold">
          REGISTRAR
        </Button>
        <Button
          variant="outline"
          className="border-pink-500 text-pink-600 hover:bg-pink-100"
        >
          <Link href="/auth/manicure/login?rol=manicurista">
            MANICURE YA EXISTENTE
          </Link>
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
