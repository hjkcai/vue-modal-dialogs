<template>
  <section>
    <h2>What about filling in a form?</h2>
    <p v-if="result">{{ result }}</p>
    <div class="one-button">
      <button class="md-button" @click="goLogin">Login</button>
    </div>
    <div class="source">
      <h3>Source</h3>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/sections/login.vue">Button</a>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/dialogs/login.vue">Dialog</a>
    </div>
  </section>
</template>

<script>
  import { login } from '../dialogs'

  export default {
    data: () => ({
      result: ''
    }),
    methods: {
      async goLogin () {
        this.result = await login()
        // Do further API call
      }
    }
  }
</script>
