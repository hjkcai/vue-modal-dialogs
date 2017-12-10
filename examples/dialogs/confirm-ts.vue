<template>
  <div class="message-wrapper" @click.self="cancel">
    <div class="message-content confirm">
      <div class="message-title">{{ title }}</div>
      <div class="message-text">{{ content }}</div>
      <div class="buttons">
        <button class="md-button flat" @click="cancel">Cancel</button>
        <button class="md-button flat" @click="ok">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { DialogComponent } from 'vue-modal-dialogs'
  import { Prop, Component } from 'vue-property-decorator'

  @Component({})
  export default class ConfirmTs extends DialogComponent<boolean> {
    @Prop() title: String
    @Prop() content: String

    ok () {
      // Close confirm dialog and send 'true' to its caller
      this.$close(true)
    }

    cancel () {
      this.$close(false)
    }
  }
</script>
