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

  const confirm = create(Confirm, 'content', 'yes', 'no')
  const messageBox = create(MessageBox, 'content')

  export default {
    methods: {
      star () {
        window.open('https://github.com/hjkcai/vue-modal-dialogs', '_blank')
      },
      noStar () {
        messageBox('Feel free to star it later.')
      },
      async ask () {
        if (await confirm('Do you like this project?')) {
          if (await confirm('Please star this project at Github. Thank you!', 'Take me to Github', 'Maybe later')) {
            this.star()
          } else this.noStar()
        } else {
          messageBox(`Could you please tell me what's wrong?\nIssues and PRs are welcomed!`)
        }
      },
      async askTransition () {
        if (await confirm('Do you think vue-modal-dialogs is useful?').transition()) {
          if (await confirm('Why not give it a star!').transition()) this.star()
          else this.noStar()
        } else {
          messageBox('Oops... I will do my best to improve it!')
        }
      }
    }
  }
</script>
