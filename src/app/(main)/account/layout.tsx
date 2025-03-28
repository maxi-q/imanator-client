import { protectPage } from "@/utils/server/protect-page";

import { ReactNode } from "react";
import { NavLink } from "./components/NavLink";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await protectPage();

  return (
    <div className="grid min-h-screen grid-cols-[200px_1fr] w-full gap-8 font-[family-name:var(--font-geist-sans)]">
      <nav className="flex flex-col gap-4 p-4 border-r">
        <h2 className="mb-4 text-xl font-bold">Навигация</h2>
        <NavLink href="/account">Профиль</NavLink>
        <NavLink href="/account/images">Изображения</NavLink>
        <NavLink href="/account/fonts">Шрифты</NavLink>
        <NavLink href="/account/billing">Платежный аккаунт</NavLink>
      </nav>

      <main className="flex flex-col gap-8">
        {children}
      </main>
    </div>
  );
}