import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import "dotenv/config";

const baseURL = process.env.REACT_PUBLIC_BACK_BASE;

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

export default new AxiosClient();
