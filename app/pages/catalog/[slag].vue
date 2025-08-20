<script lang="ts" setup>
  const config = useRuntimeConfig();
  const route = useRoute();

  // Получаем название категории из слага
  const categorySlug = Array.isArray(route.params.slag)
    ? route.params.slag[0]
    : route.params.slag;
    
  // Отслеживаем все параметры запроса
  const queryParams = computed(() => {
    // Собираем все параметры URL и добавляем категорию
    const params: Record<string, string | number> = { ...route.query };
    params.category = categorySlug;
    return params;
  });
  
  // Запрос данных с реактивным обновлением при изменении параметров
  const { data, refresh } = await useFetch<CatalogResponse>(`/api/products/`, {
    baseURL: config.public.apiUrl,
    query: queryParams,
  });
  
  // Отслеживаем изменения URL и обновляем данные
  watch(
    () => route.fullPath,
    () => refresh(),
    { deep: true }
  );
</script>

<template>
  <div>
    <ModuleCatalog
      :category="categorySlug"
      :cards-count="data?.count"
      :cards="data?.results?.results"
      :filters="data?.results?.filters"
    />
  </div>
</template>

<style></style>
