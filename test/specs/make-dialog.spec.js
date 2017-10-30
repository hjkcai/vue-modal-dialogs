'use strict'

import Vue from 'vue'
import { makeDialog } from 'vue-modal-dialogs'

describe('makeDialog', function () {
  describe('should return a function if `component` option is', function () {
    describe('a component definition', function () {
      it('with a render function', function () {
        const result = makeDialog({ render: h => h('div') })
        expect(result).to.be.a('function')
      })

      it('with a template string', function () {
        const result = makeDialog({ template: '<div></div>' })
        expect(result).to.be.a('function')
      })
    })

    describe('the result of Vue.extend', function () {
      it('with a render function', function () {
        const result = makeDialog(Vue.extend({ render: h => h('div') }))
        expect(result).to.be.a('function')
      })

      it('with a template string', function () {
        const result = makeDialog(Vue.extend({ template: '<div></div>' }))
        expect(result).to.be.a('function')
      })
    })

    it('imported from a .vue file', function () {
      const result = makeDialog(require('../components/test.vue').default)
      expect(result).to.be.a('function')
    })
  })

  describe('should return null if no valid component passed', function () {
    it('undefined', function () {
      const result = makeDialog()
      expect(result).not.to.be.exist
    })

    it('null', function () {
      const result = makeDialog(null)
      expect(result).not.to.be.exist
    })

    it('number', function () {
      const result = makeDialog(0)
      expect(result).not.to.be.exist
    })

    it('boolean', function () {
      const result = makeDialog(true)
      expect(result).not.to.be.exist
    })

    it('string', function () {
      const result = makeDialog('')
      expect(result).not.to.be.exist
    })

    it('bad component definition', function () {
      const result = makeDialog({})
      expect(result).not.to.be.exist
    })

    it('bad component constructor', function () {
      const result = makeDialog(() => { })
      expect(result).not.to.be.exist
    })
  })
})
