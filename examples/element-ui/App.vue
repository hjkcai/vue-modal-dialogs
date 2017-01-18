<template>
  <div id="app">
    <el-button type="primary" @click="login">Login</el-button>
    <div>{{ result }}</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      result: ''
    }),
    methods: {
      async login () {
        if (await this.$dialogs.show('login')) {
          this.result = 'Login successfully'
        } else this.result = 'Login unsuccessfully'
      }
    }
  }
</script>

<style lang="less">
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.33s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
