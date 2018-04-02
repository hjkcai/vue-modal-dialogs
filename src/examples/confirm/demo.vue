<template>
  <div>
    <el-button type="primary" @click="ask">Ask something</el-button>
    <el-button type="primary" @click="askTransition">Ask something else</el-button>
  </div>
</template>

<script>
  import Confirm from './dialog'
  import MessageBox from '../message-box/dialog'
  import { create } from 'vue-modal-dialogs'

  const confirm = create(Confirm, 'title', 'content')
  const messageBox = create(MessageBox, 'content')

  export default {
    methods: {
      star () {
        window.open('https://github.com/hjkcai/vue-modal-dialogs', '_blank')
      },
      noStar () {
        messageBox('Feel free to do it later.')
      },
      async ask () {
        if (await confirm('Hey', 'Do you like this project?')) {
          if (await confirm('Thanks!', 'Could you please star this project at Github now?')) {
            this.star()
          } else this.noStar()
        } else {
          messageBox(`Could you please tell me what's wrong?\nIssues and PRs are welcomed!`)
        }
      },
      async askTransition () {
        if (await confirm('Hey', 'Do you think vue-modal-dialogs is useful?').transition()) {
          if (await confirm('Thanks!', 'Why not give it a star!').transition()) this.star()
          else this.noStar()
        } else {
          messageBox('Oops... I will do my best to improve it!')
        }
      }
    }
  }
</script>
