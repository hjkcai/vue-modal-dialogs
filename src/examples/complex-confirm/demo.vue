<template>
  <div>
    <el-button type="primary" @click="ask">Ask something complexly</el-button>
  </div>
</template>

<script>
  import ComplexConfirm from './dialog'
  import { create } from 'vue-modal-dialogs'

  // Create the dialog function with no other arguments to
  // tell vue-moda-dialogs to treat the first argument as the data object
  const confirm = create(ComplexConfirm)

  export default {
    methods: {
      async ask () {
        const result = await confirm({
          title: 'I am a confirm',
          content: 'To click OK or not to click OK, that is a question.',
          yes: 'OK',
          yesValue: 'good',
          no: 'Cancel',
          noValue: 'not good'
        })

        console.log('that is', result)
      }
    }
  }
</script>
