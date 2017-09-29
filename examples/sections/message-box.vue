<template>
  <section>
    <h2>Show a simple message box</h2>
    <form @submit.prevent="messageBox(message)">
      <input type="text" class="md-textfield" v-model="message">
      <button class="md-button">Show Message</button>
    </form>
    <div class="source">
      <h3>Source</h3>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/sections/message-box.vue">Button</a>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/dialogs/message-box.vue">Dialog</a>
    </div>
  </section>
</template>

<script>
  import { messageBox } from '../dialogs'

  export default {
    data: () => ({
      message: '😱 Oh you triggered a MessageBox!'
    }),
    methods: {
      messageBox
    }
  }
</script>
