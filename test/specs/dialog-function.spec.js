'use strict'

import Vue from 'vue'
import * as sinon from 'sinon'
import * as VueTest from 'vue-test-utils'
import { wrappers } from 'vue-modal-dialogs/wrapper'
import TestComponent from '../components/test.vue'
import { create, DialogsWrapper } from 'vue-modal-dialogs'      // eslint-disable-line no-unused-vars

describe('Dialog function', function () {
  let wrapper
  const testFunction = create(TestComponent, 'title', 'content')

  function nextTick () {
    // Wait 20ms to ensure the component promise is resolved
    return new Promise(resolve => setTimeout(resolve, 20))
  }

  function getDialogComponentVm (index = 0) {
    return wrapper.vm.$children[0].$children[0].$children[index]
  }

  beforeEach('recreate two wrappers', function () {
    wrapper = VueTest.mount({
      render (h) {
        return (
          <div>
            <DialogsWrapper />
            <DialogsWrapper name="another" />
          </div>
        )
      }
    })
  })

  afterEach('clear the internal states', function () {
    wrapper.vm.$destroy()
    Object.keys(wrappers).forEach(key => delete wrappers[key])
  })

  it('should return a Promise', function () {
    const result = testFunction()
    expect(result).to.be.a('promise')
  })

  it('should resolve the returned Promise with some data', async function () {
    const data = {}
    const promise = testFunction()
    const resolveSpy = sinon.spy()
    await nextTick()

    promise.then(resolveSpy)
    promise.close(data)
    await promise

    expect(resolveSpy).to.have.been.calledWith(data)
  })

  describe('should have a close function', function () {
    it('in the returned Promise', function () {
      const promise = testFunction()
      expect(promise.close).to.be.a('function')
    })

    it('injected into the dialog component', async function () {
      testFunction()
      await nextTick()
      expect(getDialogComponentVm().$close).to.be.a('function')
    })

    it('returns the original Promise', function () {
      const promise = testFunction()
      expect(promise.close()).to.equal(promise)
    })

    it('closes the dialog with data', async function () {
      const promise = testFunction()

      await nextTick()
      expect(wrapper.contains('.test')).to.be.true

      const data = {}
      promise.close(data)
      expect(await promise).to.be.equal(data)

      await new Promise(r => setTimeout(r, 200))      // wait for transition ends
      expect(wrapper.contains('.test')).to.be.false
    })
  })

  describe('should render dialog component into the correct wrapper if `wrapper` option is', function () {
    it('undefined', async function () {
      testFunction()
      await nextTick()

      const el = wrapper.find('.test').element.parentElement
      expect(el).to.equal(wrapper.vm.$children[0].$el)
    })

    it(`'default'`, async function () {
      create({
        wrapper: 'default',
        component: TestComponent
      })()
      await nextTick()

      const el = wrapper.find('.test').element.parentElement
      expect(el).to.equal(wrapper.vm.$children[0].$el)
    })

    it(`'another'`, async function () {
      create({
        wrapper: 'another',
        component: TestComponent
      })()
      await nextTick()

      const el = wrapper.find('.test').element.parentElement
      expect(el).to.equal(wrapper.vm.$children[1].$el)
    })
  })

  describe('should fail if the `wrapper` option is invalid', async function () {
    const rejectSpy = sinon.spy()
    const resolveSpy = sinon.spy()

    create({
      wrapper: 'invalid',
      component: TestComponent
    })().then(resolveSpy, rejectSpy)

    await nextTick()
    expect(rejectSpy).to.have.been.called
    expect(resolveSpy).not.to.have.been.called
  })

  describe('should correctly convert the arguments to component props using', function () {
    it('arguments list', async function () {
      testFunction('title', 'content')
      await nextTick()

      const props = getDialogComponentVm()._props
      expect(props).to.deep.equal({
        dialogId: 0,
        arguments: ['title', 'content'],
        title: 'title',
        content: 'content'
      })
    })

    it('object', async function () {
      const testObj = { title: 'title', content: 'content' }
      testFunction(testObj)
      await nextTick()

      const props = getDialogComponentVm()._props
      expect(props).to.deep.equal({
        dialogId: 0,
        arguments: [testObj],
        title: testObj,
        content: undefined
      })
    })

    it('data object', async function () {
      const component = Vue.extend({ props: ['title', 'content'], extends: TestComponent })
      create(component)({ title: 'title', content: 'content' })
      await nextTick()

      const props = getDialogComponentVm()._props
      expect(props).to.deep.equal({
        dialogId: 0,
        arguments: [{ title: 'title', content: 'content' }],
        title: 'title',
        content: 'content'
      })
    })
  })

  describe('should not override the original props definition of the dialog component if the props are defined by', function () {
    it('an array', async function () {
      const dialogFunction = create({
        props: ['title', 'content'],
        render: h => <div />
      }, 'title')

      dialogFunction('test')
      await nextTick()

      const vm = getDialogComponentVm()
      expect(vm.title).to.equal('test')
      expect(vm._props).to.have.own.property('content')
    })

    it('an object', async function () {
      const dialogFunction = create({
        props: {
          title: {
            type: String,
            default: 'test'
          },
          content: Number
        },
        render: h => <div />
      }, 'title')

      dialogFunction()
      await nextTick()

      const vm = getDialogComponentVm()
      expect(vm.title).to.equal('test')
      expect(vm._props).to.have.own.property('content')
    })

    it('@Prop decorator from vue-property-decorator', async function () {
      const dialogFunction = create(require('../components/test-ts.vue').default, 'title')

      dialogFunction()
      await nextTick()

      const vm = getDialogComponentVm()
      expect(vm.title).to.equal('test')
      expect(vm._props).to.have.own.property('content')
    })
  })
})
