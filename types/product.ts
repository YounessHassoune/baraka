export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  imageLink: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  startDate: Date;
  endDate: Date;
  imageLink: string;
}

export interface UpdateProductInput {
  id: string;
  name?: string;
  price?: number;
  discountPrice?: number;
  quantity?: number;
  startDate?: Date;
  endDate?: Date;
  imageLink?: string;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  active?: boolean;
}
