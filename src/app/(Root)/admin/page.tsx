import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { CardResumen } from "@/components/maricure/cardResumen";
import { User } from "lucide-react";

export default async function AdminPage() {
  const { count: cantUsers, error } = await supabaseServerActionClient
    .from("Usuario")
    .select("*", { count: "exact" });
  const { count: cantServices } = await supabaseServerActionClient
    .from("Servicio")
    .select("*", { count: "exact" });
  const { count: cantReservas } = await supabaseServerActionClient
    .from("Reserva")
    .select("*", { count: "exact" });

  return (
    <div className="grid gap-2 p-4">
      <CardResumen
        icon={User}
        title="Cantidad de usuarios"
        value={cantUsers ?? 0}
      />
      <CardResumen
        icon={User}
        title="Cantidad de servicios"
        value={cantServices ?? 0}
      />
      <CardResumen
        icon={User}
        title="Cantidad de Reservas"
        value={cantReservas ?? 0}
      />
    </div>
  );
}
