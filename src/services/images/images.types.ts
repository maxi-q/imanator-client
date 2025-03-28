
export type createImageRequest = {
  name: string
  fileName: string
  description: string
}

export type createImageResponse = {
    id: string,
    createdAt: string,
    name: string,
    fileName: string,
    description: string,
}

export type deleteImageRequest = {
  id: string
}

export type deleteImageResponse = { }

export type getUploadConfigResponse = {
  url: string;
  fields: Record<string, string>;
}

export type loadedImages = {
  id: string
  createdAt: string
  name: string
  fileName: string
  description: string
}

export type getImagesResponse = {
  fonts: Array<loadedImages>
}