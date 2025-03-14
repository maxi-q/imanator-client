
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

export type getUploadConfigResponse = {
  url: string;
  fields: Record<string, string>;
}

export type getImagesResponse = {
  images: Array<{
      id: string
      createdAt: string
      name: string
      fileName: string
      description: string
    }>
}