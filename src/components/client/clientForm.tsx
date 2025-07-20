"use client";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleClientRegister } from "./auth/actions";
import { useActionState } from "react";

const initialState = { success: false, error: "" };

const ClientForm = () => {
  const router = useRouter();
  const [state, formAction] = useActionState(handleClientRegister, initialState);

  if (state.success) {
    router.push("/auth/client/login?rol=clienta");
  }
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1">
        <Label htmlFor="nombre">Nombre Completo</Label>
        <Input name="nombre" id="nombre" placeholder="Nombre Completo" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="nombre">Correo</Label>
        <Input id="correo" name="correo" placeholder="Correo" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="rut">RUT</Label>
        <Input placeholder="RUT" id="rut" name="rut" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input placeholder="Teléfono" id="telefono" name="telefono" />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="contrasena">Contaseña</Label>
        <Input placeholder="*******" id="contrasena" name="contrasena" />
      </div>
      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state?.success && (
        <p className="text-green-500 text-sm">¡Registro exitoso!</p>
      )}
      <div className="flex flex-col gap-2 mt-4">
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
        >
          GUARDAR
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-pink-500 text-pink-600 hover:bg-pink-100"
        >
          <Link href="/auth/client/login?rol=clienta">
            CLIENTE YA EXISTENTE
          </Link>
        </Button>
      </div>
      <Button variant="link" type="button" className="text-pink-600">
        <Link href="/auth/portal">Regresar al Portal</Link>
      </Button>
    </form>
  );
};

export default ClientForm;
