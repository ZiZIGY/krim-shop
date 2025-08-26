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
  filter_widget: 'radio' | 'checkbox' | 'chips' | 'select';
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
  title: string;
  min: number;
  max: number;
}
declare interface CatalogFilters {
  ranges: {
    [key: string]: FilterRanges;
  };
  colors: FilterColor[];
  tags: FilterColor[];
  attributes: {
    [key: string]: FilterAttribute;
  };
}

// Простые интерфейсы для фильтрации
declare interface FilterOption {
  value: string | number;
  title: string;
  count?: number;
  color?: string;
}

declare interface FilterConfig {
  key: string;
  title: string;
  type: 'checkbox' | 'range' | 'radio' | 'switch';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  label?: string;
}

// Значения фильтров в едином формате

declare interface CatalogResponse {
  count: number;
  next: string;
  previous: null;
  results: {
    results: Product[];
    filters: CatalogFilters;
  };
}
