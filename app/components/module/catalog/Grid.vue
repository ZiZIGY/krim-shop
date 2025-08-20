<script setup lang="ts">
  interface Props {
    initialProducts?: Product[];
    loading?: boolean;
    currentPage?: number;
    totalPages?: number;
    cardsCount?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    initialProducts: () => [],
    loading: false,
    currentPage: 1,
    totalPages: 1,
    cardsCount: 0
  });
  
  const router = useRouter();
  const route = useRoute();
  const currentPage = shallowRef(Number(route.query.page) || props.currentPage || 1);
  
  // Получаем отсортированный список товаров
  const sortOrder = ref(route.query.sort as string || 'default');
  
  const sortProducts = computed(() => {
    if (!props.initialProducts) return [];
    
    const products = [...props.initialProducts];
    
    switch (sortOrder.value) {
      case 'price-asc':
        return products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case 'price-desc':
        return products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case 'name':
        return products.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  });
  
  // Обработчики событий
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    
    const query = { ...route.query, page: page.toString() };
    if (page === 1) {
      delete query.page;
    }
    
    router.push({ query });
  };
  
  const handleSortChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    sortOrder.value = target.value;
    
    const query = { ...route.query, sort: target.value };
    if (target.value === 'default') {
      delete query.sort;
    }
    
    router.push({ query });
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок и сортировка -->

    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">Сортировка:</span>
      <select
        class="bg-background border border-border rounded-md px-3 py-1 text-sm"
        :value="sortOrder"
        @change="handleSortChange"
      >
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="name">По названию</option>
      </select>
    </div>

    <!-- Сетка товаров -->
    <div
      class="grid gap-6 transition-all duration-300 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <ModuleCatalogCard
        v-for="product in sortProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Пагинация -->
    <div
      v-if="props.totalPages > 1"
      class="flex justify-center pt-8"
    >
      <UiPagination
        v-slot="{ page }"
        :items-per-page="24"
        :total="props.cardsCount || 0"
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

          <UiPaginationEllipsis :index="4" />

          <UiPaginationNext />
        </UiPaginationContent>
      </UiPagination>
    </div>

    <!-- Пустое состояние -->
    <div
      v-if="sortProducts.length === 0 && !props.loading"
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
      <UiButton variant="outline"> Сбросить фильтры </UiButton>
    </div>
  </div>
</template>
