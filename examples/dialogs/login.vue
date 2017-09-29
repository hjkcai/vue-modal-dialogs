<template>
  <div class="message-wrapper" @click.self="$close()">
    <form class="message-content login confirm" @submit.prevent="submit">
      <div class="message-title">Login</div>
      <div class="message-text">
        <input class="md-textfield" type="text" placeholder="Username" v-model="user.username">
        <input class="md-textfield" type="password" placeholder="Password" v-model="user.password">
      </div>
      <div class="buttons">
        <button class="md-button flat" type="button" @click="$close()">Cancel</button>
        <button class="md-button flat" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { messageBox } from '../dialogs'

  export default {
    data: () => ({
      user: {
        username: '',
        password: ''
      }
    }),
    methods: {
      submit () {
        if (this.user.username.trim() && this.user.password) {
          // You can easily nest dialogs by calling other dialog functions.
          const messageBoxPromise = messageBox('😏 Welcome, ' + this.user.username)

          // You can close dialogs with a promise.
          // The caller will receive the final result of this promise.
          this.$close(messageBoxPromise.then(() => ({
            username: this.user.username.trim(),
            password: this.user.password
          })))
        } else {
          messageBox('❌ Please enter both username and password')
        }
      }
    }
  }
</script>

<style lang="less">
  .login input {
    display: block;

    &:first-child {
      margin-bottom: 16px;
    }
  }
</style>
