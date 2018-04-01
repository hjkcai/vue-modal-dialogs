<template>
  <div>
    <el-button type="primary" @click="load">Load something slowly</el-button>
  </div>
</template>

<script>
  import Loading from './dialog'
  import { create } from 'vue-modal-dialogs'

  const startLoading = create(Loading)

  export default {
    methods: {
      load () {
        const loading = startLoading()
        setTimeout(() => loading.close(), 3000)
      }
    }
  }
</script>
