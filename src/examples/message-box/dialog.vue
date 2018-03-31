<template>
  <div class="message-box dialog-mask" @click="$close">
    <div class="dialog-content">
      <div class="dialog-body">
        <p>{{ content }}</p>
      </div>
      <footer>
        <el-button type="text" size="mini" @click="$close">OK</el-button>
      </footer>
    </div>
  </div>
</template>
