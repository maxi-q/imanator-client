'use client'

import { useDeleteImage } from "@/app/hooks/useDeleteImage";
import { useRouter } from "next/navigation";
import { use } from "react";
import toast from "react-hot-toast";

export default function ImageInfo({ params }: { params: Promise<{ imageId: string }> }) {
  const { imageId } = use(params);
  const { deleteImage } = useDeleteImage()
  const router = useRouter()

  const handleDelete = async () => {
    const isConfirmed = confirm("Удалить изображение навсегда?");

    if (!isConfirmed) return;

    deleteImage(imageId, {
      onSuccess: () => {
        toast.success("Изображение успешно удалено", );

        router.replace('/account/images')
      },
      onError: () => {
        toast.error("Ошибка при удалении изображения");
      }
    })
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 text-center items-center sm:items-start">
        {imageId}
        <button
          onClick={() => handleDelete()}
          className="mx-auto px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Удалить изображение
        </button>
      </main>
    </div>
  );
}