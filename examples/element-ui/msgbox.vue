<template>
  <el-dialog :title="title" :value="true" @close="close">
    <p>{{ message }}</p>
    <span slot="footer">
      <el-button type="primary" @click="close">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['message', 'title'],
    methods: {
      close () {
        this.$emit('close')
      }
    }
  }
</script>
