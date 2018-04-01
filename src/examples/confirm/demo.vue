<template>
  <div>
    <el-button type="primary" @click="ask">Ask something</el-button>
  </div>
</template>

<script>
  import Confirm from './dialog'
  import MessageBox from '../message-box/dialog'
  import { create } from 'vue-modal-dialogs'

  const confirm = create(Confirm, 'content', 'yes', 'no')
  const messageBox = create(MessageBox, 'content')

  export default {
    methods: {
      async ask () {
        if (await confirm('Do you like this project?')) {
          if (await confirm('Please star this project at Github. Thank you!', 'Take me to Github', 'Maybe later')) {
            window.open('https://github.com/hjkcai/vue-modal-dialogs', '_blank')
          }
        } else {
          await messageBox(`Could you please tell me what's wrong?\nIssues and PRs are welcomed!`)
        }
      }
    }
  }
</script>
