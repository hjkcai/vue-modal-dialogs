<template>
  <div>
    <el-button type="primary" @click="askVue">Using .vue module</el-button>
    <el-button type="primary" @click="askTsx">Using .tsx module</el-button>
  </div>
</template>

<script lang="ts">
  import Confirm from '../confirm/dialog.vue'
  import TsConfirm from './dialog'
  import { create } from 'vue-modal-dialogs'

  interface ConfirmData {
    title: string,
    content: string
  }

  // .vue modules contain no type infomation
  // You have to declare everything by yourself
  // (prop1: string, prop2: string) => boolean
  const confirmVue = create<string, string, boolean>(Confirm, 'title', 'content')

  // TsConfirm is subtype of DialogComponent<boolean>
  // The return type of confirmTsx can be inferred from the generic
  // You still need to declare the argument type
  // (data: ConfirmData) => boolean
  const confirmTsx = create<ConfirmData>(TsConfirm)

  export default {
    methods: {
      async askVue () {
        const result: boolean = await confirmVue('Hey', 'Do you like this project?')
        console.log(result)
      },
      async askTsx () {
        const result: boolean = await confirmTsx({
          title: 'Hey',
          content: 'Do you like this project?'
        })

        console.log(result)
      }
    }
  }
</script>
