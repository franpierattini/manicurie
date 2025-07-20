import { LucideIcon } from "lucide-react";

interface CardResumenProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const CardResumen = ({ title, value, icon: Icon }: CardResumenProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-sm">
      <Icon className="w-6 h-6 text-pink-600" />
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-lg font-semibold text-pink-700">{value}</p>
      </div>
    </div>
  );
};
