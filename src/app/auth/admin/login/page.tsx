import { Button } from "@/components/button";
import LoginForm from "@/components/client/loginForm";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Ingreso Administrador",
  description: "Inicio de sesión para administradoras registradas.",
};

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <Card className="w-full max-w-md p-6 border border-pink-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-pink-600">
            Ingreso Administrador
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <LoginForm notShowLink />
          <Button variant="link" className="text-pink-600">
            <Link href="/auth/portal">Regresar al Portal</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
