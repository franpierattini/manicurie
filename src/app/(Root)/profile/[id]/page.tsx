import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import {
  MapPin,
  Clock,
  ImagePlus,
  User,
  BadgeCheck,
  Mail,
  Phone,
  ListChecks,
  Home,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import MapUbicacion from "@/components/client/ubicactionCard";
import { Metadata } from "next";
import CalificacionesCard from "@/components/client/CalificacionesCard";
export const metadata: Metadata = {
  title: "Perfil | Mi Manicurista",
  description: "Perfil",
};
export default async function ViewPerfil({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: user } = await supabaseServerActionClient
    .from("Usuario")
    .select("*")
    .eq("id", id)
    .single();

  const { data: perfil } = await supabaseServerActionClient
    .from("PerfilManicurista")
    .select("*")
    .eq("usuario_id", id)
    .single();

  const { data: servicio } = await supabaseServerActionClient
    .from("Servicio")
    .select("*")
    .eq("id", perfil?.servicio_id)
    .single();

  const { data: trabajos } = await supabaseServerActionClient
    .from("Trabajos")
    .select("*")
    .eq("usuario_id", id);

  if (!user || !perfil) {
    return <div className="text-center py-12"> Manicurista no encontrada</div>;
  }

  return (
    <div className="min-h-screen  px-4 md:px-8 lg:px-16 py-12 flex items-center justify-center">
      <div className="p-6 w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl space-y-6">
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

        {/* Info profesional */}
        <div className="bg-pink-50 p-4 rounded-lg shadow-inner space-y-2 text-sm text-pink-700">
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            <strong>Ubicación:</strong> {perfil.ubicacion}
          </p>
          <p className="flex items-center gap-2">
            <Home size={16} />
            <strong>Modalidad:</strong> {perfil.modalidad_atencion}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} />
            <strong>Disponibilidad:</strong> {perfil.disponibilidad}
          </p>
          {servicio && (
            <div className="bg-white border border-pink-200 p-3 rounded-lg shadow-sm space-y-1">
              <p className="flex items-center gap-2 text-pink-800 font-semibold">
                {servicio.nombre}
              </p>
              <p className="text-sm text-gray-600">{servicio.descripcion}</p>
              <p className="text-xs text-gray-500">
                Precio base:{" "}
                <span className="text-gray-700 font-medium">
                  ${servicio.precio_base}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Galería */}
        {trabajos && trabajos.length > 0 && (
          <div className="space-y-3 p-4 bg-pink-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold text-pink-800 flex items-center gap-2">
              <ImagePlus size={20} />
              Galería
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
        <MapUbicacion
          lat={parseFloat(perfil.latitud)}
          lng={parseFloat(perfil.longitud)}
          nombre={user.nombre}
        />
        <CalificacionesCard manicuristaId={id} />
        <div className="flex gap-3 pt-2 flex-wrap">
          <Button className="bg-pink-800 hover:bg-pink-700">
            <Link href={`/books/${perfil.id}`}>Reservar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
