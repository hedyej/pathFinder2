<template>
  <div class="wrap">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrap {
  margin: auto;
  padding: 0 16px;
  @media (min-width: 1200px) {
    max-width: 1200px;
  }
}
</style>
