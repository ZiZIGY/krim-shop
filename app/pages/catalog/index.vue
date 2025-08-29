<script setup lang="ts">
  import { motion } from 'motion-v';

  // SEO
  const config = useRuntimeConfig();

  const { data } = await useFetch<ApiCategoriesResponse>('/api/categories/', {
    baseURL: config.public.apiUrl,
  });

  useHead({
    title: `Каталог мебели - ${config.public.siteName}`,
    meta: [
      {
        name: `description`,
        content: `Каталог мебели для всех комнат. Гостиная, спальня, кухня, ванная, детская, офис, освещение и декор.`,
      },
      {
        property: `og:title`,
        content: `Каталог мебели - ${config.public.siteName}`,
      },
      {
        property: `og:description`,
        content: `Каталог мебели для всех комнат. Выберите категорию и найдите идеальную мебель.`,
      },
    ],
  });
</script>

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
          <span class="text-foreground font-medium">Каталог</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>

    <!-- Заголовок -->
    <motion.div
      class="mb-12"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
    >
      <h1 class="text-4xl font-bold mb-4">Каталог мебели</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Выберите категорию мебели для просмотра товаров
      </p>
    </motion.div>

    <!-- Категории -->
    <motion.div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.1 }"
    >
      <motion.div
        v-for="(category, index) in data?.results"
        :key="category.id"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.1 + index * 0.1 }"
      >
        <NuxtLink
          :to="`/catalog/${category.slug}`"
          class="group block h-full"
        >
          <UiCard
            class="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-0"
          >
            <UiCardContent class="p-6 h-full flex flex-col">
              <div
                class="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
              >
                <Icon
                  name="mdi:sofa"
                  class="h-8 w-8 text-primary"
                />
              </div>
              <UiCardTitle
                class="mb-2 group-hover:text-primary transition-colors"
              >
                {{ category.name }}
              </UiCardTitle>
              <UiCardDescription class="flex-1">
                {{ category.name }}
              </UiCardDescription>
              <div class="flex items-center text-sm text-muted-foreground mt-4">
                <Icon
                  name="mdi:arrow-right"
                  class="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform"
                />
              </div>
            </UiCardContent>
          </UiCard>
        </NuxtLink>
      </motion.div>
    </motion.div>
  </div>
</template>

<style scoped></style>
