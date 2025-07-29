<script setup lang="ts">
  interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewsCount: number;
    image: string;
    inStock: boolean;
    material?: string;
    dimensions?: string;
  }

  interface Props {
    initialProducts?: Product[];
    loading?: boolean;
    currentPage?: number;
    totalPages?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    initialProducts: () => [],
    loading: false,
    currentPage: 1,
    totalPages: 5, // Тестовые данные - 5 страниц
  });

  const sortBy = ref('default');
  const currentPage = ref(props.currentPage);

  // Генерируем тестовые данные если не переданы
  const generateProducts = (): Product[] => {
    const names = [
      'Современный диван "Комфорт"',
      'Кресло-качалка "Релакс"',
      'Обеденный стол "Классик"',
      'Шкаф-купе "Модерн"',
      'Кровать "Сонная"',
      'Стул барный "Хай-тек"',
      'Комод "Винтаж"',
      'Тумба под ТВ "Медиа"',
      'Журнальный столик "Гласс"',
      'Кресло офисное "Босс"',
      'Пуф мягкий "Комфи"',
      'Стеллаж "Лофт"',
      'Диван угловой "Уют"',
      'Кресло кожаное "Премиум"',
      'Стол письменный "Офис"',
      'Шкаф книжный "Библиотека"',
      'Кровать односпальная "Малыш"',
      'Стул кухонный "Кухня"',
      'Комод детский "Радуга"',
      'Тумба прикроватная "Ночь"',
      'Журнальный столик "Кофе"',
      'Кресло компьютерное "Геймер"',
      'Пуф круглый "Мягкий"',
      'Стеллаж открытый "Полка"',
    ];

    const brands = [
      'IKEA',
      'Ashley',
      'Wayfair',
      'West Elm',
      'CB2',
      'Pottery Barn',
      'Herman Miller',
    ];
    const materials = [
      'Велюр, дерево',
      'Кожа, металл',
      'Ткань, пластик',
      'Массив дуба',
      'МДФ, шпон',
      'Алюминий, сетка',
      'Хрусталь, латунь',
    ];

    return Array.from({ length: 12 }, (_, i) => ({
      id: `product-${currentPage.value}-${i + 1}`,
      name: names[i] || `Товар ${i + 1}`,
      brand: brands[Math.floor(Math.random() * brands.length)] || 'IKEA',
      price: Math.floor(Math.random() * 80000) + 10000,
      originalPrice:
        Math.random() > 0.6
          ? Math.floor(Math.random() * 100000) + 50000
          : undefined,
      discount:
        Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined,
      rating: Math.floor(Math.random() * 5) + 1,
      reviewsCount: Math.floor(Math.random() * 200) + 5,
      image: `https://picsum.photos/400/400?random=${
        currentPage.value * 10 + i + 1
      }`,
      inStock: Math.random() > 0.1,
      material:
        materials[Math.floor(Math.random() * materials.length)] ||
        'Велюр, дерево',
      dimensions: `${180 + Math.floor(Math.random() * 100)}×${
        80 + Math.floor(Math.random() * 50)
      }×${70 + Math.floor(Math.random() * 30)} см`,
    }));
  };

  const products = ref<Product[]>(
    props.initialProducts.length > 0
      ? props.initialProducts
      : generateProducts()
  );

  // Computed
  const sortedProducts = computed(() => {
    const sorted = [...products.value];

    switch (sortBy.value) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  });

  const emit = defineEmits<{
    'page-change': [page: number];
  }>();

  const handlePageChange = (page: number) => {
    currentPage.value = page;
    // Обновляем товары для демонстрации
    products.value = generateProducts();
    emit('page-change', page);
  };
</script>

<template>
  <div class="space-y-6">
    <!-- Заголовок и сортировка -->

    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">Сортировка:</span>
      <select
        v-model="sortBy"
        class="bg-background border border-border rounded-md px-3 py-1 text-sm"
      >
        <option value="default">По умолчанию</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="rating">По рейтингу</option>
        <option value="name">По названию</option>
      </select>
    </div>

    <!-- Сетка товаров -->
    <div
      class="grid gap-6 transition-all duration-300 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    >
      <ModuleCatalogCard
        v-for="product in sortedProducts"
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
        :items-per-page="12"
        :total="props.totalPages * 12"
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
      v-if="products.length === 0 && !loading"
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
