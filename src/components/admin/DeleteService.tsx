"use client";

import { useState } from "react";
import { deleteServicioAction } from "./actions";
import { Button } from "@/components/button";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

export const DeleteServicioButton = ({
  servicioId,
}: {
  servicioId: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    try {
      await deleteServicioAction(servicioId);
      router.refresh();
    } catch (err) {
      setError("No se pudo eliminar el servicio.");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button onClick={handleDelete} variant="ghost" size="icon">
        <Trash />
      </Button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
