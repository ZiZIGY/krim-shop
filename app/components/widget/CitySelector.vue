<script setup lang="ts">
  interface City {
    id: number;
    name: string;
    slug: string;
    base_cost: string;
    free_threshold: string;
    delivery_days_min: number;
    delivery_days_max: number;
    is_active: boolean;
    order: number;
    base_cost_effective: number;
    discount_amount: number;
    final_cost: number;
    applied_discount: null;
  }

  const config = useRuntimeConfig();

  const { data: cities } = useFetch<City[]>(`/api/shipping/regions/`, {
    baseURL: config.public.apiUrl,
  });

  const selectedCity = useLocalStorage<number>(
    'selectedCity',
    cities.value?.[0]?.id ?? 0
  );

  const handleCitySelect = (city: City) => (selectedCity.value = city.id);
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
        <span>
          {{
            cities?.find((city) => city.id === selectedCity)?.name ||
            'Выберите город'
          }}
        </span>
        <Icon
          name="mdi:chevron-down"
          class="h-4 w-4"
        />
      </UiButton>
    </UiDropdownMenuTrigger>

    <UiDropdownMenuContent class="w-48">
      <UiDropdownMenuItem
        v-for="city in cities"
        :key="city.id"
        :class="{ 'bg-accent': selectedCity === city.id }"
        @click="handleCitySelect(city)"
      >
        <div class="flex w-full items-center justify-between">
          <span>{{ city.name }}</span>
          <!-- <span
            v-if="city.base_cost_effective > 0"
            class="text-xs text-muted-foreground"
          >
            +{{ city.base_cost_effective }}₽
          </span> -->
        </div>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
