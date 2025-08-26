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
          <span class="text-foreground font-medium">О компании</span>
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
      <h1 class="text-4xl font-bold mb-4"
        >О компании {{ $config.public.siteName }}</h1
      >
      <p class="text-lg text-muted-foreground max-w-3xl">
        Мы - ведущий поставщик качественной мебели для дома и офиса. Наша миссия
        - создавать комфортную и стильную среду для жизни.
      </p>
    </motion.div>

    <!-- Основной контент -->
    <motion.div
      class="space-y-12"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.1 }"
    >
      <!-- Наши преимущества -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <h2 class="text-2xl font-semibold">Наши преимущества</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiCard class="text-center">
            <UiCardHeader>
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Icon
                  name="mdi:star"
                  class="h-6 w-6 text-primary"
                />
              </div>
              <UiCardTitle>Качество</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground">
                Работаем только с проверенными производителями
              </p>
            </UiCardContent>
          </UiCard>

          <UiCard class="text-center">
            <UiCardHeader>
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Icon
                  name="mdi:currency-rub"
                  class="h-6 w-6 text-primary"
                />
              </div>
              <UiCardTitle>Цены</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground">
                Прямые поставки позволяют снижать стоимость
              </p>
            </UiCardContent>
          </UiCard>

          <UiCard class="text-center">
            <UiCardHeader>
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Icon
                  name="mdi:truck-delivery"
                  class="h-6 w-6 text-primary"
                />
              </div>
              <UiCardTitle>Доставка</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground">
                Быстрая доставка по всему региону
              </p>
            </UiCardContent>
          </UiCard>

          <UiCard class="text-center">
            <UiCardHeader>
              <div
                class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4"
              >
                <Icon
                  name="mdi:shield-check"
                  class="h-6 w-6 text-primary"
                />
              </div>
              <UiCardTitle>Гарантия</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground">
                Гарантия на всю продукцию от 2 до 3 лет
              </p>
            </UiCardContent>
          </UiCard>
        </div>
      </motion.section>

      <!-- Миссия и ценности -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <h2 class="text-2xl font-semibold">Миссия и ценности</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:target"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Наша миссия</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-muted-foreground">
                Создавать комфортную и стильную среду для жизни наших клиентов,
                предоставляя качественную мебель по доступным ценам. Мы
                стремимся сделать процесс выбора и покупки мебели максимально
                простым и приятным.
              </p>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:heart"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Наши ценности</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:check"
                    class="h-4 w-4 text-green-600"
                  />
                  <span class="text-sm">Качество превыше всего</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:check"
                    class="h-4 w-4 text-green-600"
                  />
                  <span class="text-sm">Честность в отношениях</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:check"
                    class="h-4 w-4 text-green-600"
                  />
                  <span class="text-sm">Забота о клиентах</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:check"
                    class="h-4 w-4 text-green-600"
                  />
                  <span class="text-sm">Постоянное развитие</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </motion.section>

      <!-- Ассортимент -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
      >
        <h2 class="text-2xl font-semibold">Наш ассортимент</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:sofa"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Мягкая мебель</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Диваны, кресла, пуфы для гостиной и спальни
              </p>
              <div class="text-xs text-muted-foreground">Более 200 моделей</div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:table-furniture"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Корпусная мебель</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Шкафы, комоды, тумбы, стеллажи
              </p>
              <div class="text-xs text-muted-foreground">Более 300 моделей</div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:bed"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Спальная мебель</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Кровати, матрасы, прикроватные тумбы
              </p>
              <div class="text-xs text-muted-foreground">Более 150 моделей</div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:chair"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Столы и стулья</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Обеденные столы, стулья, барные стулья
              </p>
              <div class="text-xs text-muted-foreground">Более 100 моделей</div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:desk"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Офисная мебель</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Столы, кресла, шкафы для офиса
              </p>
              <div class="text-xs text-muted-foreground">Более 80 моделей</div>
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:lightbulb"
                  class="h-6 w-6 text-primary"
                />
                <UiCardTitle>Аксессуары</UiCardTitle>
              </div>
            </UiCardHeader>
            <UiCardContent>
              <p class="text-sm text-muted-foreground mb-4">
                Освещение, текстиль, декор
              </p>
              <div class="text-xs text-muted-foreground">Более 500 позиций</div>
            </UiCardContent>
          </UiCard>
        </div>
      </motion.section>

      <!-- Контакты -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.5 }"
      >
        <h2 class="text-2xl font-semibold">Свяжитесь с нами</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Контактная информация</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Icon
                    name="mdi:phone"
                    class="h-4 w-4 text-primary"
                  />
                  <a
                    :href="`tel:${$config.public.phoneNumber}`"
                    class="text-sm hover:text-primary transition-colors"
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
                    class="text-sm hover:text-primary transition-colors"
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
            </UiCardContent>
          </UiCard>

          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Социальные сети</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Icon
                    name="mdi:facebook"
                    class="h-4 w-4 text-primary"
                  />
                  <span class="text-sm">Facebook: @mebelmarket</span>
                </div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="mdi:instagram"
                    class="h-4 w-4 text-primary"
                  />
                  <span class="text-sm">Instagram: @mebelmarket</span>
                </div>
                <div class="flex items-center gap-3">
                  <Icon
                    name="mdi:telegram"
                    class="h-4 w-4 text-primary"
                  />
                  <span class="text-sm">Telegram: @mebelmarket</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </motion.section>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
  import { motion } from 'motion-v';

  const config = useRuntimeConfig();
  // SEO
  useHead({
    title: `О компании - ${config.public.siteName}`,
    meta: [
      {
        name: 'description',
        content: `Узнайте больше о компании ${config.public.siteName}. 13+ лет на рынке, 50K+ довольных клиентов. Качественная мебель для дома и офиса.`,
      },
      {
        property: 'og:title',
        content: `О компании - ${config.public.siteName}`,
      },
      {
        property: 'og:description',
        content: `Узнайте больше о компании ${config.public.siteName}. 13+ лет на рынке, 50K+ довольных клиентов.`,
      },
    ],
  });
</script>

<style scoped></style>
