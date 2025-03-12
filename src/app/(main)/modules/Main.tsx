'use client'
import imagesService from "@/services/images.servise";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false); // Состояние для отслеживания перетаскивания

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }

    try {
      await imagesService.uploadFileToS3(file);
      alert('Файл успешно загружен.');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при загрузке файла.');
    }
  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Drag and Drop область */}
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`rounded-lg border-2 border-dashed ${
              isDragging
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                : "border-gray-300 dark:border-gray-600"
            } p-8 text-center cursor-pointer transition-colors`}
          >
            <p className="text-gray-600 dark:text-gray-300">
              Перетащите файл сюда или{" "}
              <label
                htmlFor="fileInput"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                выберите файл
              </label>
              .
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            {file && (
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Выбранный файл: {file.name}
              </p>
            )}
          </div>

          {/* Кнопка для отправки файла */}
          <button
            onClick={handleSubmit}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Upload
          </button>
        </div>
      </main>
    </div>
  );
}