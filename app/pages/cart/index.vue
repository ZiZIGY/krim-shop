<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Хлебные крошки -->
    <UiBreadcrumb class="mb-8">
      <UiBreadcrumbList>
        <UiBreadcrumbItem>
          <UiBreadcrumbLink as-child>
            <NuxtLink to="/">Главная</NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>

        <UiBreadcrumbSeparator />

        <UiBreadcrumbItem>
          <span class="text-foreground font-medium">Корзина</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <!-- Модуль корзины -->
    <ModuleCart />
  </div>
</template>

<script setup lang="ts">
  // SEO
  useHead({
    title: 'Корзина - МебельМаркет',
    meta: [
      {
        name: 'description',
        content:
          'Корзина покупок. Просмотрите выбранные товары и оформите заказ.',
      },
      { property: 'og:title', content: 'Корзина - МебельМаркет' },
      {
        property: 'og:description',
        content:
          'Корзина покупок. Просмотрите выбранные товары и оформите заказ.',
      },
    ],
  });
</script>

<style scoped></style>
