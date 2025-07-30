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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
        inStock: true,
        material: 'Хрусталь, латунь',
        dimensions: 'Ø60×120 см',
      },
    ],
  });
</script>

<template>
  <WidgetShowcase
    item-key="id"
    :items="products"
    slider-title="Новинки"
    slider-description="Свежие поступления в нашем каталоге"
    slider-button-text="Смотреть все новинки"
    slider-button-link="/catalog"
    :show-slider-button="true"
  >
    <template #default="{ item }">
      <ModuleCatalogCard :product="item" />
    </template>
  </WidgetShowcase>
</template>
