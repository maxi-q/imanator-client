import { instance } from '@/api/axios';
import { createImageRequest, createImageResponse, getImagesResponse, getUploadConfigResponse } from './images.types';

class ImagesService {
  private _BASE_URL = '/images';

  async createImage(data: createImageRequest) {
    const response = await instance.post<createImageResponse>(`${this._BASE_URL}/`, data);
    return response.data;
  }

  async getImages() {
    const response = await instance.get<getImagesResponse>(`${this._BASE_URL}/my`);
    return response.data;
  }

  async getDownloadUrl(fileId: string) {
    const response = await instance.get<string>(`${this._BASE_URL}/${fileId}/download-url`);
    return response.data;
  }

  async getUploadConfig(fileId?: string) {
    const response = await instance.get<getUploadConfigResponse>(`${this._BASE_URL}/${fileId}/upload-config`);
    return response.data;
  }

  async uploadFileToS3(file: File, fileId: string) {
    try {
      const { url, fields } = await this.getUploadConfig(fileId);
      const formData = new FormData();

      for (let [key, value] of Object.entries(fields)) {
        if (key === 'acl') continue;
        if (key === 'Content-Type') value = file.type;
        formData.append(key, value);
      }

      formData.append('file', file);

      const response = await instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status > 300) {
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