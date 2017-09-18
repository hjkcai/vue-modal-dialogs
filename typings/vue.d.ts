import Vue = require('vue')
import { ModalDialogsInstance } from 'vue-modal-dialogs'

declare module "vue/types/vue" {
  interface Vue {
    $dialogs: ModalDialogsInstance
  }
}
