import ServiceForm from "@/components/admin/AddServicesForm";

export default async function AddServices() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-pink-700 mb-4">
          Agregar Servicio
        </h1>
        <ServiceForm />
      </div>
    </section>
  );
}
