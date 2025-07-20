import { Badge } from "../badge";

export function StatusBadge({ status }: { status: string }) {
  const colors = {
    pendiente: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    },
    confirmado: {
      bg: "bg-green-100",
      text: "text-green-800",
    },
    cancelado: {
      bg: "bg-red-100",
      text: "text-red-800",
    },
  };

  const { bg, text } = colors[status as keyof typeof colors] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <Badge variant="outline" className={`${bg} ${text}`}>
      Estado: {status}
    </Badge>
  );
}
