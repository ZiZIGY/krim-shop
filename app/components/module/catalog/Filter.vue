<template>
  <div class="w-full space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold">Фильтры</h3>
      <UiButton
        v-if="hasActiveFilters"
        variant="ghost"
        size="sm"
        @click="resetFilters"
      >
        <Icon
          name="mdi:close"
          class="h-4 w-4 mr-2"
        />
        Сбросить
      </UiButton>
    </div>

    <UiAccordion
      type="multiple"
      class="w-full"
      :default-value="defaultOpenSections"
    >
      <UiAccordionItem
        v-for="filter in config"
        :key="filter.key"
        :value="filter.key"
      >
        <UiAccordionTrigger class="text-left">
          {{ filter.title }}
        </UiAccordionTrigger>
        <UiAccordionContent class="space-y-3 pt-3">
          <!-- Checkbox Group -->
          <template v-if="filter.type === 'checkbox'">
            <div class="space-y-2">
              <div
                v-for="option in filter.options"
                :key="option.value"
                class="flex items-center space-x-2"
              >
                <UiCheckbox
                  :id="`${filter.key}-${option.value}`"
                  :checked="isChecked(filters[filter.key] as string[], option.value)"
                  @update:checked="toggleCheckbox(filter.key, option.value)"
                />
                <UiLabel
                  :for="`${filter.key}-${option.value}`"
                  class="text-sm font-normal cursor-pointer"
                >
                  {{ option.label }}
                  <span
                    v-if="option.count"
                    class="text-muted-foreground ml-1"
                  >
                    ({{ option.count }})
                  </span>
                </UiLabel>
              </div>
            </div>
          </template>

          <!-- Range Slider -->
          <template v-if="filter.type === 'range'">
            <div class="space-y-3">
              <UiSlider
                :model-value="getRangeValue(filter.key)"
                :max="filter.max"
                :min="filter.min"
                :step="filter.step || 1"
                class="w-full"
                @update:model-value="(value: number[] | undefined) => value && updateRange(filter.key, value)"
              />
              <div class="flex items-center space-x-2">
                <UiInput
                  :model-value="getRangeValue(filter.key)[0]"
                  type="number"
                  :placeholder="filter.placeholders?.[0] || 'От'"
                  class="flex-1"
                  @update:model-value="(val: string | number) => updateRangeValue(filter.key, 0, val)"
                />
                <span class="text-muted-foreground">—</span>
                <UiInput
                  :model-value="getRangeValue(filter.key)[1]"
                  type="number"
                  :placeholder="filter.placeholders?.[1] || 'До'"
                  class="flex-1"
                  @update:model-value="(val: string | number) => updateRangeValue(filter.key, 1, val)"
                />
              </div>
            </div>
          </template>

          <!-- Radio Group -->
          <template v-if="filter.type === 'radio'">
            <UiRadioGroup
              :model-value="filters[filter.key]?.toString()"
              @update:model-value="(value: string) => updateRadio(filter.key, value)"
            >
              <div
                v-for="option in filter.options"
                :key="option.value"
                class="flex items-center space-x-2"
              >
                <UiRadioGroupItem
                  :id="`${filter.key}-${option.value}`"
                  :value="option.value.toString()"
                />
                <UiLabel
                  :for="`${filter.key}-${option.value}`"
                  class="text-sm font-normal cursor-pointer flex items-center gap-2"
                >
                  <span>{{ option.label }}</span>
                </UiLabel>
              </div>
            </UiRadioGroup>
          </template>

          <!-- Switch -->
          <template v-if="filter.type === 'switch'">
            <div class="flex items-center space-x-2">
              <UiSwitch
                :checked="!!filters[filter.key]"
                @update:checked="(checked: boolean) => updateSwitch(filter.key, checked)"
              />
              <UiLabel class="text-sm font-normal">
                {{ filter.label }}
              </UiLabel>
            </div>
          </template>
        </UiAccordionContent>
      </UiAccordionItem>
    </UiAccordion>

    <div class="pt-4 border-t">
      <UiButton
        class="w-full"
        @click="applyFilters"
      >
        Применить фильтры
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface FilterOption {
    value: string | number;
    label: string;
    count?: number;
  }

  interface FilterConfig {
    key: string;
    title: string;
    type: 'checkbox' | 'range' | 'radio' | 'switch';
    options?: FilterOption[];
    min?: number;
    max?: number;
    step?: number;
    placeholders?: string[];
    label?: string;
  }

  interface FilterValues {
    [key: string]:
      | string[]
      | [number, number]
      | string
      | number
      | boolean
      | undefined;
  }

  interface Props {
    config?: FilterConfig[];
    initialFilters?: FilterValues;
    defaultOpenSections?: string[];
  }

  const props = withDefaults(defineProps<Props>(), {
    config: () => [
      {
        key: 'categories',
        title: 'Категории',
        type: 'checkbox',
        options: [
          { value: 'sofas', label: 'Диваны', count: 45 },
          { value: 'chairs', label: 'Стулья', count: 23 },
          { value: 'tables', label: 'Столы', count: 31 },
          { value: 'beds', label: 'Кровати', count: 12 },
        ],
      },
      {
        key: 'price',
        title: 'Цена',
        type: 'range',
        min: 0,
        max: 100000,
        step: 1000,
        placeholders: ['От', 'До'],
      },
      {
        key: 'brands',
        title: 'Бренды',
        type: 'checkbox',
        options: [
          { value: 'ikea', label: 'IKEA' },
          { value: 'ashley', label: 'Ashley' },
          { value: 'wayfair', label: 'Wayfair' },
        ],
      },
      {
        key: 'rating',
        title: 'Рейтинг',
        type: 'radio',
        options: [
          { value: 4, label: '4 звезды и выше' },
          { value: 3, label: '3 звезды и выше' },
          { value: 2, label: '2 звезды и выше' },
          { value: 1, label: '1 звезда и выше' },
        ],
      },
      {
        key: 'inStock',
        title: 'Наличие',
        type: 'switch',
        label: 'Только в наличии',
      },
    ],
    initialFilters: () => ({}),
    defaultOpenSections: () => ['price', 'categories'],
  });

  const emit = defineEmits<{
    filtersChanged: [filters: FilterValues];
  }>();

  const filters = ref<FilterValues>({ ...props.initialFilters });

  const hasActiveFilters = computed(() => {
    return Object.values(filters.value).some((value) =>
      Array.isArray(value)
        ? value.length > 0
        : value !== undefined && value !== false
    );
  });

  const isChecked = (
    value: string[] | undefined,
    optionValue: string | number
  ): boolean => {
    if (!Array.isArray(value)) return false;
    return value.includes(String(optionValue));
  };

  const getRangeValue = (key: string): [number, number] => {
    const filterConfig = props.config.find((f) => f.key === key);
    const defaultMin = filterConfig?.min || 0;
    const defaultMax = filterConfig?.max || 100000;

    const value = filters.value[key];
    if (Array.isArray(value) && value.length === 2) {
      return value as [number, number];
    }
    return [defaultMin, defaultMax];
  };

  const toggleCheckbox = (key: string, optionValue: string | number) => {
    const current = (filters.value[key] as string[]) || [];
    const stringValue = String(optionValue);
    const index = current.indexOf(stringValue);

    if (index > -1) {
      filters.value[key] = current.filter((item) => item !== stringValue);
    } else {
      filters.value[key] = [...current, stringValue];
    }
  };

  const updateRange = (key: string, value: number[]) => {
    if (value && value.length === 2) {
      filters.value[key] = value as [number, number];
    }
  };

  const updateRangeValue = (
    key: string,
    index: number,
    value: string | number
  ) => {
    const current = getRangeValue(key);
    const newRange = [...current] as [number, number];
    newRange[index] = Number(value);
    filters.value[key] = newRange;
  };

  const updateRadio = (key: string, value: string) => {
    filters.value[key] = Number(value);
  };

  const updateSwitch = (key: string, checked: boolean) => {
    filters.value[key] = checked;
  };

  const resetFilters = () => {
    filters.value = {};
    emit('filtersChanged', {});
  };

  const applyFilters = () => {
    emit('filtersChanged', filters.value);
  };

  // Watch for real-time updates
  watch(
    filters,
    (newFilters) => {
      emit('filtersChanged', newFilters);
    },
    { deep: true }
  );
</script>
