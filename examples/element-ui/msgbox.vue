<template>
  <el-dialog :title="title" :visible="true" @visible-change="$event || $close()" :modal="false">
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
      /**
       * A '$close' method is already injected into dialog components.
       * You can just use it directly.
       * You should not define another '$close' method in dialog components.
       */
      // $close (data)
    }
  }
</script>
