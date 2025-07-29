<script setup lang="ts">
  import { ref } from 'vue';

  // Типы
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }

  // Тестовые данные
  const cartItems = ref<CartItem[]>([
    {
      id: '1',
      name: 'Диван "Комфорт"',
      price: 45000,
      quantity: 1,
      image: '/images/sofa-1.jpg',
      category: 'Мягкая мебель',
    },
    {
      id: '2',
      name: 'Стол обеденный "Классик"',
      price: 18000,
      quantity: 1,
      image: '/images/table-1.jpg',
      category: 'Столы и стулья',
    },
    {
      id: '3',
      name: 'Кресло "Уют"',
      price: 22000,
      quantity: 2,
      image: '/images/chair-1.jpg',
      category: 'Мягкая мебель',
    },
    {
      id: '4',
      name: 'Шкаф-купе "Модерн"',
      price: 35000,
      quantity: 1,
      image: '/images/wardrobe-1.jpg',
      category: 'Корпусная мебель',
    },
    {
      id: '5',
      name: 'Кровать "Соня"',
      price: 28000,
      quantity: 1,
      image: '/images/bed-1.jpg',
      category: 'Спальная мебель',
    },
  ]);

  // Методы
  const updateQuantity = (itemId: string, newQuantity: number) => {
    const item = cartItems.value.find((item) => item.id === itemId);
    if (item) {
      if (newQuantity <= 0) {
        removeItem(itemId);
      } else {
        item.quantity = newQuantity;
      }
    }
  };

  const removeItem = (itemId: string) => {
    cartItems.value = cartItems.value.filter((item) => item.id !== itemId);
  };
</script>

<template>
  <div>
    <!-- Заголовок -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Корзина</h1>
      <p class="text-muted-foreground">
        {{ cartItems.length }} товар{{
          cartItems.length === 1 ? '' : cartItems.length < 5 ? 'а' : 'ов'
        }}
        в корзине
      </p>
    </div>

    <!-- Основной контент -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Список товаров -->
      <ModuleCartItemsList
        :items="cartItems"
        @update-quantity="updateQuantity"
        @remove-item="removeItem"
      />

      <!-- Панель итогов -->
      <ModuleCartSummary :items="cartItems" />
    </div>
  </div>
</template>

<style scoped></style>
