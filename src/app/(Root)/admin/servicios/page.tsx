import { supabaseServerActionClient } from "@/api/supabaseServerActions";
import { IService } from "@/types/users";
import Link from "next/link";
import { Button } from "@/components/button";
import { DeleteServicioButton } from "@/components/admin/DeleteService";

export default async function AdminPageUsers() {
  const { data: servicios } = await supabaseServerActionClient
    .from("Servicio")
    .select("*");

  return (
    <section className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-pink-700 mb-6">
          Servicios Disponibles
        </h2>
        <Link href="/admin/servicios/add">
          <Button variant="link" className="text-pink-700">
            Agregar Servicios
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-50 text-left text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Descripcion</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {servicios?.map((service: IService) => (
              <tr key={service.id}>
                <td className="px-4 py-3 flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {service.nombre}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {service.descripcion}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  ${service.precio_base}
                </td>
                <td className="px-4 py-3">
                  <DeleteServicioButton servicioId={service.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
