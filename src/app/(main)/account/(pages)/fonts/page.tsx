

import { UploadFont, FontList } from "./modules";

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <UploadFont/>
        <FontList/>
      </main>
    </div>
  );
}
