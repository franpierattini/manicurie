"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { ComboboxLocal } from "@/components/ui/comobox-local";
import { crearReserva } from "./actions";
import { AgendaItem, ServicioItem } from "@/types/books";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
export interface ReservaWizardProps {
  manicuristaId: string;
  agenda: AgendaItem[];
  servicios: ServicioItem[];
  userId: string;
}
export default function ReservaWizard({
  agenda,
  servicios,
  userId,
}: ReservaWizardProps) {
  const [servicio, setServicio] = useState<ServicioItem | null>(null);
  const [bloque, setBloque] = useState<AgendaItem | null>(null);
  const handleReserva = async () => {
    if (servicio && bloque) {
      await crearReserva({
        servicio_id: servicio.id,
        agenda_id: bloque.id,
        userId,
        precio: servicio.precio_base,
      });
    }
  };

  return (
    <div className="space-y-6">
      {servicio && (
        <div>
          <Label htmlFor="precio">Precio</Label>
          <Input
            readOnly
            name="precio"
            type="number"
            value={servicio.precio_base}
          />
        </div>
      )}
      <ComboboxLocal
        name="servicio"
        items={servicios}
        value={servicio}
        onChange={setServicio}
        displayKey="nombre"
        valueKey="id"
        placeholder="Selecciona un servicio"
        clearable
      />

      <ComboboxLocal
        name="bloque"
        items={agenda}
        value={bloque}
        onChange={setBloque}
        displayKey={(item) =>
          item
            ? `${item.fecha ?? ""} ${item.hora_inicio ?? ""} - ${
                item.hora_fin ?? ""
              }`
            : ""
        }
        valueKey="id"
        placeholder="Selecciona horario disponible"
        clearable
      />

      <Button
        onClick={handleReserva}
        className="w-full bg-pink-600 text-white hover:bg-pink-700"
      >
        Confirmar reserva
      </Button>
    </div>
  );
}
