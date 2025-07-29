<template>
  <div class="lg:col-span-2">
    <div
      v-if="items.length === 0"
      class="text-center py-12"
    >
      <Icon
        name="mdi:cart-outline"
        class="h-16 w-16 text-muted-foreground mx-auto mb-4"
      />
      <h2 class="text-xl font-semibold mb-2">Корзина пуста</h2>
      <p class="text-muted-foreground mb-6"
        >Добавьте товары в корзину, чтобы продолжить покупки</p
      >
      <UiButton as-child>
        <NuxtLink to="/catalog">
          Перейти в каталог
          <Icon
            name="mdi:arrow-right"
            class="h-4 w-4 ml-2"
          />
        </NuxtLink>
      </UiButton>
    </div>

    <div
      v-else
      class="space-y-4"
    >
      <ModuleCartCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @update-quantity="
          (itemId, quantity) => $emit('update-quantity', itemId, quantity)
        "
        @remove-item="$emit('remove-item', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    category: string;
  }

  interface Props {
    items: CartItem[];
  }

  defineProps<Props>();

  defineEmits<{
    'update-quantity': [itemId: string, quantity: number];
    'remove-item': [itemId: string];
  }>();
</script>

<style scoped></style>
