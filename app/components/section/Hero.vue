<script lang="ts" setup>
  import type { CarouselApi } from '../ui/carousel';

  const slides = [
    {
      image: 'https://picsum.photos/200/300',
    },
    {
      image: 'https://picsum.photos/200/300',
    },
    {
      image: 'https://picsum.photos/200/300',
    },
  ];

  const api = ref<CarouselApi>();

  const setApi = (carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    api.value = carouselApi;
  };
</script>

<template>
  <section>
    <UiCarousel
      :opts="{
        loop: true,
      }"
      @init-api="setApi"
    >
      <UiCarouselContent>
        <UiCarouselItem
          v-for="slide in slides"
          :key="slide.image"
          class="h-96"
        >
          <NuxtImg
            :src="slide.image"
            class="w-full h-full object-cover"
          />
        </UiCarouselItem>
      </UiCarouselContent>

      <ClientOnly>
        <WidgetCarouselNavigation
          :carousel-api="api"
          class="absolute bottom-4 left-1/2 -translate-x-1/2"
        />
      </ClientOnly>
    </UiCarousel>
  </section>
</template>

<style></style>
