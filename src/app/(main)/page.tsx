import { protectPage } from "@/utils/server/protect-page";
import Main from "./modules/Main";

export default async function Home() {
  await protectPage()

  return (
    <>
      <Main />
    </>
  );
}
