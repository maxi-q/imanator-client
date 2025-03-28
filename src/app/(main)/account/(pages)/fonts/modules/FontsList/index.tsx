'use client'

import { useFonts } from "@/app/hooks/useFonts";
import fontsService from "@/services/fonts/fonts.service";
import { LoadingTable } from "./components/LoadingTable";
import { FontsTable } from "./components/FontsTable";

const FontList = () => {
  const { fonts, isLoading, isRefetching } = useFonts();

  const downloadFont = async (fileId: string, fileName: string) => {
    const downloadUrl = await fontsService.getDownloadUrl(fileId);

    const response = await fetch(downloadUrl);

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] w-full transition-colors">
      {isLoading || isRefetching ? (
        <LoadingTable />
      ) : (
        <FontsTable fonts={fonts} downloadFont={downloadFont}/>
      )}
    </div>
  )
}

export default FontList