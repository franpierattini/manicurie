import { useRouter, useSearchParams } from "next/navigation";

export function useManicuristaFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilters = (nuevosFiltros: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(nuevosFiltros).forEach(([key, value]) => {
      if (value?.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }
    });

    router.push(`/search?${params.toString()}`);
  };
  const resetFilters = () => {
    router.push("/manicuristas");
  };

  return { applyFilters, resetFilters };
}
