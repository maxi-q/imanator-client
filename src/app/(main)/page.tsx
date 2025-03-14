import UploadImage from "./modules/UploadImage";
import ImagesList from "./modules/ImagesList";

import { protectPage } from "@/utils/server/protect-page";

export default async function Home() {
  await protectPage()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UploadImage/>
        <ImagesList/>
      </main>
    </div>
  );
}
