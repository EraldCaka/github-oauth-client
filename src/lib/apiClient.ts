import axios, { AxiosError } from "axios";

export interface APIClientError extends AxiosError {}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5555",
  withCredentials: true,
});

class APIClient<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(this.endpoint);
      return response.data;
    } catch (error) {
      throw error as APIClientError;
    }
  };

  post = async (data: T): Promise<T> => {
    try {
      const response = await axiosInstance.post<T>(this.endpoint, data);
      return response.data;
    } catch (error) {
      throw error as APIClientError;
    }
  };
}

export default APIClient;
