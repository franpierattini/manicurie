"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAgenda } from "./actions";
import { toast } from "sonner";

interface Props {
  agendaId: string;
}

export const DeleteAgenda = ({ agendaId }: Props) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteAgenda(agendaId);
      toast.success("Agenda eliminada con éxito");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button
      className="text-sm text-gray-600 hover:text-red-600"
      onClick={handleDelete}
    >
      <Trash2 />
    </button>
  );
};
