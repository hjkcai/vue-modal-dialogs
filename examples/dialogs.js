'use strict'

import Vue from 'vue'
import * as ModalDialogs from 'vue-modal-dialogs'

import Login from './dialogs/login'
import Confirm from './dialogs/confirm'
import MessageBox from './dialogs/message-box'

// Initialize ModalDialogs
Vue.use(ModalDialogs)

// Make serval dialog functions
export const login = ModalDialogs.create(Login)
export const confirm = ModalDialogs.create(Confirm)
export const messageBox = ModalDialogs.create(MessageBox, 'content')

// You can install dialog functions into Vue's prototype
Vue.prototype.$confirm = confirm
