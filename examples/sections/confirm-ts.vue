<template>
  <section>
    <h2>TypeScript ready!</h2>
    <div class="one-button">
      <button class="md-button" @click="ask">Really?</button>
    </div>
    <div class="source">
      <h3>Source</h3>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/sections/confirm-ts.vue">Button</a>
      <a href="https://github.com/hjkcai/vue-modal-dialogs/blob/master/examples/dialogs/confirm-ts.vue">Dialog</a>
    </div>
  </section>
</template>

<script lang="ts">
  import Confirm from '../dialogs/confirm-ts.vue'
  import { create } from 'vue-modal-dialogs'
  import { Vue, Component } from 'vue-property-decorator'

  interface ConfirmData {
    title: string,
    content: string
  }

  const confirmByArgs = create<string, string, boolean>(Confirm, 'title', 'content')
  const confirmByDataObject = create<ConfirmData, boolean>(Confirm)

  @Component({})
  export default class ComfirmTsSection extends Vue {
    async ask () {
      // result will be a boolean
      const result = await confirmByArgs('Of course!', 'This component is written in TypeScript!')
      if (result) {
        confirmByDataObject({
          title: 'Awesome!',
          content: 'Why not have a try?'
        })
      }
    }
  }
</script>
