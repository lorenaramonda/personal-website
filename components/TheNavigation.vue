<template>
  <ul>
    <li>
      <NuxtLink :to="localePath({ name: 'index' })">home</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath({ name: 'experience' })">experience</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath({ name: 'publications' })">publications</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath({ name: 'projects' })">projects</NuxtLink>
    </li>
    <li>
      <NuxtLink :to="localePath({ name: 'hobbies' })">hobbies</NuxtLink>
    </li>
  </ul>
</template>

<script setup>
// const { t } = useI18n()
const localePath = useLocalePath()
</script>
