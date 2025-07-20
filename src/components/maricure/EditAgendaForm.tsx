"use client";

import { useState } from "react";
import { updateAgenda } from "./actions";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ButtonBack } from "../ui/ButtonBack";
import { redirect } from "next/navigation";

interface Props {
  agendaId: string;
  initialFecha: string;
  initialInicio: string;
  initialFin: string;
}

export default function EditAgendaForm({
  agendaId,
  initialFecha,
  initialInicio,
  initialFin,
}: Props) {
  const [fecha, setFecha] = useState(initialFecha);
  const [horaInicio, setHoraInicio] = useState(initialInicio);
  const [horaFin, setHoraFin] = useState(initialFin);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAgenda(agendaId, {
      fecha,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
    });
    redirect("/agenda");
  };

  return (
    <>
      <ButtonBack />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Editar Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                type="date"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            {/* Hora inicio */}
            <div className="space-y-2">
              <Label htmlFor="hora_inicio">Hora de inicio</Label>
              <Input
                type="time"
                id="hora_inicio"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
            </div>

            {/* Hora fin */}
            <div className="space-y-2">
              <Label htmlFor="hora_fin">Hora de fin</Label>
              <Input
                type="time"
                id="hora_fin"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
              />
            </div>

            {/* Botón */}
            <Button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white"
            >
              Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
