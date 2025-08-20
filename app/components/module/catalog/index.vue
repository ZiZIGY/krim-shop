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
    title?: string;
    description?: string;
    cardsCount?: number;
    cards?: Product[];
    filters?: CatalogFilters;
  }

  const props = defineProps<Props>();

  const showMobileFilters = shallowRef(false);
  const activeFilters = ref<FilterValues>({});

  // Секции фильтров, открытые по умолчанию
  const defaultOpenSections = ref<string[]>(['price']);

  // Конфигурация фильтров
  const filterConfig = computed<FilterConfig[]>(() => {
    if (!props.filters) {
      return [];
    }

    const config: FilterConfig[] = [];

    // Добавляем диапазоны (например, цена)
    if (props.filters.ranges) {
      Object.entries(props.filters.ranges).forEach(([key, range]) => {
        config.push({
          key,
          title:
            key === 'price'
              ? 'Цена'
              : key === 'width'
              ? 'Ширина'
              : key === 'height'
              ? 'Высота'
              : key === 'depth'
              ? 'Глубина'
              : key.charAt(0).toUpperCase() + key.slice(1),
          type: 'range',
          min: range.min,
          max: range.max,
          step:
            key === 'price'
              ? 100
              : key === 'width' || key === 'height' || key === 'depth'
              ? 5
              : 1,
          placeholders: ['От', 'До'],
        });
      });
    }

    // Добавляем цвета
    if (props.filters.colors && props.filters.colors.length > 0) {
      config.push({
        key: 'colors',
        title: 'Цвета',
        type: 'checkbox',
        options: props.filters.colors.map((color) => ({
          value: color.id,
          label: color.name,
          count: color.count,
          color: color.hex_code,
        })),
      });
    }

    // Добавляем теги
    if (props.filters.tags && props.filters.tags.length > 0) {
      config.push({
        key: 'tags',
        title: 'Теги',
        type: 'checkbox',
        options: props.filters.tags.map((tag) => ({
          value: tag.id,
          label: tag.name,
          count: tag.count,
        })),
      });
    }

    // Добавляем атрибуты
    if (props.filters.attributes && props.filters.attributes.length > 0) {
      props.filters.attributes.forEach((attr) => {
        config.push({
          key: attr.slug,
          title: attr.name,
          type: attr.is_multiselect ? 'checkbox' : 'radio',
          options: attr.options.map((opt) => ({
            value: opt.id,
            label: opt.value,
            count: opt.count,
          })),
        });
      });
    }

    // Добавляем фильтр наличия
    config.push({
      key: 'inStock',
      title: 'Наличие',
      type: 'switch',
      label: 'Только в наличии',
    });

    return config;
  });

  const currentCategory = computed(() => {
    return props.category || null;
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

  // Состояния для навигации
  const router = useRouter();
  const route = useRoute();

  // Methods
  const handleFiltersChanged = async (filters: FilterValues) => {
    activeFilters.value = { ...filters };

    // Формируем параметры запроса из фильтров
    const queryParams: Record<string, string | number> = {};

    // Копируем текущие параметры запроса
    Object.entries(route.query).forEach(([key, value]) => {
      if (typeof value === 'string') {
        queryParams[key] = value;
      }
    });

    // Добавляем категорию, если она есть
    if (props.category) {
      queryParams.category = props.category;
    }

    // Обрабатываем различные типы фильтров
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) {
        // Пропускаем пустые значения
        return;
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          // Пустой массив - пропускаем
        } else if (
          key === 'price' ||
          value.every((v) => typeof v === 'number')
        ) {
          // Диапазон цен
          queryParams[`${key}_min`] = value[0];
          queryParams[`${key}_max`] = value[1];
        } else {
          // Массив значений (чекбоксы)
          queryParams[key] = value.join(',');
        }
      } else if (typeof value === 'boolean' && value) {
        queryParams[key] = 'true';
      } else if (value) {
        queryParams[key] = String(value);
      }
    });

    // Обновляем URL с новыми параметрами
    await router.push({ query: queryParams });
  };

  const handleMobileFiltersChanged = async (filters: FilterValues) => {
    await handleFiltersChanged(filters);
    showMobileFilters.value = false;
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
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Боковая панель с фильтрами -->
      <aside class="hidden lg:block w-80 flex-shrink-0">
        <div class="sticky top-[8.625rem]">
          <ModuleCatalogFilter
            :config="filterConfig"
            :initial-filters="activeFilters"
            :default-open-sections="defaultOpenSections"
            @filters-changed="handleFiltersChanged"
          />
        </div>
      </aside>

      <!-- Основной контент -->
      <section class="flex-1 min-w-0">
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
        <UiBreadcrumb class="mb-6">
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink as-child>
                <NuxtLink to="/">Главная</NuxtLink>
              </UiBreadcrumbLink>
            </UiBreadcrumbItem>

            <UiBreadcrumbSeparator />

            <UiBreadcrumbItem>
              <UiBreadcrumbLink as-child>
                <NuxtLink to="/catalog">Каталог</NuxtLink>
              </UiBreadcrumbLink>
            </UiBreadcrumbItem>

            <UiBreadcrumbSeparator v-if="currentCategory" />

            <UiBreadcrumbItem v-if="currentCategory">
              <span class="text-foreground font-medium">
                {{ currentCategory }}
              </span>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>

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
          :initial-products="props.cards"
          :cards-count="props.cardsCount"
        />
      </section>
    </div>

    <!-- Мобильный фильтр в drawer -->
    <UiDrawer v-model:open="showMobileFilters">
      <UiDrawerContent class="h-[85vh]">
        <div class="flex-1 overflow-y-auto p-6">
          <ModuleCatalogFilter
            :config="filterConfig"
            :initial-filters="activeFilters"
            :default-open-sections="defaultOpenSections"
            @filters-changed="handleMobileFiltersChanged"
          />
        </div>

        <!-- Убираем дублирующиеся кнопки - они уже есть в фильтре -->
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<style scoped></style>
