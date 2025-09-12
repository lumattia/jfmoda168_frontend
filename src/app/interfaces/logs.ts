import { Color } from "./product";

export interface LogFilter {
  dateFrom?: string;   // ISO string
  dateTo?: string;
  add?: boolean;
  colorName?: string;
  materialName?: string;
  productCode?: string;
}
export interface Log {
  id:number;
  logDate?: string;   // ISO string
  action: string;
  amount?: number;
  colorName: string;
  materialName: string;
  productName: string;
  imageUrl: string;
}
