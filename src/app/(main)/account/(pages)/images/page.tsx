

import { protectPage } from "@/utils/server/protect-page";
import { UploadImage, ImagesList } from "./modules";

export default async function Home() {
  await protectPage()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UploadImage/>
        <ImagesList/>
      </main>
    </div>
  );
}
