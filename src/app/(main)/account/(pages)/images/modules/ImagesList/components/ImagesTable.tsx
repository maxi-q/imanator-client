import { loadedImages } from "@/services/images/images.types"
import { ImageRow } from "./ImageRow"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useDeleteImage } from "@/app/hooks/useDeleteImage"

interface ImagesTable {
  images: Array<loadedImages>
  downloadImage: (fileId: string, fileName: string) => Promise<void>
}

export const ImagesTable = ({images, downloadImage}: ImagesTable) => {
  const router = useRouter()
  const { deleteImage } = useDeleteImage()

  const onEdit = (imageId: string) => { router.push(`images/${imageId}`) }

  const onDelete = async (imageId: string) => {
    const isConfirmed = confirm("Удалить изображение навсегда?");

    if (!isConfirmed) return;

    deleteImage(imageId, {
      onSuccess: () => {
        toast.success("Изображение успешно удалено", );
      },
      onError: () => {
        toast.error("Ошибка при удалении изображения");
      }
    })
  }

  return (
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
          <ImageRow key={image.id} image={image} downloadImage={downloadImage} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </tbody>
    </table>
  )
}