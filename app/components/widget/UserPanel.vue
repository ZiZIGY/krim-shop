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
      <span class="sr-only">Избранное</span>
      <!-- Счетчик избранного -->
      <div
        v-if="favoriteCount > 0"
        class="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-medium"
      >
        {{ favoriteCount }}
      </div>
    </NuxtLink>

    <!-- Корзина -->
    <NuxtLink
      to="/cart"
      class="relative inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent/50 transition-colors"
      aria-label="Корзина"
    >
      <Icon
        name="mdi:cart-outline"
        class="h-5 w-5"
      />
      <span class="sr-only">Корзина</span>
      <!-- Счетчик товаров в корзине -->
      <div
        v-if="cartCount > 0"
        class="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center font-medium"
      >
        {{ cartCount > 99 ? '99+' : cartCount }}
      </div>
    </NuxtLink>

    <!-- Личный кабинет -->
    <NuxtLink
      :to="isAuthenticated ? '/profile' : '/auth'"
      class="relative inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-accent/50 transition-colors"
      :aria-label="isAuthenticated ? 'Личный кабинет' : 'Войти'"
    >
      <Icon
        :name="
          isAuthenticated ? 'mdi:account-circle-outline' : 'mdi:login-variant'
        "
        class="h-5 w-5"
      />
      <span class="sr-only">
        {{ isAuthenticated ? 'Личный кабинет' : 'Войти' }}
      </span>
    </NuxtLink>

    <WidgetTheme />
  </nav>
</template>

<script lang="ts" setup>
  interface Props {
    favoriteCount?: number;
    cartCount?: number;
    isAuthenticated?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    favoriteCount: 0,
    cartCount: 0,
    isAuthenticated: false,
  });
</script>

<style scoped></style>
