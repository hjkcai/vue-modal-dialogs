<template>
  <div id="app">
    <div><input type="text" v-model="title"></div>
    <div><input type="text" v-model="message"></div>
    <div><button @click="showMessage">Show Message</button></div>
    <div>{{ result }}</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      title: 'Hello World',
      message: 'This is a message box!',
      result: ''
    }),
    methods: {
      showMessage () {
        this.$msgbox(this.message, this.title).then(result => {
          this.result = result
        })
      }
    }
  }
</script>

<style lang="less">
  #app {
    > div {
      margin: 8px 0;
    }

    input, button {
      font-size: 1em;
    }
  }
</style>
