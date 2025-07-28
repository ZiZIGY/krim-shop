<template>
  <div class="flex items-center gap-1">
    <Icon
      v-for="star in maxStars"
      :key="star"
      :name="star <= value ? 'mdi:star' : 'mdi:star-outline'"
      :class="cn(
        'h-4 w-4 transition-colors',
        star <= value ? 'text-yellow-400' : 'text-muted-foreground',
        interactive && 'cursor-pointer hover:text-yellow-300',
        sizeClass
      )"
      @click="interactive && $emit('update:value', star)"
    />
    <span
      v-if="showValue"
      class="ml-2 text-sm text-muted-foreground"
    >
      {{ value }}/{{ maxStars }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  value: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxStars: 5,
  size: 'md',
  interactive: false,
  showValue: false,
})

defineEmits<{
  'update:value': [value: number]
}>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-3 w-3'
    case 'lg':
      return 'h-5 w-5'
    default:
      return 'h-4 w-4'
  }
})
</script>

<style scoped></style> 