import Link from "next/link";
import { protectPage } from "@/utils/server/protect-page";

export default async function Home() {
  await protectPage();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Добро пожаловать!</h1>
        <p className="text-lg">Мы рады видеть вас здесь. Вот что вы можете сделать:</p>

        <div className="flex flex-col gap-4">
          <Link href="/account" className="text-blue-500 hover:text-blue-700">
            Перейти в аккаунт
          </Link>
        </div>
      </main>
    </div>
  );
}