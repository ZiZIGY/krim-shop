<script setup lang="ts">
  const menuItems = [
    {
      id: 'delivery',
      title: 'Условия доставки',
      link: '/delivery',
    },
    {
      id: 'return',
      title: 'Условия возврата и обмена',
      link: '/return',
    },
    {
      id: 'payment',
      title: 'Условия оплаты',
      link: '/payment',
    },
    {
      id: 'warranty',
      title: 'Гарантия',
      link: '/warranty',
    },
    {
      id: 'about',
      title: 'О компании',
      link: '/about',
    },
  ];
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="gap-2 text-sm hidden lg:block"
      >
        Покупателям
        <Icon
          name="mdi:chevron-down"
          class="h-4 w-4"
        />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent class="w-48">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.id"
        :to="item.link"
      >
        <UiDropdownMenuItem>
          {{ item.title }}
        </UiDropdownMenuItem>
      </NuxtLink>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
