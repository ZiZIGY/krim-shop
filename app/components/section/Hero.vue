<script lang="ts" setup>
  import type { CarouselApi } from '../ui/carousel';

  interface Slide {
    id: number;
    title: string;
    link: string;
    order: number;
    is_active: boolean;
    image: string;
    image_url: string;
  }

  interface Response {
    count: number;
    next: string | null;
    previous: string | null;
    results: Slide[];
  }

  const config = useRuntimeConfig();

  const { data: slides } = useFetch<Response>(`/api/slider/`, {
    baseURL: config.public.apiUrl,
  });

  const api = shallowRef<CarouselApi>();

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
          v-for="slide in slides?.results"
          :key="slide.id"
          class="h-96"
        >
          <NuxtImg
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
            loading="lazy"
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
