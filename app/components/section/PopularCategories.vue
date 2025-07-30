<script setup lang="ts">
  import { motion } from 'motion-v';

  interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
    slug: string;
  }

  interface Props {
    title?: string;
    description?: string;
    categories?: Category[];
  }

  withDefaults(defineProps<Props>(), {
    title: 'Популярные разделы',
    description: 'Выберите интересующий вас раздел мебели',
    categories: () => [
      {
        id: '1',
        name: 'Диваны',
        description: 'Мягкая мебель для гостиной',
        image: '/razdel.jpg',
        productCount: 45,
        slug: 'sofas',
      },
      {
        id: '2',
        name: 'Стулья',
        description: 'Стулья для кухни и столовой',
        image: '/razdel.jpg',
        productCount: 23,
        slug: 'chairs',
      },
      {
        id: '3',
        name: 'Столы',
        description: 'Обеденные и рабочие столы',
        image: '/razdel.jpg',
        productCount: 31,
        slug: 'tables',
      },
      {
        id: '4',
        name: 'Кровати',
        description: 'Спальная мебель',
        image: '/razdel.jpg',
        productCount: 12,
        slug: 'beds',
      },
      {
        id: '5',
        name: 'Шкафы',
        description: 'Системы хранения',
        image: '/razdel.jpg',
        productCount: 18,
        slug: 'wardrobes',
      },
      {
        id: '6',
        name: 'Тумбы',
        description: 'Прикроватные тумбы и комоды',
        image: '/razdel.jpg',
        productCount: 25,
        slug: 'nightstands',
      },
    ],
  });
</script>

<template>
  <section class="py-16 bg-muted/30">
    <div class="container mx-auto px-4">
      <!-- Заголовок секции -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="text-center mb-12"
      >
        <h2 class="text-3xl font-bold mb-4">
          {{ title }}
        </h2>
        <p
          v-if="description"
          class="text-muted-foreground max-w-2xl mx-auto"
        >
          {{ description }}
        </p>
      </motion.div>

      <!-- Сетка категорий -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          v-for="(category, index) in categories"
          :key="category.id"
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          :while-hover="{ y: -5 }"
          class="group"
        >
          <NuxtLink
            :to="`/catalog/${category.slug}`"
            class="block"
          >
            <UiCard
              class="h-full overflow-hidden hover:shadow-lg transition-all duration-300 p-0 gap-0"
            >
              <!-- Изображение -->
              <div class="relative h-48 overflow-hidden">
                <NuxtImg
                  :src="category.image"
                  :alt="category.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <!-- Градиентный оверлей -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />

                <!-- Количество товаров -->
                <UiBadge class="absolute top-3 right-3">
                  {{ category.productCount }} товаров
                </UiBadge>
              </div>

              <!-- Контент -->
              <UiCardContent class="p-6">
                <UiCardTitle
                  class="text-xl mb-2 group-hover:text-primary transition-colors"
                >
                  {{ category.name }}
                </UiCardTitle>
                <UiCardDescription class="text-sm mb-4">
                  {{ category.description }}
                </UiCardDescription>

                <!-- Кнопка -->
                <div class="flex items-center justify-between">
                  <span class="text-sm text-primary font-medium">
                    Перейти в раздел
                  </span>
                  <Icon
                    name="mdi:arrow-right"
                    class="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </UiCardContent>
            </UiCard>
          </NuxtLink>
        </motion.div>
      </div>

      <!-- Кнопка "Все разделы" -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.8 }"
        class="text-center mt-12"
      >
        <motion.div
          :while-hover="{ scale: 1.05 }"
          :while-tap="{ scale: 0.95 }"
        >
          <UiButton
            variant="outline"
            size="lg"
            as-child
          >
            <NuxtLink to="/catalog">
              Все разделы
              <Icon
                name="mdi:arrow-right"
                class="h-4 w-4 ml-2"
              />
            </NuxtLink>
          </UiButton>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>

<style scoped></style>
