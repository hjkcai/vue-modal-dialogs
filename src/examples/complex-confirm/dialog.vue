<template>
  <div class="message-box dialog-mask">
    <div class="dialog-content">
      <header>{{ title }}</header>
      <div class="dialog-body">
        <p>{{ content }}</p>
      </div>
      <footer>
        <el-button type="text" size="mini" @click="$close(yesValue)">{{ yes }}</el-button>
        <el-button type="text" size="mini" @click="$close(noValue)">{{ no }}</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      content: String,
      yes: {
        type: String,
        default: 'Yes'
      },
      yesValue: {
        default: true
      },
      no: {
        type: String,
        default: 'No'
      },
      noValue: {
        default: false
      }
    }
  }
</script>
