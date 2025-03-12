import { instance } from '@/api/axios';

class ImagesService {
  private _BASE_URL = '/images';

  async getUploadConfig() {
    const response = await instance.get<{
      url: string;
      fields: Record<string, string>;
    }>(`${this._BASE_URL}/9f83eff7-4e27-4aae-a62e-9e69aa941724/upload-config`);
    return response.data;
  }

  async uploadFileToS3(file: File) {
    try {
      const { url, fields } = await this.getUploadConfig();
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('file', file);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке файла');
      }

      return response;
    } catch (e) {
      throw e
    }
  }
}

const imagesService = new ImagesService();

export default imagesService;