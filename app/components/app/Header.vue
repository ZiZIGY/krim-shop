<script setup lang="ts"></script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background"
    :initial="{ opacity: 0, y: -100 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.5 }"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between gap-6">
        <!-- Левая часть: Лого + Каталог -->
        <div class="flex items-center gap-6">
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
        <div class="flex-1 max-w-2xl">
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
