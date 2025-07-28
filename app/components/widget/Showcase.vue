<script setup lang="ts" generic="T">
  import type { CarouselApi } from '../ui/carousel';
  import { motion } from 'motion-v';

  interface Props<T> {
    items: T[];
    itemKey: keyof T;
    sliderTitle?: string;
    sliderDescription?: string;
    sliderButtonText?: string;
    sliderButtonLink?: string;
    showSliderButton?: boolean;
  }

  withDefaults(defineProps<Props<T>>(), {
    showSliderButton: false,
    sliderTitle: '',
    sliderDescription: '',
    sliderButtonText: '',
    sliderButtonLink: '',
  });

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
  };
</script>

<template>
  <section class="py-16 bg-muted/30">
    <div class="container mx-auto px-4">
      <!-- Заголовок секции -->
      <motion.div
        v-if="sliderTitle || sliderDescription"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        class="mb-12"
      >
        <h2
          v-if="sliderTitle"
          class="text-3xl font-bold mb-4"
          >{{ sliderTitle }}</h2
        >
        <p
          v-if="sliderDescription"
          class="text-muted-foreground max-w-2xl"
        >
          {{ sliderDescription }}
        </p>
      </motion.div>

      <!-- Слайдер -->
      <motion.div
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :transition="{ duration: 0.8, delay: 0.2 }"
        class="relative"
      >
        <UiCarousel
          :opts="{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
          }"
          @init-api="setApi"
        >
          <UiCarouselContent class="-ml-4">
            <UiCarouselItem
              v-for="(item, index) in items"
              :key="String(item[itemKey])"
              class="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <motion.div
                :initial="{ opacity: 0, scale: 0.9 }"
                :while-in-view="{ opacity: 1, scale: 1 }"
                :transition="{
                  duration: 0.5,
                  delay: index * 0.1,
                }"
                :while-hover="{ scale: 1.02 }"
              >
                <slot
                  :item="item"
                  :index="index"
                />
              </motion.div>
            </UiCarouselItem>
          </UiCarouselContent>

          <ClientOnly>
            <UiCarouselNext />
            <UiCarouselPrevious />
          </ClientOnly>
        </UiCarousel>
      </motion.div>

      <!-- Кнопка -->
      <motion.div
        v-if="showSliderButton && sliderButtonText && sliderButtonLink"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
        class="text-center mt-12"
      >
        <UiButton
          variant="outline"
          size="lg"
          as-child
        >
          <NuxtLink :to="sliderButtonLink">
            {{ sliderButtonText }}
            <Icon
              name="mdi:arrow-right"
              class="h-4 w-4 ml-2"
            />
          </NuxtLink>
        </UiButton>
      </motion.div>
    </div>
  </section>
</template>
