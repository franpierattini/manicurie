import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export const CartNavItem = async () => {
  return (
    <Link href="/cart" className="relative flex items-center">
      <ShoppingBagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
    </Link>
  );
};
