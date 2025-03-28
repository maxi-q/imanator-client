'use server'

import axios, { CreateAxiosDefaults } from "axios";
import { getContentType } from "./api.helper";
import { API_URL } from "@/constants";
import winston from "winston";

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  headers: getContentType(),
  withCredentials: true
};

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});

export const axiosServer = axios.create(axiosOptions)

axiosServer.interceptors.response.use(
  (config) => config, // Успешный ответ
  (error) => {
    const errorDetails = {
      data: {
        message: error.response?.data?.message || [], // Сообщения об ошибках
        path: error.response?.data?.path || '', // Путь запроса
        statusCode: error.response?.data?.statusCode || 500, // Код статуса
        timestamp: new Date().toISOString(), // Временная метка
      },
      level: 'error',
      message: error.message || 'Request failed',
      method: error.config?.method || 'unknown',
      // stack: error.stack || '',
      status: error.response?.status || 500,
      baseURL: error.config?.baseURL || '',
      url: error.config?.url || '',
    };

    logger.error('Request failed:', errorDetails);

    throw error;
  }
);