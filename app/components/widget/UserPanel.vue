<script lang="ts" setup>
  interface Props {
    favoriteCount: number;
    cartCount: number;
    isAuthenticated?: boolean;
  }

  defineProps<Props>();
</script>

<template>
  <nav class="flex items-center gap-1">
    <!-- Избранное -->
    <NuxtLink
      to="/favorites"
      class="relative inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent/50 transition-colors"
      aria-label="Избранное"
    >
      <Icon
        name="mdi:heart-outline"
        class="h-5 w-5"
      />
      <!-- Счетчик избранного -->
      <ClientOnly>
        <div
          v-if="favoriteCount > 0"
          class="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium"
        >
          {{ favoriteCount > 99 ? '99+' : favoriteCount }}
        </div>
      </ClientOnly>
    </NuxtLink>

    <!-- Корзина -->
    <NuxtLink
      to="/cart"
      class="relative inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent/50 transition-colors"
      aria-label="Корзина"
    >
      <Icon
        name="bx-basket"
        class="font-extrabold"
      />

      <!-- Счетчик товаров в корзине -->
      <ClientOnly>
        <div
          v-if="cartCount > 0"
          class="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium"
        >
          {{ cartCount > 99 ? '99+' : cartCount }}
        </div>
      </ClientOnly>
    </NuxtLink>

    <WidgetTheme />
  </nav>
</template>

<style scoped></style>
