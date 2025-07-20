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

export function DisponibilidadCheckboxes() {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

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

      <input
        type="hidden"
        name="disponibilidad"
        value={seleccionados.join(", ")}
      />
    </div>
  );
}
