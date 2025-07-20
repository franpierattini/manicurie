"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
}

export const ButtonBack = ({ label = "Volver", className = "" }: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-pink-700 hover:bg-pink-50 transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
};
