import { Button } from "@/components/button";
import RegisterForm from "@/components/maricure/registerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Registro Manicurista",
  description: "Formulario para profesionales del mundo de la manicura.",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <Card className="w-full max-w-xl p-6 border border-pink-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-pink-600">
            Registro Profesional 💅
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Datos Personales */}
          <RegisterForm />
          <Button variant="link" className="text-pink-600">
            <Link href="/auth/portal">Regresar al Portal</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
