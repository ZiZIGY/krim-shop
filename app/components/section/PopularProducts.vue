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
        name: 'Современный диван "Комфорт" с мягкой обивкой',
        brand: 'IKEA',
        price: 45000,
        originalPrice: 55000,
        discount: 18,
        rating: 4,
        reviewsCount: 127,
        image: 'https://picsum.photos/400/400?random=1',
        inStock: true,
        material: 'Велюр, дерево',
        dimensions: '200×90×85 см',
      },
      {
        id: '2',
        name: 'Стул офисный эргономичный',
        brand: 'Herman Miller',
        price: 85000,
        rating: 5,
        reviewsCount: 89,
        image: 'https://picsum.photos/400/400?random=2',
        inStock: true,
        material: 'Алюминий, сетка',
        dimensions: '65×65×120 см',
      },
      {
        id: '3',
        name: 'Стол обеденный из массива дерева',
        brand: 'West Elm',
        price: 125000,
        originalPrice: 150000,
        discount: 17,
        rating: 4,
        reviewsCount: 203,
        image: 'https://picsum.photos/400/400?random=3',
        inStock: true,
        material: 'Дуб',
        dimensions: '180×90×75 см',
      },
      {
        id: '4',
        name: 'Кровать двуспальная с мягким изголовьем',
        brand: 'Ashley',
        price: 95000,
        rating: 4,
        reviewsCount: 156,
        image: 'https://picsum.photos/400/400?random=4',
        inStock: false,
        material: 'Ткань, дерево',
        dimensions: '160×200×120 см',
      },
      {
        id: '5',
        name: 'Шкаф-купе 3-дверный',
        brand: 'IKEA',
        price: 65000,
        originalPrice: 75000,
        discount: 13,
        rating: 4,
        reviewsCount: 98,
        image: 'https://picsum.photos/400/400?random=5',
        inStock: true,
        material: 'ЛДСП, зеркало',
        dimensions: '200×60×220 см',
      },
      {
        id: '6',
        name: 'Тумба прикроватная с ящиками',
        brand: 'CB2',
        price: 35000,
        rating: 4,
        reviewsCount: 67,
        image: 'https://picsum.photos/400/400?random=6',
        inStock: true,
        material: 'МДФ, шпон',
        dimensions: '45×45×55 см',
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
        <h2 class="text-3xl font-bold mb-4"> Популярные товары </h2>
        <p class="text-muted-foreground max-w-2xl">
          Самые востребованные товары нашего каталога
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
            Смотреть все товары
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
