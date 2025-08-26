<script setup lang="ts">
  const favorites = useLocalStorage('favorites', []);

  const cart = useLocalStorage('cart', []);
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background">
    <!-- Верхняя панель с городом, телефоном и информацией -->
    <div class="border-b bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="flex h-10 items-center justify-between text-sm">
          <!-- Левая часть: Выбор города + Телефон -->
          <div class="flex items-center gap-6">
            <WidgetCitySelector />

            <NuxtLink
              :href="`tel:${$config.public.phoneNumber}`"
              class="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon
                name="mdi:phone"
                class="h-4 w-4 text-primary"
              />
              <span>{{ $config.public.phoneNumber }}</span>
            </NuxtLink>
          </div>

          <!-- Правая часть: Информационное меню -->
          <WidgetInfoMenu class="hidden lg:block" />
        </div>
      </div>
    </div>

    <!-- Основной хедер -->
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between gap-6">
        <!-- Левая часть: Бургер меню + Лого + Каталог -->
        <div class="flex items-center gap-6">
          <WidgetMobileMenu />

          <WidgetLogo />

          <ModuleCatalogMenu />
        </div>

        <!-- Центр: Поиск -->
        <div class="flex-1 max-w-2xl hidden lg:block">
          <WidgetSearch />
        </div>

        <!-- Правая часть: Пользовательское меню -->
        <WidgetUserPanel
          :favorite-count="favorites.length"
          :cart-count="cart.length"
          :is-authenticated="false"
        />
      </div>
    </div>
  </header>
</template>
