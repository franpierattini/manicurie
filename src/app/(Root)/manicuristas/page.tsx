import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { IUser } from "@/types/users";
import { ManicuristaCard } from "@/components/maricure/manicuriesCard";
import SearchFilters from "@/components/maricure/searchManicureLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manicuristas | Mi Manicurista",
  description: "Reservas",
};
const supabase = createServerComponentClient({ cookies });

export default async function ManicuristasPage() {
  const { data: manicuri } = await supabase
    .from("Usuario")
    .select("*")
    .eq("tipo_usuario", "manicura");

  const manicuristas = (manicuri as IUser[]) ?? [];

  return (
    <>
      <SearchFilters />
      <div className=" px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-pink-700">
              Manicuristas disponibles
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {manicuristas.map((user) => (
              <ManicuristaCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
