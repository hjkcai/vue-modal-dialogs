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

    Vue.use(ModalDialogs)

    const vm = new TestTsx()
    vm.$close         // Do not call $close since 'vm' is not in a dialog context
    vm.dialogId
    vm.arguments

    ModalDialogs.create(TestTsx)().then(noop<boolean>(), noop)
    ModalDialogs.create<boolean, boolean>(TestTsx, 'test')(true).then(noop<boolean>(), noop)
    ModalDialogs.create<{ test: string }>({
      template: '<div></div>',
      props: {
        test: String
      },
      methods: {
        test () {
          const s: string = this.test
          this.$close(true)
        }
      }
    })({ test: '' }).then(noop<boolean>(), noop)
  })
})
