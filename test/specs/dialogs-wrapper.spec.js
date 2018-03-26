'use strict'

import * as sinon from 'sinon'
import * as VueTest from 'vue-test-utils'
import { wrappers } from 'vue-modal-dialogs/wrapper'
import TestComponent from '../components/test.vue'
import { create, DialogsWrapper } from 'vue-modal-dialogs'

function delay (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

describe('Dialogs wrapper', function () {
  beforeEach('clear the internal states', function () {
    Object.keys(wrappers).forEach(key => delete wrappers[key])
  })

  it('should add `default` in the wrapper entries', function () {
    const { vm } = VueTest.mount(DialogsWrapper)
    expect(wrappers.default).to.equal(vm)
  })

  it('should add the name of the wrapper in the wrapper entries', function () {
    VueTest.mount(DialogsWrapper)
    const { vm } = VueTest.mount(DialogsWrapper, {
      propsData: { name: 'test' }
    })

    expect(wrappers.test).to.equal(vm)
  })

  it('should override the existing wrapper entry', async function () {
    const vmTest = VueTest.mount(DialogsWrapper, {
      propsData: { name: 'test' }
    }).vm
    expect(wrappers.test).to.equal(vmTest)

    // add again
    const vmTest1 = VueTest.mount(DialogsWrapper, {
      propsData: { name: 'test' }
    }).vm
    expect(wrappers.test).to.equal(vmTest1)
  })

  it('should pass properties to the <transition-group> component', function () {
    const propsData = {
      appear: true,
      appearActiveClass: 'appearActiveClass',
      appearClass: 'appearClass',
      appearToClass: 'appearToClass',
      css: true,
      duration: 'duration',
      enterActiveClass: 'enterActiveClass',
      enterClass: 'enterClass',
      enterToClass: 'enterToClass',
      leaveActiveClass: 'leaveActiveClass',
      leaveClass: 'leaveClass',
      leaveToClass: 'leaveToClass',
      moveClass: 'moveClass',
      name: 'wrapperName',
      transitionName: 'fade',
      tag: 'div',
      type: 'type'
    }

    // Using 'propsData' options will only pass component data into defined props.
    // But most properties are not defined.
    // So I use 'attrs' and 'propsData' together to send data into DialogsWrapper.
    const { vm } = VueTest.mount(DialogsWrapper, { attrs: propsData, propsData })

    const transformedPropsData = Object.assign({}, propsData, { name: propsData.transitionName })
    delete transformedPropsData.transitionName

    expect(vm.$children[0]._props).to.be.deep.equal(transformedPropsData)
  })

  it('should receive the events of <transition-group> component', async function () {
    const spy = sinon.spy()
    VueTest.mount(DialogsWrapper, {
      attrs: { css: false },
      propsData: { transitionName: 'fade' },
      listeners: {
        // Note: other events of the <transition-group> group are not tested because they are not easy to test.
        // If these event can be received correctly, so do other events, due to my implementation.
        'before-enter': spy,
        'before-leave': spy,
        'enter': spy,
        'leave': spy,
        'after-enter': spy,
        'after-leave': spy
      }
    })

    const promise = create(TestComponent)()
    await delay(100)
    await promise.close()
    await delay(100)

    expect(spy).to.have.callCount(6)
  })
})
