'use strict'

import Vue from 'vue'
import * as utils from 'vue-modal-dialogs/utils'

describe('utils', () => {
  describe('collectProps', () => {
    // when props map is NOT an empty array
    it('should transform the argument list into an object', () => {
      const target = utils.collectProps(['a', 'b', 'c'], [{ key: 'value' }, 2, 3])
      const expectation = { a: { key: 'value' }, b: 2, c: 3 }
      expect(target).to.deep.equal(expectation)
    })

    // when props map is an empty array
    it('should use the first argument as the data object', () => {
      const target = utils.collectProps([], [{ key: 'value' }, 2, 3])
      const expectation = { key: 'value' }
      expect(target).to.deep.equal(expectation)
    })
  })

  describe('isComponentCtor', () => {
    describe('should return true if `obj` is', () => {
      describe('a component definition', function () {
        it('with a render function', function () {
          const result = utils.isComponentCtor({ render: h => h('div') })
          expect(result).to.be.true
        })

        it('with a template string', function () {
          const result = utils.isComponentCtor({ template: '<div></div>' })
          expect(result).to.be.true
        })
      })

      describe('the result of Vue.extend', function () {
        it('with a render function', function () {
          const result = utils.isComponentCtor(Vue.extend({ render: h => h('div') }))
          expect(result).to.be.true
        })

        it('with a template string', function () {
          const result = utils.isComponentCtor(Vue.extend({ template: '<div></div>' }))
          expect(result).to.be.true
        })
      })

      it('imported from a .vue file', function () {
        const result = utils.isComponentCtor(require('../components/test.vue').default)
        expect(result).to.be.true
      })

      it('imported from a .vue file using TypeScript as its script', function () {
        const result = utils.isComponentCtor(require('../components/test-ts.vue').default)
        expect(result).to.be.true
      })

      it('imported from a .tsx component', function () {
        const result = utils.isComponentCtor(require('../components/test-tsx.tsx').default)
        expect(result).to.be.true
      })
    })

    describe('should return `false` if obj is', function () {
      it('undefined', function () {
        const result = utils.isComponentCtor()
        expect(result).to.be.false
      })

      it('null', function () {
        const result = utils.isComponentCtor(null)
        expect(result).to.be.false
      })

      it('number', function () {
        const result = utils.isComponentCtor(0)
        expect(result).to.be.false
      })

      it('boolean', function () {
        const result = utils.isComponentCtor(true)
        expect(result).to.be.false
      })

      it('string', function () {
        const result = utils.isComponentCtor('')
        expect(result).to.be.false
      })

      it('bad component definition', function () {
        const result = utils.isComponentCtor({})
        expect(result).to.be.false
      })

      it('bad component constructor', function () {
        const result = utils.isComponentCtor(() => {})
        expect(result).to.be.false
      })
    })
  })

  describe('filterUndefinedProps', () => {
    const props = ['a', 'b', 'c', 'd']

    // Vue modifies the options object after calling Vue.extend.
    // So I use functions to keep them fresh
    const A = () => ({ props: ['a'] })
    const B = () => ({ props: { b: String, e: Number } })
    const C = () => ({ props: ['c', 'f'] })
    const D = () => ({ props: { d: { type: Number, default: 0 } } })

    const vA = () => Vue.extend(A())
    const vB = () => Vue.extend(B())
    const vC = () => Vue.extend(C())
    const vD = () => Vue.extend(D())

    describe('should accept raw component definition', () => {
      it('props array', () => {
        const result = utils.filterUndefinedProps(props, A())
        expect(result).to.be.deep.equal(['b', 'c', 'd'])
      })

      it('props record', () => {
        const result = utils.filterUndefinedProps(props, B())
        expect(result).to.be.deep.equal(['a', 'c', 'd'])
      })

      it('extends', () => {
        const result = utils.filterUndefinedProps(props, { extends: B() })
        expect(result).to.be.deep.equal(['a', 'c', 'd'])
      })

      it('mixins', () => {
        const result = utils.filterUndefinedProps(props, { mixins: [C(), D()] })
        expect(result).to.be.deep.equal(['a', 'b'])
      })

      it('props & extends & mixins', () => {
        const result = utils.filterUndefinedProps(props, {
          ...A(),
          extends: B(),
          mixins: [C(), D()]
        })

        expect(result).to.be.deep.equal([])
      })
    })

    describe('should correctly read props definition from component constructor', () => {
      it('props array', () => {
        const result = utils.filterUndefinedProps(props, vA())
        expect(result).to.be.deep.equal(['b', 'c', 'd'])
      })

      it('props record', () => {
        const result = utils.filterUndefinedProps(props, vB())
        expect(result).to.be.deep.equal(['a', 'c', 'd'])
      })

      it('extends', () => {
        const result = utils.filterUndefinedProps(props, Vue.extend({ extends: vB() }))
        expect(result).to.be.deep.equal(['a', 'c', 'd'])
      })

      it('mixins', () => {
        const result = utils.filterUndefinedProps(props, Vue.extend({ mixins: [vC(), vD()] }))
        expect(result).to.be.deep.equal(['a', 'b'])
      })

      it('props & extends & mixins', () => {
        const result = utils.filterUndefinedProps(props, Vue.extend({
          ...A(),
          extends: vB(),
          mixins: [vC(), vD()]
        }))

        expect(result).to.be.deep.equal([])
      })
    })
  })
})
