"use client";

import { useState } from "react";
import { ComboboxLocal } from "../ui/comobox-local";

interface IServicesSelectorItems {
  id: string;
  nombre: string;
}
interface IEnterpriseSelectorProps {
  services?: IServicesSelectorItems[];
  service?: IServicesSelectorItems;
}

export default function ServiceSelector({
  service,
  services,
}: IEnterpriseSelectorProps) {
  const [selectedService, setSelectedService] =
    useState<IServicesSelectorItems | null>(service ? service : null);

  return (
    <div className="max-w-full">
      <input name="servicio_id" type="hidden" value={selectedService?.id} />
      <input
        name="servicio"
        type="hidden"
        defaultValue={selectedService?.nombre}
        readOnly
      />
      <ComboboxLocal
        name="city"
        items={services ?? []}
        displayKey="nombre"
        valueKey="id"
        value={selectedService}
        onChange={setSelectedService}
        placeholder="Selecciona una empresa"
        clearable
      />
    </div>
  );
}
