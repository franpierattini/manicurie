"use client";
import React, { useState } from "react";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Button } from "../button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

interface IProps {
  notShowLink?: boolean;
}
const LoginForm = ({ notShowLink }: IProps) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createPagesBrowserClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      const userId = data.user.id;
      const { data: perfil, error: perfilError } = await supabase
        .from("Usuario")
        .select("tipo_usuario")
        .eq("id", userId)
        .single();
      console.log(perfilError);

      document.cookie = `user_id=${userId}; path=/; SameSite=Lax`;
      document.cookie = `tipo_usuario=${perfil?.tipo_usuario}; path=/; SameSite=Lax`;

      router.push("/");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="correo">Correo Electrónico</Label>
        <Input
          id="correo"
          name="correo"
          placeholder="Correo Electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="contrasena">Contraseña</Label>
        <Input
          id="contrasena"
          name="contrasena"
          type="password"
          placeholder="*******"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

      <div className="flex flex-col gap-2 mt-4">
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold"
        >
          INGRESAR
        </Button>

        {!notShowLink && (
          <Button
            variant="outline"
            className="border-pink-500 text-pink-600 hover:bg-pink-100"
          >
            <Link href="/auth/client/register?rol=clienta">
              REGISTRARME COMO CLIENTE
            </Link>
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
