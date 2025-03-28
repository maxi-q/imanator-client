import { useState, useRef, useEffect } from "react"
import { loadedFonts } from "@/services/fonts/fonts.types"

interface FontsTable {
  font: loadedFonts
  downloadFont: (fileId: string, fileName: string) => Promise<void>
  onEdit: (fontId: string) => void
  onDelete: (fontId: string) => void
}

export const FontRow = ({ font, downloadFont, onEdit, onDelete }: FontsTable) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleOptionsClick = () => {
    setIsMenuOpen(true)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <tr
      onClick={() => onEdit(font.id)}
      className="group  hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors border-b border-solid border-black/[.08] dark:border-white/[.145] last:border-b-0 relative cursor-pointer"
    >
      <td className="p-4 text-gray-600 dark:text-gray-300 text-sm">
        {font.name}

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border dark:border-gray-700"
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(font.id)
                setIsMenuOpen(false)
              }}
              className="block w-full px-4 py-2.5 text-sm text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Редактировать
            </button>
            <div className="border-t dark:border-gray-700" />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(font.id)
                setIsMenuOpen(false)
              }}
              className="block w-full px-4 py-2.5 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-md"
            >
              Удалить
            </button>
          </div>
        )}
      </td>

      <td className="p-4">
        <div className="relative">
          <button
            className={`text-blue-500 hover:underline text-sm transition-transform duration-200`}
            onClick={(e) => {
              e.stopPropagation()
              downloadFont(font.id, font.fileName)
            }}
          >
            Download
          </button>
        </div>
      </td>

      <td
        onClick={(e) => {
          e.stopPropagation()
          handleOptionsClick()
        }}
        className="p-4 overflow-hidden"
      >
        <div className="relative">
          <div
            className={`absolute transition-transform duration-200 left-full top-1/2 -translate-y-1/2 ml-1 opacity-0 ${
              isMenuOpen ? 'opacity-100' : 'group-hover:opacity-100'
            } ${
              isMenuOpen ? '-translate-x-6' : 'group-hover:-translate-x-6'
            }`}
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01"
              />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  )
}