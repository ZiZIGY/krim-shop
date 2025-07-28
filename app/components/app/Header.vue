<script setup lang="ts"></script>

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

          <UiButton
            variant="ghost"
            class="hidden gap-2 lg:flex hover:bg-accent/50 transition-colors group"
          >
            <Icon
              name="mdi:menu"
              class="h-5 w-5"
            />
            <span class="font-medium">Каталог</span>
            <Icon
              name="mdi:chevron-down"
              class="h-4 w-4 transition-transform group-hover:rotate-180"
            />
          </UiButton>
        </div>

        <!-- Центр: Поиск -->
        <div class="flex-1 max-w-2xl hidden md:block">
          <WidgetSearch />
        </div>

        <!-- Правая часть: Пользовательское меню -->
        <WidgetUserPanel
          :favorite-count="0"
          :cart-count="3"
          :is-authenticated="false"
        />
      </div>
    </div>
  </header>
</template>
