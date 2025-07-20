import ClientForm from "@/components/client/clientForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Formulario Cliente",
  description: "Registro de clientas para agendar servicios de manicure.",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <Card className="w-full max-w-md p-6 border border-pink-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-pink-600">
            Formulario Cliente
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <ClientForm />
        </CardContent>
      </Card>
    </div>
  );
}
