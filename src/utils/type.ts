/** 所有 api 接口的响应数据都应该准守该格式 */
export default interface ApiResponseData<T> {
  alert: string;
  status: string;
  data: T;
  message: string;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: Page;
}

interface Page{
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface CommonRequest{
  pageNum: number;
  pageSize: number;
  orderField?: string;
  orderType?: 'ASC' | 'DESC';
}
