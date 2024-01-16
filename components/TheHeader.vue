<template>
  <header class="header">
    <div class="row">
      <TheLogo class="header__logo" />
      <div class="header__tools">
        <BaseLanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  box-sizing: border-box;
  position: sticky;
  z-index: 2;
  top: 0;
  width: 100%;
  padding: $gutter 0;
  background-color: var(--color-background);
  background-color: var(--color-main-lightest);
  height: 90px;

  .row {
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    max-height: 60px;
  }

  &__tools {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 10px;
  }
}
</style>
