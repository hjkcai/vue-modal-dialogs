<template>
  <div>
    <el-input v-model="content" placeholder="Type something here..."></el-input>
    <el-button type="primary" @click="showMessage">Show message</el-button>
  </div>
</template>

<script>
  import MessageBox from './dialog'
  import { create } from 'vue-modal-dialogs'

  const messageBox = create(MessageBox, 'content')

  export default {
    data: () => ({
      content: 'Hello World!'
    }),
    methods: {
      showMessage () {
        messageBox(this.content)
      }
    }
  }
</script>
