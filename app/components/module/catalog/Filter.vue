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
    config: FilterConfig[];
    initialFilters: FilterValues;
    defaultOpenSections: string[];
  }

  const props = defineProps<Props>();

  const emit = defineEmits<{
    filtersChanged: [filters: FilterValues];
  }>();

  const filters = ref<FilterValues>({ ...props.initialFilters });

  const rangeValues = computed(() => {
    const result: Record<string, [number, number]> = {};

    props.config.forEach((filter) => {
      if (filter.type === 'range') {
        const min = filter.min || 0;
        const max = filter.max || 100000;

        const currentValue = filters.value[filter.key];
        if (Array.isArray(currentValue) && currentValue.length >= 2) {
          result[filter.key] = [
            Number(currentValue[0]),
            Number(currentValue[1]),
          ];
        } else {
          result[filter.key] = [min, max];
        }
      }
    });

    return result;
  });

  // Обновляем фильтры при изменении входных параметров
  watch(
    () => props.initialFilters,
    (newFilters) => {
      filters.value = { ...newFilters };
    },
    { deep: true }
  );

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

  const updateRangeFilter = (key: string, value: number[]) => {
    if (value && value.length >= 2) {
      const min = value[0] ?? 0;
      const max = value[1] ?? 0;
      filters.value[key] = [min, max];
    }
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
</script>

<template>
  <UiScrollArea class="h-full w-full">
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
                  <UiLabel
                    class="text-sm font-normal cursor-pointer flex items-center space-x-2"
                  >
                    <UiCheckbox
                      :checked="isChecked(filters[filter.key] as string[], option.value)"
                      @update:checked="toggleCheckbox(filter.key, option.value)"
                    />
                    <span>
                      {{ option.label }}
                      <span
                        v-if="option.count"
                        class="text-muted-foreground ml-1"
                      >
                        ({{ option.count }})
                      </span>
                    </span>
                  </UiLabel>
                </div>
              </div>
            </template>

            <!-- Range Slider -->
            <template v-if="filter.type === 'range'">
              <div class="space-y-3">
                <UiSlider
                  :model-value="
                    rangeValues[filter.key] || [
                      filter.min || 0,
                      filter.max || 100000,
                    ]
                  "
                  :max="filter.max"
                  :min="filter.min"
                  :step="filter.step || 1"
                  class="w-full"
                  @update:model-value="
                    (val) => val && updateRangeFilter(filter.key, val)
                  "
                  @pointerdown.stop
                />
                <div class="flex items-center space-x-2">
                  <UiInput
                    :model-value="
                      rangeValues[filter.key]?.[0] || filter.min || 0
                    "
                    type="number"
                    :placeholder="filter.placeholders?.[0] || 'От'"
                    class="flex-1"
                    @update:model-value="
                      (val) =>
                        updateRangeFilter(filter.key, [
                          Number(val),
                          rangeValues[filter.key]?.[1] || filter.max || 100000,
                        ])
                    "
                  />
                  <span class="text-muted-foreground">—</span>
                  <UiInput
                    :model-value="
                      rangeValues[filter.key]?.[1] || filter.max || 100000
                    "
                    type="number"
                    :placeholder="filter.placeholders?.[1] || 'До'"
                    class="flex-1"
                    @update:model-value="
                      (val) =>
                        updateRangeFilter(filter.key, [
                          rangeValues[filter.key]?.[0] || filter.min || 0,
                          Number(val),
                        ])
                    "
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
                  <UiLabel
                    class="text-sm font-normal cursor-pointer flex items-center space-x-2"
                  >
                    <UiRadioGroupItem :value="option.value.toString()" />
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
  </UiScrollArea>
</template>
