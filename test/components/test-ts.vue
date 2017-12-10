<template>
  <div class="test" @click="$close">
    <span class="title">{{ title }}</span>
    <span class="content">{{ content }}</span>
  </div>
</template>

<script lang="ts">
  import { DialogComponent } from 'vue-modal-dialogs'
  import { Prop, Component } from 'vue-property-decorator'

  @Component({})
  export default class ConfirmTs extends DialogComponent<boolean> {
    @Prop({ type: String, default: 'test' })
    title: String

    @Prop() content: String
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
