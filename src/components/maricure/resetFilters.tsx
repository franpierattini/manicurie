"use client";
import { useManicuristaFilters } from "@/hooks/applyFilters";
import { Button } from "../button";

export default function ResetFilters() {
  const { resetFilters } = useManicuristaFilters();
  return (
    <div>
      <Button variant="link" className="text-pink-700" onClick={resetFilters}>
        Recetear
      </Button>
    </div>
  );
}
