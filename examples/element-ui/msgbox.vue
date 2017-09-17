<template>
  <el-dialog :title="title" :visible="true" @visible-change="$event || close()" :modal="false">
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
