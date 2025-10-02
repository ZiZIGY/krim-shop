<script setup lang="ts">
  const config = useRuntimeConfig();
  useHead({
    title: `Корзина - ${config.public.siteName}`,
    meta: [
      {
        name: `description`,
        content: `Корзина покупок. Просмотрите выбранные товары и оформите заказ.`,
      },
      { property: `og:title`, content: `Корзина - ${config.public.siteName}` },
      {
        property: `og:description`,
        content: `Корзина покупок. Просмотрите выбранные товары и оформите заказ.`,
      },
    ],
  });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
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

    <ModuleCart />
  </div>
</template>

<style scoped></style>
