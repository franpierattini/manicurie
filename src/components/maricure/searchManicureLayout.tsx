import { supabase } from "@/api/supabaseClient";
import FiltroDisponivilidad from "./filterDisponibilidad";
import ServiceFilter, { IServicesSelectorItems } from "./filterService";
import { FilterPlace } from "./filterPlace";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/popover";
import { Button } from "@/components/button";
import { Filter } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";
import ResetFilters from "./resetFilters";

export default async function FiltroManicuristas({
  searchParams,
}: {
  searchParams?: {
    fecha?: string;
    inicio?: string;
    fin?: string;
    name?: string;
    servicio_id?: string;
    ubicacion?: string;
  };
}) {
  const { data } = await supabase.from("Servicio").select("id, nombre");
  const services = data as IServicesSelectorItems[];
  const service =
    services?.find((e) => e.id === searchParams?.servicio_id) ?? null;

  return (
    <div className="flex justify-end p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filtrar
          </Button>
        </PopoverTrigger>

        <PopoverContent className="space-y-4 w-[320px] bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-pink-700 font-semibold text-sm">
              Filtros disponibles
            </h3>
            <ResetFilters />
          </div>
          <SearchBar name={searchParams?.name} />
          <FiltroDisponivilidad
            inicioProp={searchParams?.inicio}
            fechaPRop={searchParams?.fecha}
            finProp={searchParams?.fin}
          />
          <ServiceFilter services={services} service={service} />
          <FilterPlace displayName={searchParams?.ubicacion} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
