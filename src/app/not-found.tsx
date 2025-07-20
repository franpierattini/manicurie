import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center text-center p-6">
      <AlertTriangle size={48} className="text-pink-500 mb-4" />
      <h1 className="text-2xl font-bold text-pink-700">Página no encontrada</h1>
      <p className="text-muted-foreground mt-2">
        No pudimos encontrar lo que buscás.
      </p>
      <Link href="/" className="mt-6 text-pink-600 hover:underline">
        Volver al inicio
      </Link>
    </main>
  );
}
