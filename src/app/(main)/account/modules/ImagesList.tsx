'use client'

import { useImages } from "@/app/hooks/useImages";
import imagesService from "@/services/images/images.service";

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
        <div className="flex items-center justify-center p-8 text-gray-600 dark:text-gray-300">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-solid border-black/[.08] dark:border-white/[.145]">
              <th className="p-4 text-left text-gray-600 dark:text-gray-300 text-sm font-normal">
                File Name
              </th>
              <th className="p-4 text-left text-gray-600 dark:text-gray-300 text-sm font-normal">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr
                key={image.id}
                className="hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors border-b border-solid border-black/[.08] dark:border-white/[.145] last:border-b-0"
              >
                <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">{image.name}</td>
                <td className="p-4">
                  <button
                    className="text-blue-500 hover:underline text-sm transition-colors"
                    onClick={() => downloadImage(image.id, image.fileName)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ImagesList