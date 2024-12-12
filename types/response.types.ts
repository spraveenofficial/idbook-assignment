export interface ApiBaseResponseType<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
  support: Support;
}

export type Support = {
  url: string;
  text: string;
};


export interface AxiosErrorResponseType {
    success: boolean;
    message: string;
    code: number;
  }
  
