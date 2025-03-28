export type createFontRequest = {
  name: string
  fileName: string
  description: string
}

export type createFontResponse = {
    id: string,
    createdAt: string,
    name: string,
    fileName: string,
    description: string,
}

export type deleteFontRequest = {
  id: string
}

export type deleteFontResponse = { }

export type getUploadConfigResponse = {
  url: string;
  fields: Record<string, string>;
}

export type loadedFonts = {
  id: string
  createdAt: string
  name: string
  fileName: string
  description: string
}

export type getFontsResponse = {
  fonts: Array<loadedFonts>
}