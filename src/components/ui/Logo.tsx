"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const companyName = "MANICURISTA";

export const Logo = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <h1 className="flex items-center font-bold" aria-label="homepage">
        {companyName}
      </h1>
    );
  }
  return (
    <div className="flex items-center font-bold text-pink-600">
      <Link aria-label="homepage" href="/">
        {companyName}
      </Link>
    </div>
  );
};
