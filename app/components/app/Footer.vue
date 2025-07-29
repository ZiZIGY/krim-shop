<template>
  <footer class="bg-background border-t">
    <div class="container mx-auto px-4 py-12">
      <!-- Основной контент футера -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- О компании -->
        <div class="space-y-4">
          <WidgetLogo />
          <p class="text-sm text-muted-foreground">
            Ваш надежный партнер в выборе качественной мебели для дома и офиса.
            Широкий ассортимент, быстрая доставка, гарантия качества.
          </p>
          <div class="flex gap-3">
            <UiButton
              variant="outline"
              size="icon"
              class="h-8 w-8"
            >
              <Icon
                name="mdi:facebook"
                class="h-4 w-4"
              />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon"
              class="h-8 w-8"
            >
              <Icon
                name="mdi:instagram"
                class="h-4 w-4"
              />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon"
              class="h-8 w-8"
            >
              <Icon
                name="mdi:youtube"
                class="h-4 w-4"
              />
            </UiButton>
            <UiButton
              variant="outline"
              size="icon"
              class="h-8 w-8"
            >
              <Icon
                name="mdi:telegram"
                class="h-4 w-4"
              />
            </UiButton>
          </div>
        </div>

        <!-- Каталог -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">Каталог</h3>
          <nav class="space-y-2">
            <NuxtLink
              v-for="item in catalogItems"
              :key="item.href"
              :to="item.href"
              class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ item.title }}
            </NuxtLink>
            <NuxtLink
              to="/catalog"
              class="block text-sm text-primary font-medium hover:underline transition-colors"
            >
              Все категории →
            </NuxtLink>
          </nav>
        </div>

        <!-- Информация -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">Информация</h3>
          <nav class="space-y-2">
            <NuxtLink
              v-for="item in infoItems"
              :key="item.href"
              :to="item.href"
              class="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ item.title }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Контакты -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">Контакты</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon
                name="mdi:phone"
                class="h-4 w-4 text-primary"
              />
              <a
                :href="`tel:${$config.public.phoneNumber}`"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ $config.public.phoneNumber }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                name="mdi:email"
                class="h-4 w-4 text-primary"
              />
              <a
                :href="`mailto:${$config.public.email}`"
                class="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {{ $config.public.email }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                name="mdi:map-marker"
                class="h-4 w-4 text-primary"
              />
              <span class="text-sm text-muted-foreground">
                {{ $config.public.address }}
              </span>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                name="mdi:clock-outline"
                class="h-4 w-4 text-primary"
              />
              <span class="text-sm text-muted-foreground">
                {{ $config.public.workTime }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижняя часть футера -->
      <div class="border-t pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Копирайт -->
          <div class="text-sm text-muted-foreground">
            © 2025 {{ $config.public.siteName }}. Все права защищены.
          </div>

          <!-- Дополнительные ссылки -->
          <div class="flex items-center gap-6 text-sm">
            <NuxtLink
              to="/privacy"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Политика конфиденциальности
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Условия использования
            </NuxtLink>
            <NuxtLink
              to="/sitemap"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              Карта сайта
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  // Футер использует конфигурацию из runtime config
  import { useMenu } from '@/composables/menu';

  const { catalogItems, infoItems } = useMenu();
</script>

<style scoped></style>
