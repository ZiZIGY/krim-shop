<script setup lang="ts">
  import { z } from 'zod';
  import { toTypedSchema } from '@vee-validate/zod';
  import { useForm } from 'vee-validate';

  interface ServicesAPI {
    count: number;
    next: null;
    previous: null;
    results: Result[];
  }

  interface Result {
    id: number;
    name: string;
    price: string;
  }

  const config = useRuntimeConfig();

  const { items } = useCart();
  const {
    deliveryCost: calculateDeliveryCost,
    deliveryInfo,
    selectedCityObject,
  } = useRegion();

  const { data } = useFetch<{ results: Product[]; missing: [] }>(
    '/api/products/by-ids',
    {
      query: { ids: items.value.map((i) => i.id).join(',') },
      baseURL: config.public.apiUrl,
      server: false,
    }
  );

  const { data: services } = await useFetch<ServicesAPI>('/api/services/', {
    baseURL: config.public.apiUrl,
  });

  watch(
    () => data.value,
    (newData) => {
      if (newData?.results && items.value.length > 0) {
        const existingIds = new Set(newData.results.map((p: Product) => p.id));
        const itemsToKeep = items.value.filter((item) =>
          existingIds.has(item.id)
        );

        if (itemsToKeep.length !== items.value.length) {
          items.value = itemsToKeep;
        }
      }
    },
    { immediate: true }
  );

  const subtotal = computed(() => {
    if (!data.value?.results) return 0;
    return data.value.results.reduce((sum, product) => {
      const cartItem = items.value.find((item) => item.id === product.id);
      return sum + Number(product.price) * (cartItem?.count || 0);
    }, 0);
  });

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.count, 0);
  });

  const deliveryCost = computed(() => {
    return calculateDeliveryCost.value(subtotal.value);
  });

  const total = computed(() => {
    return (
      subtotal.value +
      deliveryCost.value +
      servicesTotal.value -
      Number(selectedCityObject.value?.discount_amount || 0)
    );
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(`ru-RU`, {
      style: `currency`,
      currency: `RUB`,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const selectedServices = ref<number[]>([]);

  const schema = toTypedSchema(
    z.object({
      full_name: z
        .string({ message: 'Введите ФИО' })
        .min(2, 'Минимум 2 символа'),
      email: z.string({ message: 'Введите email' }).email('Некорректный email'),
      phone: z
        .string({ message: 'Введите номер телефона' })
        .regex(
          /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}-?\d{2}-?\d{2}$/u,
          'Некорректный номер'
        ),
      city: z.string({ message: 'Введите город' }).min(2, 'Минимум 2 символа'),
      address: z
        .string({ message: 'Введите адрес' })
        .min(5, 'Минимум 5 символов'),
      comment: z.string().optional(),
      payment_method: z.enum(['online', 'cod'], {
        message: 'Выберите способ оплаты',
      }),
    })
  );

  const { handleSubmit, isFieldDirty } = useForm({
    validationSchema: schema,
    initialValues: {
      full_name: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      comment: '',
      payment_method: 'cod',
    },
  });

  const servicesTotal = computed(() => {
    return (
      services.value?.results
        .filter((service) => selectedServices.value?.includes(service.id))
        .reduce((sum, service) => sum + Number(service.price), 0) || 0
    );
  });

  const onSubmit = handleSubmit(async (values) => {
    const orderData = {
      ...values,
      services: selectedServices.value?.map((service) => ({
        service_id: service,
      })),
      items: items.value.map((product) => ({
        product_id: product.id,
        quantity: product.count,
      })),
      delivery_type: 'delivery',
      region: selectedCityObject.value?.slug,
      total_price: total.value,
    };

    const response = await $fetch<ApiOrderResponse>('/api/orders/', {
      baseURL: config.public.apiUrl,
      method: 'post',
      body: orderData,
    });

    if (response) {
      const url =
        orderData.payment_method === 'online'
          ? response.pay_url
          : response.accepted_url;

      navigateTo(url, {
        external: true,
      });
    }
  });

  useHead({
    title: `Оформление заказа - ${config.public.siteName}`,
    meta: [
      {
        name: `description`,
        content: `Оформление заказа. Заполните данные для доставки и оплаты.`,
      },
      {
        property: `og:title`,
        content: `Оформление заказа - ${config.public.siteName}`,
      },
      {
        property: `og:description`,
        content: `Оформление заказа. Заполните данные для доставки и оплаты.`,
      },
    ],
  });
</script>

<template>
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
          <UiBreadcrumbLink as-child>
            <NuxtLink to="/cart">Корзина</NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator />
        <UiBreadcrumbItem>
          <span class="text-foreground font-medium">Оформление заказа</span>
        </UiBreadcrumbItem>
      </UiBreadcrumbList>
    </UiBreadcrumb>
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Оформление заказа</h1>
      <p class="text-muted-foreground">
        Заполните данные для оформления заказа
      </p>
    </div>
    <form
      class="grid grid-cols-1 lg:grid-cols-3 gap-8"
      @submit="onSubmit"
    >
      <div class="lg:col-span-2 space-y-8">
        <UiCard class="mb-4">
          <UiCardHeader>
            <UiCardTitle>Контактные данные</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <UiFormField
              v-slot="{ componentField }"
              name="full_name"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium">ФИО *</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="text"
                    placeholder="Введите ФИО"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField
              v-slot="{ componentField }"
              name="email"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium">Email *</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="email"
                    placeholder="example@email.com"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField
              v-slot="{ componentField }"
              name="phone"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium">Телефон *</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>
        <UiCard class="mb-4">
          <UiCardHeader>
            <UiCardTitle>Адрес доставки</UiCardTitle>
          </UiCardHeader>
          <UiCardContent class="space-y-4">
            <UiFormField
              v-slot="{ componentField }"
              name="city"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium">Город *</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    placeholder="Введите город"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField
              v-slot="{ componentField }"
              name="address"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium">Адрес *</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    placeholder="Улица, дом, квартира"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField
              v-slot="{ componentField }"
              name="comment"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiFormLabel class="font-medium"
                  >Комментарий к заказу</UiFormLabel
                >
                <UiFormControl>
                  <UiTextarea
                    placeholder="Дополнительная информация"
                    v-bind="componentField"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <UiCard
          v-if="services?.results?.length"
          class="mb-4"
        >
          <UiCardHeader>
            <UiCardTitle>Дополнительные услуги</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <div class="space-y-3">
              <div
                v-for="service in services.results"
                :key="service.id"
                class="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <UiCheckbox
                    :id="`service-${service.id}`"
                    :value="service.id"
                    :checked="selectedServices.includes(service.id)"
                    @update:model-value="(checked: boolean) => 
                      checked ? selectedServices?.push(service.id) : selectedServices = selectedServices?.filter(id => id !== service.id)
                    "
                  />
                  <UiLabel
                    :for="`service-${service.id}`"
                    class="font-medium cursor-pointer"
                  >
                    {{ service.name }}
                  </UiLabel>
                </div>
                <div class="text-sm font-medium text-primary">
                  +{{ formatPrice(Number(service.price)) }}
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="mb-4">
          <UiCardHeader>
            <UiCardTitle>Способ оплаты</UiCardTitle>
          </UiCardHeader>
          <UiCardContent>
            <UiFormField
              v-slot="{ componentField }"
              name="payment_method"
              :validate-on-blur="!isFieldDirty"
            >
              <UiFormItem>
                <UiRadioGroup
                  v-bind="componentField"
                  class="space-y-3"
                >
                  <div class="flex items-center space-x-2">
                    <UiRadioGroupItem
                      id="card"
                      value="online"
                    />
                    <UiLabel for="card">Онлайн оплата</UiLabel>
                  </div>
                  <div class="flex items-center space-x-2">
                    <UiRadioGroupItem
                      id="cash"
                      value="cod"
                    />
                    <UiLabel for="cash">Наличными при получении</UiLabel>
                  </div>
                </UiRadioGroup>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>
      </div>
      <div class="lg:col-span-1">
        <ClientOnly>
          <UiCard>
            <UiCardHeader>
              <UiCardTitle>Итоги заказа</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div class="space-y-3">
                <div
                  v-for="cartItem in items"
                  :key="cartItem.id"
                  class="flex justify-between items-center text-sm"
                >
                  <div class="flex-1">
                    <div class="font-medium">
                      {{
                        data?.results.find((p: Product) => p.id === cartItem.id)
                          ?.title || 'Товар'
                      }}
                    </div>
                    <div class="text-muted-foreground">
                      {{ cartItem.count }} шт. ×
                      {{
                        formatPrice(
                          Number(
                            data?.results.find(
                              (p: Product) => p.id === cartItem.id
                            )?.price || 0
                          )
                        )
                      }}
                    </div>
                  </div>
                  <div class="font-medium">
                    {{
                      formatPrice(
                        Number(
                          data?.results.find(
                            (p: Product) => p.id === cartItem.id
                          )?.price || 0
                        ) * cartItem.count
                      )
                    }}
                  </div>
                </div>
              </div>
              <div class="border-t pt-4">
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Товары ({{ totalItems }})</span>
                    <span>{{ formatPrice(subtotal) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <div>
                      <span>Доставка</span>
                      <div class="text-xs text-muted-foreground">{{
                        deliveryInfo
                      }}</div>
                    </div>
                    <span>
                      {{
                        deliveryCost === 0
                          ? `Бесплатно`
                          : formatPrice(deliveryCost)
                      }}
                    </span>
                  </div>
                  <div
                    v-if="selectedCityObject?.discount_amount"
                    class="flex justify-between text-sm"
                  >
                    <span>Скидка</span>

                    <span>
                      -{{ formatPrice(selectedCityObject.discount_amount) }}
                    </span>
                  </div>
                  <div
                    v-if="servicesTotal > 0"
                    class="flex justify-between text-sm"
                  >
                    <span>Дополнительные услуги</span>
                    <span>{{ formatPrice(servicesTotal) }}</span>
                  </div>
                  <div class="border-t pt-2">
                    <div class="flex justify-between font-semibold">
                      <span>Итого к оплате</span>
                      <span>
                        {{ formatPrice(total) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <UiButton
                class="w-full"
                size="lg"
                @click.prevent="onSubmit"
              >
                Оформить заказ
                <Icon
                  name="mdi:arrow-right"
                  class="h-4 w-4 ml-2"
                />
              </UiButton>
              <div class="text-xs text-muted-foreground space-y-2">
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:shield-check"
                    class="h-3 w-3"
                  />
                  <span>Безопасная оплата</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon
                    name="mdi:refresh"
                    class="h-3 w-3"
                  />
                  <span>Возврат в течение 14 дней</span>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <template #fallback>
            <UiSkeleton class="w-full h-72" />
          </template>
        </ClientOnly>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
