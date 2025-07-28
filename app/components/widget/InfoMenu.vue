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
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem
        v-for="item in menuItems"
        :key="item.id"
      >
        <UiNavigationMenuLink as-child>
          <NuxtLink
            :to="item.link"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {{ item.title }}
          </NuxtLink>
        </UiNavigationMenuLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>
