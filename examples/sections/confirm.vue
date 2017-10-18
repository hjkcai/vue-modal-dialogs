<template>
  <section>
    <h2>Ask something</h2>
    <div class="one-button">
      <button class="md-button" @click="ask">Ask me</button>
    </div>
    <div class="source">
      <h3>Source</h3>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/sections/confirm.vue">Button</a>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/dialogs/confirm.vue">Dialog</a>
    </div>
  </section>
</template>

<script>
  import { messageBox } from '../dialogs'

  export default {
    methods: {
      async ask () {
        // call dialog function with data in the arguments
        if (await this.$confirm('Oh my user', '😊 Would you like to star vue-modal-dialogs?')) {
          // call dialog function with data in one object
          if (await this.$confirm({
            title: 'That is great!',
            content: '😀 Go to github page now?'
          })) {
            window.location = 'https://github.com/hjkcai/vue-modal-dialogs'
          } else {
            await messageBox('😊 Feel free to do it later')
          }
        } else {
          await messageBox('🙁 Oops... If something is wrong, please tell me!')
        }
      }
    }
  }
</script>
