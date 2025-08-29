<script setup lang="ts">
  import { motion } from 'motion-v';

  const config = useRuntimeConfig();

  const { data } = await useFetch<ApiCategoriesResponse>('/api/categories/', {
    baseURL: config.public.apiUrl,
    query: {
      is_featured: true,
    },
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
        <h2 class="text-3xl font-bold mb-4"> Популярные разделы </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Выберите интересующий вас раздел мебели
        </p>
      </motion.div>

      <!-- Сетка категорий -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          v-for="(category, index) in data?.results"
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
                  :src="'/razdel.jpg'"
                  :alt="category.name"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <!-- Градиентный оверлей -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />
              </div>

              <!-- Контент -->
              <UiCardContent class="p-6">
                <UiCardTitle
                  class="text-xl mb-2 group-hover:text-primary transition-colors"
                >
                  {{ category.name }}
                </UiCardTitle>

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
