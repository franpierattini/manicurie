import Image from "next/image";
import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { IUser } from "@/types/users";
import { Badge } from "@/components/badge";

export default async function AdminPageUsers() {
  const { data: users } = await supabaseServerActionClient
    .from("Usuario")
    .select("*");

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">
        Usuarios registrados
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-50 text-left text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Correo</th>
              <th className="px-4 py-3">Teléfono</th>
              <th className="px-4 py-3">RUT</th>
              <th className="px-4 py-3">Rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {users?.map((user: IUser) => (
              <tr key={user.id}>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Image
                    src={user.perfil_url || "/default-avatar.webp"}
                    alt={user.nombre}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="font-medium text-gray-800">
                    {user.nombre}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.correo}</td>
                <td className="px-4 py-3 text-gray-600">{user.telefono}</td>
                <td className="px-4 py-3 text-gray-600">{user.rut}</td>
                <td className="px-4 py-3">
                  <Badge variant={badgeVariant(user.tipo_usuario)}>
                    {user.tipo_usuario}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function badgeVariant(
  tipo: string
): "default" | "destructive" | "secondary" | "outline" {
  switch (tipo) {
    case "administrador":
      return "destructive";
    case "manicura":
      return "secondary";
    case "clienta":
    default:
      return "default";
  }
}
