<template>
  <div v-html="renderedText" />
</template>

<script setup>
const props = defineProps({ document: { type: Object, required: true } })
const renderedText = computed(() => renderRichText(props.document))
</script>
