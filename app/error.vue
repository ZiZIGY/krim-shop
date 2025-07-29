<script setup lang="ts">
  import { motion } from 'motion-v';

  const handleError = () => {
    clearError({ redirect: '/' });
  };

  const goBack = () => {
    if (import.meta.client) {
      window.history.back();
    }
  };

  const reloadPage = () => {
    if (import.meta.client) {
      window.location.reload();
    }
  };
</script>

<template>
  <NuxtLayout>
    <section
      class="bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4"
    >
      <div class="container mx-auto max-w-2xl text-center">
        <motion.div
          :initial="{ scale: 0, opacity: 0 }"
          :animate="{ scale: 1, opacity: 1 }"
          :transition="{ duration: 0.6 }"
          class="mb-8"
        >
          <div class="relative">
            <div
              class="w-32 h-32 mx-auto bg-destructive/10 rounded-full flex items-center justify-center"
            >
              <Icon
                name="mdi:alert-circle"
                class="w-16 h-16 text-destructive"
              />
            </div>
            <motion.div
              :animate="{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }"
              :transition="{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }"
              class="absolute inset-0 w-32 h-32 mx-auto bg-destructive/20 rounded-full"
            />
          </div>
        </motion.div>

        <motion.h1
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="text-8xl font-bold text-destructive mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.4 }"
          class="text-2xl font-semibold mb-4"
        >
          Страница не найдена
        </motion.h2>

        <motion.p
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.6 }"
          class="text-muted-foreground mb-8 max-w-md mx-auto"
        >
          Запрашиваемая страница не существует. Попробуйте обновить страницу или
          вернуться на главную.
        </motion.p>

        <motion.div
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 0.8 }"
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
          >
            <UiButton
              size="lg"
              @click="handleError"
            >
              <Icon
                name="mdi:home"
                class="w-4 h-4 mr-2"
              />
              На главную
            </UiButton>
          </motion.div>

          <motion.div
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
          >
            <UiButton
              variant="outline"
              size="lg"
              @click="goBack"
            >
              <Icon
                name="mdi:arrow-left"
                class="w-4 h-4 mr-2"
              />
              Назад
            </UiButton>
          </motion.div>
        </motion.div>

        <motion.div
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.6, delay: 1.0 }"
          class="mt-12 pt-8 border-t border-border"
        >
          <p class="text-sm text-muted-foreground mb-4"> Попробуйте также: </p>
          <div class="flex flex-wrap justify-center gap-4 text-sm items-center">
            <NuxtLink
              to="/catalog"
              class="text-primary hover:underline transition-colors"
            >
              Каталог товаров
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-primary hover:underline transition-colors"
            >
              Связаться с поддержкой
            </NuxtLink>
            <UiButton @click="reloadPage"> Обновить страницу </UiButton>
          </div>
        </motion.div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
  .bg-gradient-to-br {
    background: linear-gradient(
      135deg,
      hsl(var(--background)) 0%,
      hsl(var(--muted) / 0.2) 100%
    );
  }
</style>
