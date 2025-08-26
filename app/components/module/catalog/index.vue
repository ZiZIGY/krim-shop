<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Боковая панель с фильтрами -->
      <aside class="hidden lg:block w-80 flex-shrink-0">
        <ModuleCatalogFilter />
      </aside>

      <!-- Основной контент -->
      <section class="flex-1 min-w-0">
        <!-- Мобильные фильтры -->
        <div class="lg:hidden mb-6">
          <UiButton
            variant="outline"
            class="w-full"
          >
            <Icon
              name="mdi:filter-variant"
              class="h-4 w-4 mr-2"
            />
            Фильтры
            <span
              class="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs"
            >
            </span>
          </UiButton>
        </div>

        <!-- Хлебные крошки -->
        <UiBreadcrumb class="mb-6">
          <UiBreadcrumbList>
            <UiBreadcrumbItem>
              <UiBreadcrumbLink as-child>
                <NuxtLink to="/">Главная</NuxtLink>
              </UiBreadcrumbLink>
            </UiBreadcrumbItem>

            <UiBreadcrumbSeparator />

            <UiBreadcrumbItem>
              <UiBreadcrumbLink as-child>
                <NuxtLink to="/catalog">Каталог</NuxtLink>
              </UiBreadcrumbLink>
            </UiBreadcrumbItem>

            <UiBreadcrumbSeparator />

            <UiBreadcrumbItem>
              <span class="text-foreground font-medium"> </span>
            </UiBreadcrumbItem>
          </UiBreadcrumbList>
        </UiBreadcrumb>

        <!-- Заголовок страницы -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2"> </h1>
          <p class="text-muted-foreground"> </p>
        </div>

        <!-- Сетка товаров -->
        <ModuleCatalogGrid />
      </section>
    </div>

    <!-- Мобильный фильтр в drawer -->
    <UiDrawer>
      <UiDrawerContent class="h-[85vh]">
        <div class="flex-1 overflow-y-auto p-6">
          <ModuleCatalogFilter />
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<style scoped></style>
