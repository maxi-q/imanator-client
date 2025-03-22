'use client'

import { useImages } from "@/app/hooks/useImages";
import imagesService from "@/services/images/images.service";
import { LoadingTable } from "./components/LoadingTable";
import { ImagesTable } from "./components/ImagesTable";

const ImagesList = () => {
  const { images, isLoading, isRefetching } = useImages();

  const downloadImage = async (fileId: string, fileName: string) => {
    const downloadUrl = await imagesService.getDownloadUrl(fileId);

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
        <ImagesTable images={images} downloadImage={downloadImage}/>
      )}
    </div>
  )
}

export default ImagesList