<template>
  <div class="test" @click="$close">
    <span class="title">{{ title }}</span>
    <span class="content">{{ content }}</span>
  </div>
</template>

<script lang="ts">
export default {

}
</script>


<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
