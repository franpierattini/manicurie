"use client";

import { useState } from "react";
import { Label } from "../label";
import { Checkbox } from "../ui/checkbox";

const diasSemana = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];

export function ChangeDisponibilidadCheckboxes({
  disponibilidad,
}: {
  disponibilidad: string;
}) {
  // 🧠 Inicializamos el estado con los días marcados desde la prop
  const [seleccionados, setSeleccionados] = useState<string[]>(
    disponibilidad?.split(", ").filter(Boolean) ?? []
  );

  function toggleDia(dia: string) {
    setSeleccionados((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {diasSemana.map((dia) => (
        <div key={dia} className="flex items-center space-x-2">
          <Checkbox
            id={dia}
            checked={seleccionados.includes(dia)}
            onCheckedChange={() => toggleDia(dia)}
          />
          <Label htmlFor={dia} className="capitalize">
            {dia}
          </Label>
        </div>
      ))}

      {/* Hidden input para enviar los días seleccionados */}
      <input
        type="hidden"
        name="disponibilidad"
        value={seleccionados.join(", ")}
      />
    </div>
  );
}
