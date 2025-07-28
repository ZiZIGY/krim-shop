<script setup lang="ts">
  import type { CarouselApi } from '../ui/carousel';
  import { motion } from 'motion-v';

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
    products?: Product[];
  }

  withDefaults(defineProps<Props>(), {
    products: () => [
      {
        id: '1',
        name: 'Диван-кровать трансформер "Универсал"',
        brand: 'IKEA',
        price: 75000,
        originalPrice: 85000,
        discount: 12,
        rating: 5,
        reviewsCount: 23,
        image: 'https://picsum.photos/400/400?random=10',
        inStock: true,
        material: 'Рогожка, металл',
        dimensions: '220×95×85 см',
      },
      {
        id: '2',
        name: 'Кресло-качалка с подлокотниками',
        brand: 'Pottery Barn',
        price: 125000,
        rating: 4,
        reviewsCount: 15,
        image: 'https://picsum.photos/400/400?random=11',
        inStock: true,
        material: 'Натуральная кожа, дерево',
        dimensions: '75×85×95 см',
      },
      {
        id: '3',
        name: 'Стол журнальный с полкой',
        brand: 'West Elm',
        price: 45000,
        originalPrice: 55000,
        discount: 18,
        rating: 4,
        reviewsCount: 31,
        image: 'https://picsum.photos/400/400?random=12',
        inStock: true,
        material: 'Мрамор, латунь',
        dimensions: '120×60×45 см',
      },
      {
        id: '4',
        name: 'Комод 6-ящичный с зеркалом',
        brand: 'Ashley',
        price: 68000,
        rating: 4,
        reviewsCount: 28,
        image: 'https://picsum.photos/400/400?random=13',
        inStock: true,
        material: 'МДФ, шпон ореха',
        dimensions: '120×45×85 см',
      },
      {
        id: '5',
        name: 'Стеллаж книжный модульный',
        brand: 'CB2',
        price: 52000,
        originalPrice: 62000,
        discount: 16,
        rating: 5,
        reviewsCount: 42,
        image: 'https://picsum.photos/400/400?random=14',
        inStock: true,
        material: 'Дерево, металл',
        dimensions: '180×35×180 см',
      },
      {
        id: '6',
        name: 'Люстра подвесная хрустальная',
        brand: 'Pottery Barn',
        price: 89000,
        rating: 4,
        reviewsCount: 19,
        image: 'https://picsum.photos/400/400?random=15',
        inStock: true,
        material: 'Хрусталь, латунь',
        dimensions: 'Ø60×120 см',
      },
    ],
  });

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
  };

  // Methods
  const handleFavoriteToggle = (productId: string) => {
    console.log('Toggle favorite:', productId);
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  const handleAddToCompare = (productId: string) => {
    console.log('Add to compare:', productId);
  };
</script>

<template>
  <section class="py-16 bg-muted/30">
    <div class="container mx-auto px-4">
      <!-- Заголовок секции -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="mb-12"
      >
        <h2 class="text-3xl font-bold mb-4"> Новинки </h2>
        <p class="text-muted-foreground max-w-2xl">
          Свежие поступления в нашем каталоге
        </p>
      </motion.div>

      <!-- Слайдер товаров -->
      <motion.div
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="relative"
      >
        <UiCarousel
          :opts="{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
          }"
          @init-api="setApi"
        >
          <UiCarouselContent class="-ml-4">
            <UiCarouselItem
              v-for="(product, index) in products"
              :key="product.id"
              class="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <motion.div
                :initial="{ opacity: 0, scale: 0.9 }"
                :while-in-view="{ opacity: 1, scale: 1 }"
                :transition="{
                  duration: 0.5,
                  delay: index * 0.1,
                }"
                :while-hover="{ scale: 1.02 }"
              >
                <ModuleCatalogCard
                  :product="product"
                  @favorite-toggle="handleFavoriteToggle"
                  @quick-view="handleQuickView"
                  @add-to-cart="handleAddToCart"
                  @add-to-compare="handleAddToCompare"
                />
              </motion.div>
            </UiCarouselItem>
          </UiCarouselContent>
          <ClientOnly>
            <UiCarouselNext />
            <UiCarouselPrevious />
          </ClientOnly>
        </UiCarousel>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
        class="text-center mt-12"
      >
        <UiButton
          variant="outline"
          size="lg"
          as-child
        >
          <NuxtLink to="/catalog">
            Смотреть все новинки
            <Icon
              name="mdi:arrow-right"
              class="h-4 w-4 ml-2"
            />
          </NuxtLink>
        </UiButton>
      </motion.div>
    </div>
  </section>
</template>

<style scoped></style>
