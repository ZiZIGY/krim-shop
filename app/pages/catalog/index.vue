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
        v-for="(category, index) in categories"
        :key="category.id"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.1 + index * 0.1 }"
      >
        <NuxtLink
          :to="category.link"
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
                  :name="category.icon"
                  class="h-8 w-8 text-primary"
                />
              </div>
              <UiCardTitle
                class="mb-2 group-hover:text-primary transition-colors"
              >
                {{ category.name }}
              </UiCardTitle>
              <UiCardDescription class="flex-1">
                {{ category.description }}
              </UiCardDescription>
              <div class="flex items-center text-sm text-muted-foreground mt-4">
                <span>{{ category.count }} товаров</span>
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

<script setup lang="ts">
  import { motion } from 'motion-v';

  // Данные категорий
  const categories = [
    {
      id: 'gostinaya',
      name: 'Гостиная',
      description: 'Диваны, кресла, столы, шкафы и другая мебель для гостиной',
      icon: 'mdi:sofa',
      link: '/catalog/gostinaya',
      count: 156,
    },
    {
      id: 'spalnya',
      name: 'Спальня',
      description: 'Кровати, шкафы, тумбы, комоды и другая мебель для спальни',
      icon: 'mdi:bed',
      link: '/catalog/spalnya',
      count: 203,
    },
    {
      id: 'kuhnya',
      name: 'Кухня',
      description:
        'Кухонные гарнитуры, столы, стулья и другая мебель для кухни',
      icon: 'mdi:silverware-fork-knife',
      link: '/catalog/kuhnya',
      count: 89,
    },
    {
      id: 'vannaya',
      name: 'Ванная',
      description: 'Шкафчики, полки, зеркала и другая мебель для ванной',
      icon: 'mdi:shower',
      link: '/catalog/vannaya',
      count: 67,
    },
    {
      id: 'detskaya',
      name: 'Детская',
      description: 'Кровати, столы, шкафы и другая мебель для детской комнаты',
      icon: 'mdi:baby-face',
      link: '/catalog/detskaya',
      count: 134,
    },
    {
      id: 'ofis',
      name: 'Офис',
      description: 'Столы, стулья, шкафы и другая мебель для офиса',
      icon: 'mdi:desk',
      link: '/catalog/ofis',
      count: 98,
    },
    {
      id: 'osveshchenie',
      name: 'Освещение',
      description: 'Люстры, светильники, лампы и другие осветительные приборы',
      icon: 'mdi:lightbulb',
      link: '/catalog/osveshchenie',
      count: 245,
    },
    {
      id: 'dekor',
      name: 'Декор',
      description: 'Подушки, картины, вазы и другие декоративные элементы',
      icon: 'mdi:flower',
      link: '/catalog/dekor',
      count: 178,
    },
  ];

  // SEO
  const config = useRuntimeConfig();
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

<style scoped></style>
