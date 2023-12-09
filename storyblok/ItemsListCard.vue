<template>
  <div>
    <h2>{{ blok.title }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
  index?: string
}>()
</script>
