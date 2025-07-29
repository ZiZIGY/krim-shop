<template>
  <div>
    <section class="container mx-auto px-4 py-8">
      <!-- Хлебные крошки -->
      <UiBreadcrumb class="mb-8">
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

          <UiBreadcrumbSeparator />

          <UiBreadcrumbItem>
            <span class="text-foreground font-medium">{{ product.name }}</span>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <!-- Первый блок: Слайдер + Информация о товаре -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <!-- Слайдер с фото -->
        <div class="space-y-4">
          <UiCarousel
            class="w-full"
            :opts="{
              loop: true,
            }"
            @init-api="setApi"
          >
            <UiCarouselContent>
              <UiCarouselItem
                v-for="image in product.images"
                :key="image"
                class="aspect-square"
              >
                <div class="w-full h-full bg-muted rounded-lg overflow-hidden">
                  <NuxtImg
                    :src="image"
                    class="w-full h-full object-cover"
                    alt="Фото товара"
                  />
                </div>
              </UiCarouselItem>
            </UiCarouselContent>

            <!-- Навигация слайдера -->
            <ClientOnly>
              <WidgetCarouselNavigation
                :carousel-api="api"
                class="absolute bottom-4 left-1/2 -translate-x-1/2"
              />
            </ClientOnly>
          </UiCarousel>
        </div>

        <!-- Информация о товаре -->
        <div class="space-y-6">
          <!-- Название и бренд -->
          <div>
            <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
            <p class="text-lg text-muted-foreground">{{ product.brand }}</p>
          </div>

          <!-- Цены -->
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="text-3xl font-bold text-primary">
                {{ formatPrice(product.price) }} ₽
              </span>
              <span
                v-if="
                  product.originalPrice &&
                  product.originalPrice !== product.price
                "
                class="text-xl text-muted-foreground line-through"
              >
                {{ formatPrice(product.originalPrice) }} ₽
              </span>
            </div>
            <div
              v-if="product.discount"
              class="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium"
            >
              Скидка {{ product.discount }}%
            </div>
          </div>

          <!-- Рейтинг -->
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1">
              <Icon
                v-for="star in 5"
                :key="star"
                name="mdi:star"
                class="h-5 w-5"
                :class="
                  star <= product.rating
                    ? 'text-yellow-400'
                    : 'text-muted-foreground'
                "
              />
            </div>
            <span class="text-sm text-muted-foreground">
              {{ product.rating }} ({{ product.reviewsCount }} отзывов)
            </span>
          </div>

          <!-- Кнопки действий -->
          <div class="space-y-3">
            <UiButton
              size="lg"
              class="w-full"
              :disabled="!product.inStock"
            >
              <Icon
                name="mdi:cart-plus"
                class="h-5 w-5 mr-2"
              />
              Добавить в корзину
            </UiButton>

            <UiButton
              variant="outline"
              size="lg"
              class="w-full"
              :disabled="!product.inStock"
            >
              <Icon
                name="mdi:flash"
                class="h-5 w-5 mr-2"
              />
              Купить в 1 клик
            </UiButton>
          </div>

          <!-- Быстрые действия -->
          <div class="flex gap-3 justify-end">
            <WidgetFavorite
              :product-id="product.id"
              class="h-12 w-12"
            />
            <UiButton
              size="icon"
              class="h-12 w-12"
            >
              <Icon
                name="mdi:share-variant"
                class="h-5 w-5"
              />
            </UiButton>
          </div>
        </div>
      </div>

      <!-- Второй блок: Характеристики -->
      <motion.div
        class="space-y-8"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <h2 class="text-2xl font-semibold">Характеристики</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Бренд</span>
              <span class="font-medium">{{ product.brand }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Материал</span>
              <span class="font-medium">{{
                product.material || 'Не указан'
              }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Размеры</span>
              <span class="font-medium">{{
                product.dimensions || 'Не указаны'
              }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Цвет</span>
              <span class="font-medium">{{
                product.color || 'Не указан'
              }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Страна производства</span>
              <span class="font-medium">{{
                product.country || 'Не указана'
              }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Гарантия</span>
              <span class="font-medium">{{
                product.warranty || 'Не указана'
              }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Артикул</span>
              <span class="font-medium">{{ product.sku || 'Не указан' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Вес</span>
              <span class="font-medium">{{
                product.weight || 'Не указан'
              }}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
    <SectionNewProducts />
    <SectionPopularProducts />
  </div>
</template>

<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { CarouselApi } from '@/components/ui/carousel';

  const route = useRoute();
  const productId = route.params.id as string;

  // Тестовые данные товара
  const product = ref({
    id: productId,
    name: 'Современный диван "Комфорт" с мягкой обивкой и подлокотниками',
    brand: 'IKEA',
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    rating: 4,
    reviewsCount: 127,
    inStock: true,
    material: 'Велюр, дерево',
    dimensions: '200×90×85 см',
    color: 'Серый',
    country: 'Швеция',
    warranty: '2 года',
    sku: 'DI-2024-001',
    weight: '45 кг',
    images: [
      'https://picsum.photos/600/600?random=1',
      'https://picsum.photos/600/600?random=2',
      'https://picsum.photos/600/600?random=3',
      'https://picsum.photos/600/600?random=4',
    ],
  });

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  // SEO
  useHead({
    title: `${product.value.name} - МебельМаркет`,
    meta: [
      {
        name: 'description',
        content: `${product.value.name} от ${
          product.value.brand
        }. Цена: ${formatPrice(product.value.price)} ₽. Купить с доставкой.`,
      },
      { property: 'og:title', content: `${product.value.name} - МебельМаркет` },
      {
        property: 'og:description',
        content: `${product.value.name} от ${
          product.value.brand
        }. Цена: ${formatPrice(product.value.price)} ₽.`,
      },
    ],
  });
</script>

<style scoped></style>
