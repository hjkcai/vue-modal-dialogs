'use strict'

import Vue from 'vue'
import ModalDialogs, { makeDialog } from 'vue-modal-dialogs'

import Login from './dialogs/login'
import Confirm from './dialogs/confirm'
import MessageBox from './dialogs/message-box'

// Initialize ModalDialogs
Vue.use(ModalDialogs)

// Make serval dialog functions
export const login = makeDialog(Login)
export const confirm = makeDialog(Confirm)
export const messageBox = makeDialog(MessageBox, 'content')

// You can install dialog functions into Vue's prototype
Vue.prototype.$confirm = confirm
