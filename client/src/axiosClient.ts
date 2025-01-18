import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import env from "./env";

const baseURL = env.BASE_URL;

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

class AxiosClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  public async post<T, R>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<R>> {
    try {
      const response: AxiosResponse<R> = await this.client.post(
        url,
        data,
        config
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
const instance = new AxiosClient();
export default instance;
