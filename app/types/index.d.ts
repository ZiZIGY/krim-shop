declare interface Product {
  id: number;
  title: string;
  slug: string;
  price: string;
  discount_price: string;
  discount_percent: number;
  sku: string;
  image: string;
  is_active: boolean;
  stock: number;
  width: string;
  height: string;
  depth: string;
  color: number;
  color_name: string;
  color_hex: string;
  category: number;
  category_slug: string;
  created_at: string;
}

declare interface FilterOption {
  id: number;
  value: string;
  count: number;
}

declare interface FilterAttribute {
  id: number;
  name: string;
  slug: string;
  filter_widget: string;
  is_multiselect: boolean;
  filter_order: number;
  options: FilterOption[];
}

declare interface FilterColor {
  id: number;
  name: string;
  hex_code?: string;
  count: number;
  slug?: string;
}

declare interface FilterRanges {
  [key: string]: {
    min: number;
    max: number;
  };
}

declare interface CatalogFilters {
  ranges: FilterRanges;
  colors: FilterColor[];
  tags: FilterColor[];
  attributes: FilterAttribute[];
}

declare interface CatalogResponse {
  count: number;
  next: string;
  previous: null;
  results: {
    results: Product[];
    filters: CatalogFilters;
  };
}
