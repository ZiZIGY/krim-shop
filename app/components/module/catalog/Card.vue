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
    product?: Product;
  }

  const props = withDefaults(defineProps<Props>(), {
    product: () => ({
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
    }),
  });

  const currentPrice = computed(() => {
    if (props.product.discount && props.product.originalPrice) {
      return props.product.originalPrice * (1 - props.product.discount / 100);
    }
    return props.product.price;
  });

  // Methods
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };
</script>

<template>
  <UiCard
    class="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col py-0 gap-0"
  >
    <!-- Изображение товара -->
    <div class="relative overflow-hidden">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <!-- Кнопки действий -->
      <div
        class="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <WidgetFavorite :product-id="product.id" />

        <NuxtLink :to="`/product/${product.id}`">
          <UiButton
            size="icon"
            variant="secondary"
            class="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Icon
              name="mdi:eye-outline"
              class="h-3.5 w-3.5"
            />
          </UiButton>
        </NuxtLink>
      </div>

      <!-- Статус наличия -->
      <div
        v-if="!product.inStock"
        class="absolute inset-0 bg-background/80 flex items-center justify-center"
      >
        <span class="text-muted-foreground font-medium text-sm"
          >Нет в наличии</span
        >
      </div>
    </div>

    <!-- Контент карточки -->
    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <NuxtLink
          :to="`/product/${product.id}`"
          class="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1"
        >
          {{ product.name }}
        </NuxtLink>
        <p class="text-xs text-muted-foreground mb-2">
          {{ product.brand }}
        </p>

        <!-- Характеристики -->
        <div class="space-y-0.5 text-xs text-muted-foreground mb-3">
          <div v-if="product.material"> {{ product.material }} </div>
          <div v-if="product.dimensions"> {{ product.dimensions }} </div>
        </div>
      </div>

      <!-- Цена -->
      <div class="flex items-end gap-2 mb-3">
        <span class="text-lg font-bold text-primary">
          {{ formatPrice(currentPrice) }} ₽
        </span>
        <span
          v-if="
            product.originalPrice && product.originalPrice !== product.price
          "
          class="text-xs text-muted-foreground line-through"
        >
          {{ formatPrice(product.originalPrice) }} ₽
        </span>
      </div>

      <!-- Кнопки -->
      <div class="flex gap-2">
        <UiButton
          size="sm"
          class="flex-1 text-xs"
          :disabled="!product.inStock"
        >
          <Icon
            name="mdi:cart-plus"
            class="h-3.5 w-3.5 mr-1"
          />
          В корзину
        </UiButton>
      </div>
    </div>
  </UiCard>
</template>
