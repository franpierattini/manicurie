"use client";
import { CalendarDays, Filter } from "lucide-react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { useManicuristaFilters } from "../../hooks/applyFilters";

interface Props {
  fechaPRop?: string;
  inicioProp?: string;
  finProp?: string;
}

export default function FiltroDisponibilidadCompacto({
  inicioProp,
  fechaPRop,
  finProp,
}: Props) {
  const [fecha, setFecha] = useState(inicioProp ?? "");
  const [inicio, setInicio] = useState(fechaPRop ?? "");
  const [fin, setFin] = useState(finProp ?? "");
  const { applyFilters } = useManicuristaFilters();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Disponibilidad
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-6 bg-white rounded-xl shadow-xl space-y-4 w-72">
          <h3 className="text-sm font-semibold text-pink-700 flex items-center gap-2">
            <CalendarDays size={16} />
            Filtrar disponibilidad
          </h3>

          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Fecha</label>
              <Input
                type="date"
                defaultValue={fechaPRop}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-pink-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Inicio</label>
              <Input
                type="time"
                defaultValue={inicioProp}
                onChange={(e) => setInicio(e.target.value)}
                className="bg-pink-50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Fin</label>
              <Input
                type="time"
                defaultValue={finProp}
                onChange={(e) => setFin(e.target.value)}
                className="bg-pink-50"
              />
            </div>
          </div>

          <Button
            className="w-full bg-pink-800 hover:bg-pink-700 text-white mt-2"
            onClick={() => {
              applyFilters({ fecha, inicio, fin });
            }}
          >
            <Filter size={16} className="mr-2" />
            Aplicar filtros
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}
