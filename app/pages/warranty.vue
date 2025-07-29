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
          <span class="text-foreground font-medium">Гарантия</span>
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
      <h1 class="text-4xl font-bold mb-4">Гарантия на мебель</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        Мы предоставляем гарантию на всю мебель от производителя. Наша цель -
        обеспечить качество и долговечность каждого изделия.
      </p>
    </motion.div>

    <!-- Основной контент -->
    <motion.div
      class="space-y-8"
      :initial="{ opacity: 0, y: 20 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.1 }"
    >
      <!-- Гарантийные сроки -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <h2 class="text-2xl font-semibold">Гарантийные сроки</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UiCard class="p-6 text-center">
            <div
              class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Icon
                name="mdi:sofa"
                class="h-8 w-8 text-primary"
              />
            </div>
            <h3 class="text-lg font-semibold mb-2">Мягкая мебель</h3>
            <p class="text-2xl font-bold text-primary mb-2">2 года</p>
            <p class="text-sm text-muted-foreground">
              Гарантия на каркас, механизмы трансформации и обивку
            </p>
          </UiCard>

          <UiCard class="p-6 text-center">
            <div
              class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Icon
                name="mdi:table-furniture"
                class="h-8 w-8 text-primary"
              />
            </div>
            <h3 class="text-lg font-semibold mb-2">Корпусная мебель</h3>
            <p class="text-2xl font-bold text-primary mb-2">3 года</p>
            <p class="text-sm text-muted-foreground">
              Гарантия на корпус, фурнитуру и механизмы
            </p>
          </UiCard>

          <UiCard class="p-6 text-center">
            <div
              class="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4"
            >
              <Icon
                name="mdi:bed"
                class="h-8 w-8 text-primary"
              />
            </div>
            <h3 class="text-lg font-semibold mb-2">Спальная мебель</h3>
            <p class="text-2xl font-bold text-primary mb-2">2 года</p>
            <p class="text-sm text-muted-foreground">
              Гарантия на каркас, механизмы и матрасы
            </p>
          </UiCard>
        </div>
      </motion.section>

      <!-- Что покрывает гарантия -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
      >
        <h2 class="text-2xl font-semibold">Что покрывает гарантия</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600"
              >Покрывается гарантией</h3
            >
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Дефекты производства</h4>
                  <p class="text-sm text-muted-foreground"
                    >Трещины, сколы, деформация</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Неисправности механизмов</h4>
                  <p class="text-sm text-muted-foreground"
                    >Поломки трансформации, выдвижения</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Проблемы с фурнитурой</h4>
                  <p class="text-sm text-muted-foreground"
                    >Петли, ручки, направляющие</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:check-circle"
                  class="h-5 w-5 text-green-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Дефекты обивки</h4>
                  <p class="text-sm text-muted-foreground"
                    >Разрывы, отслоение материала</p
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-red-600"
              >Не покрывается гарантией</h3
            >
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:close-circle"
                  class="h-5 w-5 text-red-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Механические повреждения</h4>
                  <p class="text-sm text-muted-foreground"
                    >Удары, царапины, порезы</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:close-circle"
                  class="h-5 w-5 text-red-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Неправильная эксплуатация</h4>
                  <p class="text-sm text-muted-foreground"
                    >Перегрузка, неправильная сборка</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:close-circle"
                  class="h-5 w-5 text-red-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Естественный износ</h4>
                  <p class="text-sm text-muted-foreground"
                    >Выцветание, истирание обивки</p
                  >
                </div>
              </div>
              <div class="flex items-start gap-3">
                <Icon
                  name="mdi:close-circle"
                  class="h-5 w-5 text-red-600 mt-0.5"
                />
                <div>
                  <h4 class="font-medium">Повреждения от влаги</h4>
                  <p class="text-sm text-muted-foreground"
                    >Набухание, плесень, коррозия</p
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <!-- Условия гарантии -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.4 }"
      >
        <h2 class="text-2xl font-semibold">Условия гарантии</h2>

        <div class="space-y-4">
          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:file-document"
              class="h-5 w-5 text-primary mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Наличие документов</h3>
              <p class="text-sm text-muted-foreground">
                Для обращения по гарантии необходимо иметь товарный чек,
                гарантийный талон и упаковку.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:calendar-clock"
              class="h-5 w-5 text-primary mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Срок обращения</h3>
              <p class="text-sm text-muted-foreground">
                Обратиться по гарантии можно в течение всего гарантийного срока
                с момента покупки.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:home"
              class="h-5 w-5 text-primary mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Место обращения</h3>
              <p class="text-sm text-muted-foreground">
                Гарантийное обслуживание производится в нашем сервисном центре
                или на дому у клиента.
              </p>
            </div>
          </div>

          <div class="flex gap-4 p-4 bg-muted/30 rounded-lg">
            <Icon
              name="mdi:tools"
              class="h-5 w-5 text-primary mt-0.5"
            />
            <div>
              <h3 class="font-semibold mb-1">Виды ремонта</h3>
              <p class="text-sm text-muted-foreground">
                Бесплатный ремонт, замена деталей или полная замена товара на
                аналогичный.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <!-- Как обратиться по гарантии -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.5 }"
      >
        <h2 class="text-2xl font-semibold">Как обратиться по гарантии</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center space-y-4">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-bold text-primary">1</span>
            </div>
            <h3 class="font-semibold">Свяжитесь с нами</h3>
            <p class="text-sm text-muted-foreground">
              Позвоните или напишите нам, опишите проблему
            </p>
          </div>

          <div class="text-center space-y-4">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-bold text-primary">2</span>
            </div>
            <h3 class="font-semibold">Подготовьте документы</h3>
            <p class="text-sm text-muted-foreground">
              Соберите чек, гарантийный талон и упаковку
            </p>
          </div>

          <div class="text-center space-y-4">
            <div
              class="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            >
              <span class="text-xl font-bold text-primary">3</span>
            </div>
            <h3 class="font-semibold">Получите решение</h3>
            <p class="text-sm text-muted-foreground">
              Мы проведем диагностику и выполним ремонт
            </p>
          </div>
        </div>
      </motion.section>

      <!-- Контакты -->
      <motion.section
        class="space-y-6"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.6 }"
      >
        <h2 class="text-2xl font-semibold">Гарантийное обслуживание</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UiCard class="p-6">
            <h3 class="text-lg font-semibold mb-4">Сервисный центр</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:map-marker"
                  class="h-4 w-4 text-primary"
                />
                <span class="text-sm">
                  {{ $config.public.address }}
                </span>
              </div>
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
                  name="mdi:clock-outline"
                  class="h-4 w-4 text-primary"
                />
                <span class="text-sm text-muted-foreground">
                  {{ $config.public.workTime }}
                </span>
              </div>
            </div>
          </UiCard>

          <UiCard class="p-6">
            <h3 class="text-lg font-semibold mb-4">Онлайн поддержка</h3>
            <div class="space-y-3">
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
                  name="mdi:chat"
                  class="h-4 w-4 text-primary"
                />
                <span class="text-sm">Онлайн чат на сайте</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon
                  name="mdi:telegram"
                  class="h-4 w-4 text-primary"
                />
                <span class="text-sm">Telegram: @mebelmarket_support</span>
              </div>
            </div>
          </UiCard>
        </div>
      </motion.section>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
  import { motion } from 'motion-v';

  // SEO
  useHead({
    title: 'Гарантия - МебельМаркет',
    meta: [
      {
        name: 'description',
        content:
          'Гарантия на мебель от 2 до 3 лет. Бесплатный ремонт и замена деталей. Условия гарантии и сервисное обслуживание.',
      },
      { property: 'og:title', content: 'Гарантия - МебельМаркет' },
      {
        property: 'og:description',
        content:
          'Гарантия на мебель от 2 до 3 лет. Бесплатный ремонт и замена деталей.',
      },
    ],
  });
</script>

<style scoped></style>
