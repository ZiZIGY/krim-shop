type FormRangeMin = {
  [K in keyof CatalogFilters['ranges'] as K extends string
    ? `${K}_min`
    : never]?: number;
};

type FormRangeMax = {
  [K in keyof CatalogFilters['ranges'] as K extends string
    ? `${K}_max`
    : never]?: number;
};

type FormAttributes = {
  [K in keyof CatalogFilters['attributes'] as K extends string
    ? `attr_${K}`
    : never]?: number[] | number | string;
};

type FilterForm = FormRangeMin & FormRangeMax & FormAttributes;

export function useCatalog() {
  const config = useRuntimeConfig();
  const route = useRoute();

  // Получение параметров из URL

  // Получение товаров с учетом фильтров
  // const { refresh, pending: loadingProducts } =
  //   useFetch<CatalogResponse>('/api/products/', {
  //     baseURL: config.public.apiUrl,
  //     query: queryParams,
  //   });

  const {
    data: initialFilters,
    refresh: refreshFilters,
    pending: loadingFilters,
  } = useFetch<CatalogFilters>('/api/filters/', {
    baseURL: config.public.apiUrl,
    query: {
      category: route.params.slag,
    },
  });

  const filters = reactive<FilterForm>({});

  const handleFiltersChanged = () => {};

  return {
    filters,
    initialFilters,
    loadingFilters,
    handleFiltersChanged,
    refreshFilters,
  };
}
