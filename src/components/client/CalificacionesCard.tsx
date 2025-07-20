import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { ICalificacionConUser } from "@/types/calificacion";
import { Star } from "lucide-react";
import React from "react";

const CalificacionesCard = async ({
  manicuristaId,
}: {
  manicuristaId: string;
}) => {
  const { data, error } = await supabaseServerActionClient
    .from("Calificacion")
    .select(
      `
    puntaje,
    comentario,
    usuario:usuario_id (
      id,
      nombre,
      perfil_url
    )
  `
    )
    .eq("manicurista_id", manicuristaId);
  const calificaciones = data as unknown as ICalificacionConUser[];

  if (error) {
    return <div className="text-sm text-red-600">Error al cargar reseñas</div>;
  }

  if (!calificaciones || calificaciones.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Esta manicurista aún no tiene reseñas.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {calificaciones.map((cali) => (
        <div
          key={cali.id}
          className="border rounded-lg p-5 shadow-sm bg-pink-50 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-800 font-bold">
              {cali.usuario.nombre.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-semibold text-pink-800">
                {cali.usuario.nombre}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`${
                      idx < cali.puntaje ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    <Star className="w-5 h-5" />
                  </span>
                ))}
                <span className="text-xs text-gray-600">{cali.puntaje}/5</span>
              </div>
            </div>
          </div>

          {cali.comentario && (
            <p className="mt-4 text-sm text-gray-700 italic">
              “{cali.comentario}”
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CalificacionesCard;
