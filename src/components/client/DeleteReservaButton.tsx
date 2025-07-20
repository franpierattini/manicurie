"use client";

import React, { useState } from "react";
import { deleteReservaAction } from "./actions";
import { Button } from "../button";
import { useRouter } from "next/navigation";

const DeleteReservaButton = ({ reservaId }: { reservaId: string }) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const handleDelete = async () => {
    setErrorMsg("");
    try {
      await deleteReservaAction(reservaId);
      router.refresh();
    } catch (error) {
      setErrorMsg("No se pudo eliminar la reserva. Intenta nuevamente.");
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleDelete}
        className="bg-pink-600 hover:bg-pink-800 ml-2"
      >
        Eliminar
      </Button>

      {errorMsg && <p className="text-sm text-red-600 mt-2">{errorMsg}</p>}
    </div>
  );
};

export default DeleteReservaButton;
