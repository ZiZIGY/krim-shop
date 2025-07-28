<script setup lang="ts">
  import { motion } from 'motion-v';
  import { Info } from 'lucide-vue-next';

  useHead({
    title: 'Условия доставки',
    meta: [
      {
        name: 'description',
        content:
          'Условия и способы доставки товаров. Курьерская доставка, самовывоз, почта России.',
      },
    ],
  });
</script>

<template>
  <div class="min-h-screen bg-background">
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
          :transition="{ duration: 0.6, delay: 0.2 }"
        >
          <h2 class="text-3xl font-bold mb-8">Способы доставки</h2>

          <div class="space-y-8">
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
          :transition="{ duration: 0.6, delay: 0.6 }"
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
          :transition="{ duration: 0.6, delay: 0.8 }"
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
              </ul>
            </UiAlertDescription>
          </UiAlert>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6, delay: 1.0 }"
          class="mt-16"
        >
          <h2 class="text-3xl font-bold mb-8">Контакты для вопросов</h2>
          <p class="text-lg text-muted-foreground mb-6">
            Если у вас возникли вопросы по доставке, свяжитесь с нами:
          </p>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Телефон</span>
              <span class="text-muted-foreground">{{
                $config.public.phoneNumber
              }}</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b">
              <span class="font-medium">Email</span>
              <span class="text-muted-foreground">{{
                $config.public.email
              }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="font-medium">Время работы</span>
              <span class="text-muted-foreground">{{
                $config.public.deliveryTime
              }}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
</template>

<style>
  .prose h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .prose h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .prose p {
    margin-bottom: 1rem;
    color: hsl(var(--muted-foreground));
  }

  .prose ul {
    margin-bottom: 1rem;
  }

  .prose ul li {
    margin-bottom: 0.5rem;
    color: hsl(var(--muted-foreground));
  }
</style>
