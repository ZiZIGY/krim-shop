<script setup lang="ts">
  import { motion } from 'motion-v';
  import type { CarouselApi } from '@/components/ui/carousel';

  interface ProductDetail {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: string;
    discount_price: string;
    discount_percent: number;
    effective_price: string;
    sku: string;
    is_active: boolean;
    in_stock: string;
    stock: number;
    width: string;
    height: string;
    depth: string;
    color: Color;
    category: Category;
    breadcrumbs: string;
    image: string;
    images: Image[];
    tags: Category[];
    attributes: Attribute[];
    created_at: Date;
    updated_at: Date;
    related_products: Product[];
    related_by_color: Product[];
  }

  interface Attribute {
    attribute_id: number;
    attribute_name: string;
    attribute_slug: string;
    option_id: number;
    option_value: string;
  }

  interface Category {
    id: number;
    name: string;
    slug: string;
  }

  interface Color {
    id: number;
    name: string;
    hex_code: string;
  }

  interface Image {
    id: number;
    image: string;
    alt_text: string;
  }

  const api = shallowRef<CarouselApi>();
  const config = useRuntimeConfig();
  const route = useRoute();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
  };

  const { data: product } = await useFetch<ProductDetail>(
    `/api/products/${route.params.slug}`,
    {
      baseURL: config.public.apiUrl,
    }
  );

  const formatPrice = (price?: number | string) => {
    return price?.toLocaleString('ru-RU');
  };

  // SEO
  useHead({
    title: `${product?.value?.title} - ${config.public.siteName}`,
    meta: [
      {
        name: 'description',
        content: product?.value?.description?.slice(0, 160) || '',
      },
      {
        property: 'og:title',
        content: `${product?.value?.title} - ${config.public.siteName}`,
      },
      {
        property: 'og:description',
        content: product?.value?.description?.slice(0, 160) || '',
      },
    ],
  });

  const { add } = useCart();
</script>

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
            <span class="text-foreground font-medium">
              {{ product?.title }}
            </span>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <!-- Первый блок: Слайдер + Информация о товаре -->
      <div
        v-if="product"
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
      >
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
                v-for="slide in product?.images"
                :key="slide.id"
                class="aspect-square"
              >
                <div class="w-full h-full bg-muted rounded-lg overflow-hidden">
                  <NuxtImg
                    :src="slide.image"
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
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold mb-2">{{ product?.title }}</h1>
            <div
              v-if="product?.tags?.length"
              class="mt-4 flex flex-wrap gap-2"
            >
              <span
                v-for="tag in product.tags"
                :key="tag.id"
                class="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ tag.name }}
              </span>
            </div>
          </div>

          <!-- Цены -->
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="text-3xl font-bold text-primary">
                {{ formatPrice(product?.price) }} ₽
              </span>
              <!-- <span
                v-if="
                  product.originalPrice &&
                  product.originalPrice !== product.price
                "
                class="text-xl text-muted-foreground line-through"
              >
                {{ formatPrice(product.originalPrice) }} ₽
              </span> -->
            </div>
            <div
              v-if="product?.discount_price"
              class="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium"
            >
              Скидка {{ product.discount_percent }}%
            </div>
          </div>

          <!-- Кнопки действий -->
          <div class="space-y-3">
            <UiButton
              size="lg"
              class="w-full"
              :disabled="!product?.in_stock"
              @click="add(product.id)"
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
              :disabled="!product?.in_stock"
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
              v-if="product"
              :product-id="product?.id"
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
              <span class="text-muted-foreground">Артикул</span>
              <span class="font-medium">{{ product?.sku || '—' }}</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="text-muted-foreground">Категория</span>
              <span class="font-medium">{{
                product?.category?.name || '—'
              }}</span>
            </div>
            <div
              v-if="product?.color"
              class="flex justify-between py-2 border-b"
            >
              <span class="text-muted-foreground">Цвет</span>
              <span class="flex items-center gap-2 font-medium">
                <span
                  class="inline-block w-4 h-4 rounded-full border"
                  :style="{ backgroundColor: product?.color?.hex_code }"
                />
                {{ product?.color?.name }}
              </span>
            </div>
            <div
              v-if="product?.width && product?.height && product?.depth"
              class="flex justify-between py-2 border-b"
            >
              <span class="text-muted-foreground">Размеры (Ш×В×Г)</span>
              <span class="font-medium">
                {{ product?.width }} × {{ product?.height }} ×
                {{ product?.depth }} см
              </span>
            </div>
          </div>
          <div class="space-y-4">
            <div
              v-for="attr in product?.attributes"
              :key="attr.attribute_id"
              class="flex justify-between py-2 border-b"
            >
              <span class="text-muted-foreground">{{
                attr.attribute_name
              }}</span>
              <span class="font-medium">{{ attr.option_value }}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <!-- Описание -->
      <div
        v-if="product?.description"
        class="mt-6"
      >
        <h2 class="text-xl font-semibold mb-2">Описание</h2>
        <div
          class="prose max-w-none text-sm text-muted-foreground"
          v-text="product.description"
        />
      </div>
    </section>

    <WidgetShowcase
      v-if="product?.related_products.length"
      item-key="id"
      :items="product.related_products"
      slider-title="Похожие товары"
      slider-description="Данные товары могут быть похожи на этот товар"
    >
      <template #default="{ item }">
        <ModuleCatalogCard :product="item" />
      </template>
    </WidgetShowcase>

    <WidgetShowcase
      v-if="product?.related_by_color.length"
      item-key="id"
      :items="product.related_by_color"
      slider-title="Связанные по цвету"
      slider-description="У данных товаров может быть схож цвет"
    >
      <template #default="{ item }">
        <ModuleCatalogCard :product="item" />
      </template>
    </WidgetShowcase>
  </div>
</template>

<style scoped></style>
