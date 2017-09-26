<template>
  <div class="msgbox-wrapper">
    <div class="msgbox">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <div class="buttons">
        <button @click="close('cancel')">Cancel</button>
        <button @click="close('ok')">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: Number,
      another: {
        type: Number,
        required: true
      }
    },
    methods: {
      close (data) {
        // close a dialog by emitting 'close' event with data in the 2nd arugment
        // the data will be returned to the previously created Promise
        this.$close(data)
      }
    }
  }
</script>

<style lang="less">
  .msgbox-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.33);

    .msgbox {
      padding: 16px;
      background-color: white;
    }

    h1 {
      font-size: 1em;
    }

    .buttons {
      text-align: right;
    }
  }
</style>
