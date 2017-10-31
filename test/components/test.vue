<template>
  <div class="test" @click="$close">TEST!</div>
</template>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
