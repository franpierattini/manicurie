"use client";

import { ComboboxLocal } from "@/components/ui/comobox-local";
import { useManicuristaFilters } from "../../hooks/applyFilters";

export interface IServicesSelectorItems {
  id: string;
  nombre: string;
}
interface IEnterpriseSelectorProps {
  services?: IServicesSelectorItems[];
  service?: IServicesSelectorItems | null;
}

export default function ServiceFilter({
  services,
  service,
}: IEnterpriseSelectorProps) {
  const { applyFilters } = useManicuristaFilters();

  return (
    <div className="max-w-full">
      <ComboboxLocal
        name="servicio_id"
        items={services ?? []}
        value={service ? service : null}
        displayKey="nombre"
        valueKey="id"
        onChange={(item) => {
          applyFilters({ servicio_id: item?.id ?? "" });
        }}
        placeholder="Selecciona un servicio"
        clearable
      />
    </div>
  );
}
