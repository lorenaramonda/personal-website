<template>
  <NuxtLayout name="empty">
    <TheHeader />
    <main>
      <slot />
    </main>

    <TheFooter />
    <CookiesPolicy />
  </NuxtLayout>
</template>
