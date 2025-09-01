export interface Product {
  id?: number,
  name: string,
  code: string,
  materials: Material[],
}
export interface Material {
  id?: number,
  name: string,
  colors: Color[],
}
export interface Color {
  id?: number,
  name: string,
  stock: number,
  photoPath?: string,
  key?: string
}


export interface PageProduct {
  id: number,
  name: string,
  code: string,
  materials: string[];
  colors: string[];
  totalStock: number;
}

export interface StockUpdateRequest {
  date: string;
  stock: {
    id: number,
    amount: number;
  }[]
}
