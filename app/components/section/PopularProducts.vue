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
        name: 'Современный диван "Комфорт" с мягкой обивкой',
        brand: 'IKEA',
        price: 45000,
        originalPrice: 55000,
        discount: 18,
        rating: 4,
        reviewsCount: 127,
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
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
        image: '/shkaf.png',
        inStock: true,
        material: 'МДФ, шпон',
        dimensions: '45×45×55 см',
      },
    ],
  });
</script>

<template>
  <WidgetShowcase
    item-key="id"
    :items="products"
    slider-title="Популярные товары"
    slider-description="Самые востребованные товары нашего каталога"
    slider-button-text="Смотреть все товары"
    slider-button-link="/catalog"
    :show-slider-button="true"
  >
    <template #default="{ item }">
      <ModuleCatalogCard :product="item" />
    </template>
  </WidgetShowcase>
</template>

<style scoped></style>
