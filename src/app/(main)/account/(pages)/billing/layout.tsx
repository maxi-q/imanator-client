import { protectPage } from "@/utils/server/protect-page";

import { ReactNode } from "react";
import { TopUpModalWrapper } from "./modules/TopUpModalWrapper";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  await protectPage();

  return (
    <>
      {children}
      <TopUpModalWrapper />
    </>
  );
}