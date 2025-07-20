import { Loader2, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-pink-50 text-center">
      <Sparkles className="text-pink-500 animate-pulse" size={36} />
      <h1 className="text-xl font-bold text-pink-700 animate-pulse">
        Preparando tu experiencia
      </h1>
      <p className="text-muted-foreground text-sm">
        Cargando estilos, uñas, brillos y encanto...
      </p>
      <Loader2 className="animate-spin text-pink-400" size={28} />
    </div>
  );
}
