import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portal de Manicure",
  description:
    "Elige si deseas ingresar como clienta o profesional en el portal de servicios de manicure.",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <Card className="w-full max-w-sm  shadow-lg border  border-pink-300">
        <h1 className="text-center text-2xl font-bold pb-5 text-pink-600 shadow-2xl">
          Portal de Manicure
        </h1>

        <CardContent className="flex flex-col items-center gap-4 mt-4">
          <p className="text-center text-sm text-gray-600">
            ¿Cómo deseas ingresar?
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Link
              href="/auth/manicure/register"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded text-center"
            >
              PROFESIONALES
            </Link>

            <Link
              href="/auth/client/register"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded text-center"
            >
              CLIENTE
            </Link>
            <Link
              href="/auth/admin/login"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded text-center"
            >
              ADMINISTRADOR
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
