<script setup lang="ts">
  import { motion } from 'motion-v';

  interface StatItem {
    id: string;
    icon: string;
    value: string;
    label: string;
    description?: string;
  }

  interface Props {
    title?: string;
    description?: string;
    stats?: StatItem[];
  }

  withDefaults(defineProps<Props>(), {
    title: 'Наши достижения',
    description: 'Мы гордимся тем, что помогаем создавать уютные дома',
    stats: () => [
      {
        id: '1',
        icon: 'mdi:package-variant',
        value: '15,000+',
        label: 'Товаров в каталоге',
        description: 'Широкий выбор качественной мебели',
      },
      {
        id: '2',
        icon: 'mdi:account-group',
        value: '50,000+',
        label: 'Довольных клиентов',
        description: 'Положительные отзывы и рекомендации',
      },
      {
        id: '3',
        icon: 'mdi:truck-delivery',
        value: '24/7',
        label: 'Доставка по России',
        description: 'Быстрая и надежная доставка',
      },
      {
        id: '4',
        icon: 'mdi:shield-check',
        value: '100%',
        label: 'Гарантия качества',
        description: 'Официальная гарантия на все товары',
      },
    ],
  });
</script>

<template>
  <section class="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
    <div class="container mx-auto px-4">
      <!-- Заголовок секции -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="text-center mb-16"
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

      <!-- Сетка статистики -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          v-for="(stat, index) in stats"
          :key="stat.id"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          class="text-center group"
        >
          <!-- Иконка -->
          <motion.div
            :while-hover="{ scale: 1.1, rotate: 5 }"
            :while-tap="{ scale: 0.95 }"
            class="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors"
          >
            <Icon
              :name="stat.icon"
              class="w-8 h-8 text-primary"
            />
          </motion.div>

          <!-- Значение -->
          <motion.h3
            :initial="{ scale: 0.8, opacity: 0 }"
            :while-in-view="{ scale: 1, opacity: 1 }"
            :transition="{ duration: 0.8, delay: index * 0.1 + 0.3 }"
            class="text-4xl font-bold text-primary mb-2"
            :data-target="stat.value"
          >
            {{ stat.value }}
          </motion.h3>

          <!-- Заголовок -->
          <h4 class="text-lg font-semibold mb-2">
            {{ stat.label }}
          </h4>

          <!-- Описание -->
          <p
            v-if="stat.description"
            class="text-muted-foreground text-sm"
          >
            {{ stat.description }}
          </p>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .bg-gradient-to-br {
    background: linear-gradient(
      135deg,
      hsl(var(--primary) / 0.05) 0%,
      hsl(var(--primary) / 0.1) 100%
    );
  }
</style>
