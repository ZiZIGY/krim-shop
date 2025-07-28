<script setup lang="ts">
  interface City {
    id: string;
    name: string;
    deliveryCost: number;
  }

  const cities = ref<City[]>([
    { id: '1', name: 'Москва', deliveryCost: 0 },
    { id: '2', name: 'Санкт-Петербург', deliveryCost: 300 },
    { id: '3', name: 'Новосибирск', deliveryCost: 500 },
    { id: '4', name: 'Екатеринбург', deliveryCost: 400 },
    { id: '5', name: 'Казань', deliveryCost: 350 },
    { id: '6', name: 'Нижний Новгород', deliveryCost: 300 },
  ]);

  const selectedCity = useLocalStorage<City>('selectedCity', cities.value[0]!);

  const handleCitySelect = (city: City) => {
    selectedCity.value = city;
  };
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton
        variant="ghost"
        class="gap-2 text-sm"
      >
        <Icon
          name="mdi:map-marker"
          class="h-4 w-4 text-primary"
        />
        <span>{{ selectedCity.name }}</span>
        <Icon
          name="mdi:chevron-down"
          class="h-4 w-4"
        />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent class="w-48">
      <UiDropdownMenuLabel>Выберите город</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem
        v-for="city in cities"
        :key="city.id"
        @click="handleCitySelect(city)"
        :class="{ 'bg-accent': selectedCity.id === city.id }"
      >
        <div class="flex w-full items-center justify-between">
          <span>{{ city.name }}</span>
          <span
            v-if="city.deliveryCost > 0"
            class="text-xs text-muted-foreground"
          >
            +{{ city.deliveryCost }}₽
          </span>
        </div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
