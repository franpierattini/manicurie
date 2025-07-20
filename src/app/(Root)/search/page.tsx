import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import { MapPin, BadgeCheck, User } from "lucide-react";
import FiltroManicuristas from "@/components/maricure/searchManicureLayout";
import Link from "next/link";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Buscar | Mi Manicurista",
  description: "Buscar",
};
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    fecha?: string;
    inicio?: string;
    fin?: string;
    name?: string;
    servicio_id?: string;
    ubicacion?: string;
  }>;
}) {
  const { fecha, inicio, fin, name, servicio_id, ubicacion } =
    await searchParams;

  let idsOcupados: string[] = [];
  if (fecha && inicio && fin) {
    const { data: ocupados } = await supabaseServerActionClient
      .from("Agenda")
      .select("perfil_id")
      .eq("fecha", fecha)
      .lte("hora_inicio", inicio)
      .gte("hora_fin", fin);
    idsOcupados = ocupados?.map((r) => r.perfil_id) ?? [];
  }

  let idsUsuarios: string[] = [];
  if (name?.trim()) {
    const { data: usuarios } = await supabaseServerActionClient
      .from("Usuario")
      .select("id")
      .ilike("nombre", `%${name.trim()}%`);
    idsUsuarios = usuarios?.map((u) => u.id) ?? [];
  }

  let query = supabaseServerActionClient
    .from("PerfilManicurista")
    .select("*, Usuario(*)");

  if (idsOcupados.length > 0) {
    query = query.not("id", "in", `(${idsOcupados.join(",")})`);
  }

  if (idsUsuarios.length > 0) {
    query = query.in("usuario_id", idsUsuarios);
  }

  if (servicio_id) {
    query = query.eq("servicio_id", servicio_id);
  }
  if (ubicacion && ubicacion.trim().length > 0) {
    query = query.ilike("ubicacion", `%${ubicacion.trim()}%`);
  }
  const { data: perfiles } = await query;

  if (!perfiles || perfiles.length === 0) {
    return (
      <>
        <FiltroManicuristas searchParams={await searchParams} />
        <div className="text-center py-12 text-pink-700 font-medium">
          No hay manicuristas disponibles
        </div>
      </>
    );
  }

  return (
    <>
      <FiltroManicuristas searchParams={await searchParams} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {perfiles.map((perfil) => (
          <div
            key={perfil.id}
            className="bg-white rounded-lg shadow-md p-4 space-y-3 border border-pink-200"
          >
            <Link href={`/profile/${perfil.Usuario.id}`}>
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16 border-pink-300 shadow">
                  <AvatarImage src={perfil.Usuario.perfil_url} />
                  <AvatarFallback>
                    {perfil.Usuario.nombre?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 flex gap-1 items-center">
                    <User size={16} />
                    {perfil.Usuario.nombre}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-pink-200 text-pink-800 rounded-full">
                    <BadgeCheck size={14} />
                    MANICURISTA
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin size={16} />
                {perfil.ubicacion}
              </p>
              {fecha && inicio && fin && (
                <p className="text-xs text-pink-600">
                  Disponible el <strong>{fecha}</strong> de{" "}
                  <strong>
                    {inicio} a {fin}
                  </strong>
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
