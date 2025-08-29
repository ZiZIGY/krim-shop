<script setup lang="ts">
  const config = useRuntimeConfig();
  const route = useRoute();

  const itemsPerPage = 24;

  const routeQuery = computed(() => route.query);
  const currentPage = shallowRef<number>(Number(route.query.page) || 1);

  const { data, status } = await useFetch<ApiProductsResponse>(
    '/api/products/',
    {
      baseURL: config.public.apiUrl,
      query: routeQuery,
    }
  );

  const totalPages = computed(() => data.value?.count || 0 / itemsPerPage);

  const handlePageChange = (value: number) =>
    navigateTo({
      query: {
        ...route.query,
        page: value,
      },
    });
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок и сортировка -->

    <div
      class="grid gap-6 transition-all duration-300 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <ModuleCatalogCard
        v-for="product in data?.results.results"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Пагинация -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center pt-8"
    >
      <UiPagination
        v-slot="{ page }"
        :items-per-page="itemsPerPage"
        :total="data?.count"
        :default-page="currentPage"
        @update:page="handlePageChange"
      >
        <UiPaginationContent v-slot="{ items }">
          <UiPaginationPrevious />

          <template
            v-for="(item, index) in items"
            :key="index"
          >
            <UiPaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </UiPaginationItem>
          </template>

          <UiPaginationNext />
        </UiPaginationContent>
      </UiPagination>
    </div>

    <!-- Пустое состояние -->
    <div
      v-if="!data?.results.results.length && status !== 'pending'"
      class="text-center py-12"
    >
      <Icon
        name="mdi:package-variant-closed"
        class="h-16 w-16 mx-auto text-muted-foreground mb-4"
      />
      <h3 class="text-lg font-medium mb-2">Товары не найдены</h3>
      <p class="text-muted-foreground mb-4">
        Попробуйте изменить параметры фильтрации
      </p>
    </div>
  </div>
</template>
