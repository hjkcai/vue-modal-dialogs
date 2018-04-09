import Vue from 'vue'
import TestTsx from '../components/test-tsx'
import * as ModalDialogs from 'vue-modal-dialogs'

declare const describe: any
declare const it: any

describe('TypeScript', function () {
  // Test for TypeScript functionalities.
  // The test will pass if there is no error when compiling
  it('should accept all usages', function () {
    function noop<T> () {
      return (arg: T) => {}
    }

    async function neverCalled () {
      Vue.use(ModalDialogs)

      const vm = new TestTsx()
      vm.$close(true)
      vm.$error('any reason')
      vm.arguments

      ModalDialogs.create<boolean, boolean>(TestTsx, 'test')(true).then(noop<boolean>(), noop)
      ModalDialogs.create<{ test: string }, boolean>(import('../components/test-tsx'))({ test: '' }).then(noop<boolean>(), noop)

      const dialog = ModalDialogs.create(TestTsx)()
      dialog.then(noop<boolean>(), noop)
      dialog.close(true)
      dialog.error('any reason')
      dialog.transition().then(noop<boolean>(), noop)

      const dialogVm = await dialog.getInstance<TestTsx>()
      dialogVm.title
    }
  })
})
