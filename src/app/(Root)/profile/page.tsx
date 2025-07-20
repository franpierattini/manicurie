import { getUsuarioById } from "@/utils/getUser";
import {
  MapPin,
  Home,
  ListChecks,
  Clock,
  User,
  Mail,
  BadgeCheck,
  Phone,
  ImagePlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { cookies } from "next/headers";
import { IManicure, IService, IWorks } from "@/types/users";
import { Metadata } from "next";
import { Button } from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { ButtonBack } from "@/components/ui/ButtonBack";

export const metadata: Metadata = {
  title: "Perfil | Mi Manicurista",
  description: "Editar Perfil",
};

export default async function ProfileCard() {
  const cookieStore = await cookies();
  const user = await getUsuarioById(cookieStore);
  const isManicura = user.tipo_usuario === "manicura";
  let perfilManicura: IManicure | null = null;
  let servicio: IService | null = null;
  let trabajos: IWorks[] | null = null;

  if (isManicura) {
    const { data: manicura } = await supabaseServerActionClient
      .from("PerfilManicurista")
      .select("*")
      .eq("usuario_id", user.id)
      .single();

    perfilManicura = manicura as IManicure;

    if (perfilManicura?.servicio_id) {
      const { data: service } = await supabaseServerActionClient
        .from("Servicio")
        .select("*")
        .eq("id", perfilManicura.servicio_id)
        .single();

      servicio = service as IService;
    }

    const { data: works } = await supabaseServerActionClient
      .from("Trabajos")
      .select("*")
      .eq("usuario_id", user.id);

    trabajos = works as IWorks[];
  }

  return (
    <>
      <ButtonBack />
      <div className="min-h-screen  my-8  flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-4">
          {/* Header */}
          <div className="flex justify-center">
            <Avatar className="w-24 h-24 border-4 border-pink-300 shadow-md">
              <AvatarImage src={user.perfil_url} alt="Foto de perfil" />
              <AvatarFallback>
                {user.nombre?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Datos básicos */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <User size={20} />
              {user.nombre}
            </h2>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              <Mail size={16} />
              {user.correo}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-pink-200 text-pink-800 rounded-full">
              <BadgeCheck size={14} />
              {user.tipo_usuario.toUpperCase()}
            </span>
          </div>

          {/* Info común */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Phone size={16} />
              <strong>Teléfono:</strong> {user.telefono}
            </p>
            <p className="flex items-center gap-2">
              <ListChecks size={16} />
              <strong>RUT:</strong> {user.rut}
            </p>
          </div>

          {/* Info de manicurista */}
          {isManicura && perfilManicura && (
            <div className="bg-pink-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-pink-700">
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                <strong>Ubicación:</strong> {perfilManicura.ubicacion}
              </p>
              <p className="flex items-center gap-2">
                <Home size={16} />
                <strong>Modalidad:</strong> {perfilManicura.modalidad_atencion}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} />
                <strong>Disponibilidad:</strong> {perfilManicura.disponibilidad}
              </p>
              <div className="bg-white border border-pink-200 p-3 rounded-lg shadow-sm space-y-1">
                <p className="flex items-center gap-2 text-pink-800 font-semibold">
                  {servicio?.nombre}
                </p>
                <p className="text-sm text-gray-600">{servicio?.descripcion}</p>
                <p className="text-xs text-gray-500">
                  Precio base:
                  <span className="font-medium text-gray-700">
                    ${servicio?.precio_base}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Galería de trabajos */}
          {trabajos && trabajos.length > 0 && (
            <div className="space-y-3 p-4 bg-pink-50 rounded-lg shadow-inner">
              <h2 className="text-xl font-semibold text-pink-800 flex items-center gap-2">
                <ImagePlus size={20} />
                Mis trabajos
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {trabajos.map((t) => (
                  <div
                    key={t.id}
                    className="overflow-hidden border border-pink-200 rounded-md shadow-sm hover:shadow-lg transition"
                  >
                    <Image
                      src={t.fotos_trabajos}
                      alt={`Trabajo ${t.id}`}
                      className="w-full h-36 object-cover"
                      width={300}
                      height={240}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2 flex-wrap">
            {isManicura && (
              <Button className="bg-pink-800 hover:bg-pink-700">
                <Link href="works/add">Agregar trabajos</Link>
              </Button>
            )}
            <Button className="bg-pink-800 hover:bg-pink-700">
              <Link
                href={
                  user.tipo_usuario === "clienta"
                    ? `profile/clienta/${user.id}`
                    : `profile/manicure/${user.id}`
                }
              >
                Editar perfil
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
