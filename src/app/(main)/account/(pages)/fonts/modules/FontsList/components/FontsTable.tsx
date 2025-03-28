import { loadedFonts } from "@/services/fonts/fonts.types"
import { FontRow } from "./FontRow"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useDeleteFont } from "@/app/hooks/useDeleteFont"

interface FontsTable {
  fonts: Array<loadedFonts>
  downloadFont: (fileId: string, fileName: string) => Promise<void>
}

export const FontsTable = ({fonts, downloadFont}: FontsTable) => {
  const router = useRouter()
  const { deleteFont } = useDeleteFont()

  const onEdit = (fontId: string) => { router.push(`fonts/${fontId}`) }

  const onDelete = async (fontId: string) => {
    const isConfirmed = confirm("Удалить изображение навсегда?");

    if (!isConfirmed) return;

    deleteFont(fontId, {
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
        {fonts.map((font) => (
          <FontRow key={font.id} font={font} downloadFont={downloadFont} onEdit={onEdit} onDelete={onDelete}/>
        ))}
      </tbody>
    </table>
  )
}