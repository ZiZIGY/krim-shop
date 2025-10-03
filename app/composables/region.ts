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

export const useRegion = createGlobalState(() => {
  const config = useRuntimeConfig();

  const { data: cities } = useFetch<City[]>(`/api/shipping/regions/`, {
    baseURL: config.public.apiUrl,
  });

  const selectedCity = useLocalStorage<number>('selectedCity', 0);

  const handleCitySelect = (cityId: number) => {
    selectedCity.value = cityId;
  };

  const selectedCityObject = computed(() =>
    cities.value?.find((city) => city.id === selectedCity.value)
  );

  watch(
    cities,
    (newCities) => {
      if (newCities && selectedCity.value === 0) {
        selectedCity.value = newCities[0]?.id ?? 0;
      }
    },
    { immediate: true }
  );

  const deliveryCost = computed(() => {
    return (subtotal: number) => {
      if (!cities.value || !selectedCity.value) {
        return subtotal > 50000 ? 0 : 2000;
      }

      const city = cities.value.find((c) => c.id === selectedCity.value);
      if (!city) {
        return subtotal > 50000 ? 0 : 2000;
      }

      const freeThreshold = Number(city.free_threshold);
      return subtotal >= freeThreshold ? 0 : Number(city.base_cost_effective);
    };
  });

  const deliveryInfo = computed(() => {
    if (!cities.value || !selectedCity.value) {
      return '1-3 дня';
    }

    const city = cities.value.find((c) => c.id === selectedCity.value);
    if (!city) {
      return '1-3 дня';
    }

    const min = city.delivery_days_min;
    const max = city.delivery_days_max;

    if (min === max) {
      return `${min} ${min === 1 ? 'день' : min < 5 ? 'дня' : 'дней'}`;
    }

    return `${min}-${max} дней`;
  });

  return {
    cities,
    selectedCity,
    handleCitySelect,
    deliveryCost,
    deliveryInfo,
    selectedCityObject,
  };
});
