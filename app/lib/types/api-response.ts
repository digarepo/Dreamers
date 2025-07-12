export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string;
}

export type TypedApiResponse<T> = Response & {
  json(): Promise<ApiResponse<T>>;
};
