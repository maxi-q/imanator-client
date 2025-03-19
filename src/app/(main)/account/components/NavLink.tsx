'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? 'text-blue-700 font-semibold'
          : 'text-blue-500 hover:text-blue-700'
      } transition-colors`}
    >
      {children}
    </Link>
  );
}