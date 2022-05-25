<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
.full-width {
  width: 100vw;
}

.appointments-holder {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.section {
  width: 80vw;
  margin-inline: auto;
}
</style>
