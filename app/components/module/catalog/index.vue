<script setup lang="ts">
  interface FilterConfig {
    key: string;
    title: string;
    type: 'checkbox' | 'range' | 'radio' | 'switch';
    options?: Array<{ value: string | number; label: string; count?: number }>;
    min?: number;
    max?: number;
    step?: number;
    placeholders?: string[];
    label?: string;
  }

  interface FilterValues {
    [key: string]:
      | string[]
      | [number, number]
      | string
      | number
      | boolean
      | undefined;
  }

  interface Props {
    category?: string;
    initialFilters?: FilterValues;
    title?: string;
    description?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    category: '',
    initialFilters: () => ({}),
    title: 'Каталог мебели',
    description: 'Широкий выбор качественной мебели для дома и офиса',
  });

  // State
  const showMobileFilters = ref(false);
  const loading = ref(false);
  const hasMore = ref(true);
  const activeFilters = ref<FilterValues>({ ...props.initialFilters });
  const sortBy = ref('default');

  // Конфигурация фильтров
  const filterConfig: FilterConfig[] = [
    {
      key: 'categories',
      title: 'Категории',
      type: 'checkbox',
      options: [
        { value: 'sofas', label: 'Диваны', count: 45 },
        { value: 'chairs', label: 'Стулья', count: 23 },
        { value: 'tables', label: 'Столы', count: 31 },
        { value: 'beds', label: 'Кровати', count: 12 },
        { value: 'wardrobes', label: 'Шкафы', count: 18 },
        { value: 'storage', label: 'Системы хранения', count: 25 },
      ],
    },
    {
      key: 'price',
      title: 'Цена',
      type: 'range',
      min: 0,
      max: 200000,
      step: 1000,
      placeholders: ['От', 'До'],
    },
    {
      key: 'brands',
      title: 'Бренды',
      type: 'checkbox',
      options: [
        { value: 'ikea', label: 'IKEA' },
        { value: 'ashley', label: 'Ashley' },
        { value: 'wayfair', label: 'Wayfair' },
        { value: 'west-elm', label: 'West Elm' },
        { value: 'cb2', label: 'CB2' },
      ],
    },
    {
      key: 'rating',
      title: 'Рейтинг',
      type: 'radio',
      options: [
        { value: 4, label: '4 звезды и выше' },
        { value: 3, label: '3 звезды и выше' },
        { value: 2, label: '2 звезды и выше' },
        { value: 1, label: '1 звезда и выше' },
      ],
    },
    {
      key: 'inStock',
      title: 'Наличие',
      type: 'switch',
      label: 'Только в наличии',
    },
  ];

  // Computed
  const currentCategory = computed(() => {
    if (!props.category) return null;
    const categoryConfig = filterConfig.find((f) => f.key === 'categories');
    const option = categoryConfig?.options?.find(
      (opt) => opt.value === props.category
    );
    return option?.label || props.category;
  });

  const pageTitle = computed(() => {
    return currentCategory.value
      ? `${currentCategory.value} - ${props.title}`
      : props.title;
  });

  const pageDescription = computed(() => {
    if (currentCategory.value) {
      return `Выберите ${currentCategory.value.toLowerCase()} из нашего каталога`;
    }
    return props.description;
  });

  const activeFiltersCount = computed(() => {
    return Object.values(activeFilters.value).filter((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return value;
      return value !== undefined && value !== null;
    }).length;
  });

  const filteredProducts = computed(() => {
    // Здесь была бы логика фильтрации товаров
    // Пока возвращаем пустой массив, чтобы Grid сам сгенерировал данные
    return [];
  });

  // Methods
  const handleFiltersChanged = (filters: FilterValues) => {
    activeFilters.value = { ...filters };
    // Здесь была бы логика применения фильтров и загрузки данных
    console.log('Filters changed:', filters);
  };

  const handleMobileFiltersChanged = (filters: FilterValues) => {
    activeFilters.value = { ...filters };
    showMobileFilters.value = false;
  };

  const handleResetFilters = () => {
    activeFilters.value = {};
  };

  const handleSortChange = (newSortBy: string) => {
    sortBy.value = newSortBy;
    // Логика сортировки
  };

  const handleLoadMore = () => {
    loading.value = true;
    // Имитация загрузки
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  };

  const handleFavoriteToggle = (productId: string) => {
    console.log('Toggle favorite:', productId);
    // Логика добавления/удаления из избранного
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    // Логика быстрого просмотра товара
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Логика добавления в корзину
  };

  const handleAddToCompare = (productId: string) => {
    console.log('Add to compare:', productId);
    // Логика добавления к сравнению
  };

  // SEO
  useHead({
    title: pageTitle,
    meta: [
      { name: 'description', content: pageDescription },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: pageDescription },
    ],
  });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex gap-8">
      <!-- Боковая панель с фильтрами -->
      <aside class="hidden lg:block w-80 flex-shrink-0">
        <div class="sticky top-24">
          <ModuleCatalogFilter
            :config="filterConfig"
            :initial-filters="activeFilters"
            @filters-changed="handleFiltersChanged"
          />
        </div>
      </aside>

      <!-- Основной контент -->
      <main class="flex-1 min-w-0">
        <!-- Мобильные фильтры -->
        <div class="lg:hidden mb-6">
          <UiButton
            variant="outline"
            class="w-full"
            @click="showMobileFilters = true"
          >
            <Icon
              name="mdi:filter-variant"
              class="h-4 w-4 mr-2"
            />
            Фильтры
            <span
              v-if="activeFiltersCount > 0"
              class="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs"
            >
              {{ activeFiltersCount }}
            </span>
          </UiButton>
        </div>

        <!-- Хлебные крошки -->
        <nav class="mb-6">
          <ol class="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <NuxtLink
                to="/"
                class="hover:text-foreground transition-colors"
              >
                Главная
              </NuxtLink>
            </li>
            <Icon
              name="mdi:chevron-right"
              class="h-4 w-4"
            />
            <li>
              <NuxtLink
                to="/catalog"
                class="hover:text-foreground transition-colors"
              >
                Каталог
              </NuxtLink>
            </li>
            <Icon
              v-if="currentCategory"
              name="mdi:chevron-right"
              class="h-4 w-4"
            />
            <li
              v-if="currentCategory"
              class="text-foreground font-medium"
            >
              {{ currentCategory }}
            </li>
          </ol>
        </nav>

        <!-- Заголовок страницы -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">
            {{ pageTitle }}
          </h1>
          <p
            v-if="pageDescription"
            class="text-muted-foreground"
          >
            {{ pageDescription }}
          </p>
        </div>

        <!-- Сетка товаров -->
        <ModuleCatalogGrid
          :initial-products="filteredProducts"
          :loading="loading"
          :has-more="hasMore"
          @favorite-toggle="handleFavoriteToggle"
          @quick-view="handleQuickView"
          @add-to-cart="handleAddToCart"
          @add-to-compare="handleAddToCompare"
          @load-more="handleLoadMore"
          @reset-filters="handleResetFilters"
          @sort-change="handleSortChange"
        />
      </main>
    </div>

    <!-- Мобильный фильтр в модальном окне -->
    <UiDialog v-model:open="showMobileFilters">
      <UiDialogContent class="max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>Фильтры</UiDialogTitle>
        </UiDialogHeader>

        <div class="py-4">
          <ModuleCatalogFilter
            :config="filterConfig"
            :initial-filters="activeFilters"
            @filters-changed="handleMobileFiltersChanged"
          />
        </div>

        <UiDialogFooter>
          <UiButton
            variant="outline"
            @click="handleResetFilters"
          >
            Сбросить
          </UiButton>
          <UiButton @click="showMobileFilters = false"> Применить </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<style scoped></style>
