"use client";

import { useEffect } from "react";
import { Frown } from "lucide-react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center text-center p-6">
      <Frown size={48} className="text-pink-500 mb-4" />
      <h1 className="text-2xl font-bold text-pink-700">Oops, algo salió mal</h1>
      <p className="text-muted-foreground mt-2">{error.message}</p>
      <button
        onClick={() => location.reload()}
        className="mt-6 text-pink-600 hover:underline"
      >
        Recargar la página
      </button>
    </main>
  );
}
