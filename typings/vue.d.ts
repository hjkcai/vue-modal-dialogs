import Vue = require('vue')
import VueModalDialogs = require('vue-modal-dialogs')

declare module "vue/types/vue" {
  interface Vue {
    $dialogs: typeof VueModalDialogs
  }
}
