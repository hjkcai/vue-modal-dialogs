'use strict'

import Vue from 'vue'
import { create } from 'vue-modal-dialogs'

describe('makeDialog', function () {
  describe('should return a function if `component` option is', function () {
    describe('a component definition', function () {
      it('with a render function', function () {
        const result = create({ render: h => h('div') })
        expect(result).to.be.a('function')
      })

      it('with a template string', function () {
        const result = create({ template: '<div></div>' })
        expect(result).to.be.a('function')
      })
    })

    describe('the result of Vue.extend', function () {
      it('with a render function', function () {
        const result = create(Vue.extend({ render: h => h('div') }))
        expect(result).to.be.a('function')
      })

      it('with a template string', function () {
        const result = create(Vue.extend({ template: '<div></div>' }))
        expect(result).to.be.a('function')
      })
    })

    it('imported from a .vue file', function () {
      const result = create(require('../components/test.vue').default)
      expect(result).to.be.a('function')
    })

    it('imported from a .vue file using TypeScript as its script', function () {
      const result = create(require('../components/test-ts.vue').default)
      expect(result).to.be.a('function')
    })

    it('imported from a .tsx component', function () {
      const result = create(require('../components/test-tsx.tsx').default)
      expect(result).to.be.a('function')
    })
  })

  describe('should return null if no valid component passed', function () {
    it('undefined', function () {
      const result = create()
      expect(result).not.to.be.exist
    })

    it('null', function () {
      const result = create(null)
      expect(result).not.to.be.exist
    })

    it('number', function () {
      const result = create(0)
      expect(result).not.to.be.exist
    })

    it('boolean', function () {
      const result = create(true)
      expect(result).not.to.be.exist
    })

    it('string', function () {
      const result = create('')
      expect(result).not.to.be.exist
    })

    it('bad component definition', function () {
      const result = create({})
      expect(result).not.to.be.exist
    })

    it('bad component constructor', function () {
      const result = create(() => { })
      expect(result).not.to.be.exist
    })
  })
})
