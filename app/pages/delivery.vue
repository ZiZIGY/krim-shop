<script setup lang="ts">
  import { motion } from 'motion-v';
  import { Info } from 'lucide-vue-next';

  useHead({
    title: 'Условия доставки',
    meta: [
      {
        name: 'description',
        content:
          'Условия и способы доставки товаров. Курьерская доставка, самовывоз, почта России, транспортные компании СДЭК, ПЭК, Деловые линии.',
      },
    ],
  });
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Хлебные крошки -->
    <div class="container mx-auto px-4 py-8">
      <UiBreadcrumb class="mb-8">
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink as-child>
              <NuxtLink to="/">Главная</NuxtLink>
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>

          <UiBreadcrumbSeparator />

          <UiBreadcrumbItem>
            <span class="text-foreground font-medium">Условия доставки</span>
          </UiBreadcrumbItem>
        </UiBreadcrumbList>
      </UiBreadcrumb>
    </div>

    <!-- Заголовок страницы -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="text-center"
        >
          <h1 class="text-4xl font-bold mb-4">Условия доставки</h1>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Информация о способах и условиях доставки товаров
          </p>
        </motion.div>
      </div>
    </section>

    <!-- Основной контент -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
        >
          <h2 class="text-3xl font-bold mb-8">Способы доставки</h2>

          <div class="space-y-8">
            <!-- Доставка транспортными компаниями -->
            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Доставка транспортными компаниями</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                Осуществляем доставку в любой регион РФ удобными для вас
                транспортными компаниями:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6 mb-4">
                <li>• СДЭК</li>
                <li>• ПЭК</li>
                <li>• Деловые линии</li>
              </ul>
              <p class="text-lg text-muted-foreground mb-4">
                Доставка товара до Транспортных компаний для дальнейшей
                транспортировки в любой регион России осуществляется
                <strong>бесплатно</strong> при любой сумме заказа. Стоимость
                услуг транспортных компаний оплачивается отдельно.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4">Курьерская доставка</h3>
              <p class="text-lg text-muted-foreground mb-4">
                Мы осуществляем доставку товаров курьерской службой по Москве и
                Московской области. Стоимость доставки составляет 300 рублей в
                пределах МКАД и 500 рублей за МКАД. При заказе на сумму свыше
                5000 рублей доставка в пределах МКАД осуществляется бесплатно.
              </p>
              <p class="text-lg text-muted-foreground">
                Курьер свяжется с вами для уточнения времени доставки. Доставка
                осуществляется {{ $config.public.deliveryTime }} по местному
                времени в удобное для вас время.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4">Самовывоз</h3>
              <p class="text-lg text-muted-foreground">
                Вы можете забрать заказ самостоятельно из нашего магазина.
                Самовывоз осуществляется бесплатно в день заказа или на
                следующий день после подтверждения заказа. Адрес магазина: г.
                Москва, ул. Примерная, д. 123.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4">Почта России</h3>
              <p class="text-lg text-muted-foreground">
                Для жителей других регионов доступна доставка через Почту
                России. Стоимость доставки зависит от веса и габаритов товара и
                составляет от 200 до 800 рублей. Сроки доставки: 3-7 дней в
                зависимости от региона.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Правила доставки</h2>

          <div class="space-y-6">
            <div class="bg-muted p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-4">Общие условия</h3>
              <ul class="space-y-2 text-lg text-muted-foreground">
                <li
                  >• Доставка осуществляется до «подъезда» и не включает в себя
                  услуги по разгрузке и подъему товара.</li
                >
                <li
                  >• Грузополучатель должен обеспечить возможность
                  беспрепятственного подъезда транспортного средства к месту
                  разгрузки.</li
                >
                <li
                  >• При получении заказа обязательно проверьте комплектность и
                  целостность товара.</li
                >
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Условия доставки</h2>

          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-semibold mb-4">Время доставки</h3>
              <p class="text-lg text-muted-foreground">
                Доставка осуществляется ежедневно
                {{ $config.public.deliveryTime }}, включая выходные и
                праздничные дни. При оформлении заказа вы можете выбрать удобное
                время доставки.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4">Получение заказа</h3>
              <p class="text-lg text-muted-foreground mb-4">
                При получении заказа обязательно проверьте:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li>• Комплектность товара</li>
                <li>• Целостность упаковки</li>
                <li>• Отсутствие повреждений</li>
                <li>• Соответствие заказанному товару</li>
              </ul>
              <p class="text-lg text-muted-foreground mt-4">
                В случае обнаружения дефектов или несоответствий, откажитесь от
                получения товара и свяжитесь с нами для решения вопроса.
              </p>
            </div>

            <div>
              <h3 class="text-2xl font-semibold mb-4"
                >Документы для получения</h3
              >
              <p class="text-lg text-muted-foreground mb-4">
                Для получения заказа при себе необходимо иметь:
              </p>
              <ul class="space-y-2 text-lg text-muted-foreground ml-6">
                <li>• Паспорт или другой документ, удостоверяющий личность</li>
                <li>• Номер заказа (приходит в SMS или email)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="mt-16"
        >
          <h2
            class="text-3xl font-bold mb-8"
            title="Важная информация"
            >Важная информация</h2
          >

          <UiAlert class="mb-6">
            <Info class="h-4 w-4" />
            <UiAlertTitle>Обратите внимание</UiAlertTitle>
            <UiAlertDescription>
              <ul class="space-y-2">
                <li
                  >• Минимальная сумма заказа для бесплатной доставки - 5000
                  рублей</li
                >
                <li
                  >• Доставка мебели осуществляется только в разобранном
                  виде</li
                >
                <li>• Сборка мебели на месте не производится</li>
                <li
                  >• При отказе от товара при доставке взимается плата за
                  доставку</li
                >
                <li
                  >• Курьер не обязан поднимать товар выше 2-го этажа без
                  лифта</li
                >
                <li
                  >• Доставка до транспортных компаний осуществляется бесплатно
                  при любой сумме заказа</li
                >
                <li
                  >• Стоимость услуг транспортных компаний оплачивается
                  покупателем отдельно</li
                >
              </ul>
            </UiAlertDescription>
          </UiAlert>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Контакты для вопросов</h2>
          <p class="text-lg text-muted-foreground mb-6">
            Если у вас возникли вопросы по доставке, свяжитесь с нами:
          </p>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Телефон</span>
              <span class="text-muted-foreground">
                {{ $config.public.phoneNumber }}
              </span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Email</span>
              <span class="text-muted-foreground">
                {{ $config.public.email }}
              </span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="font-medium">Время работы</span>
              <span class="text-muted-foreground">
                {{ $config.public.deliveryTime }}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
</template>
