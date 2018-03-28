'use strict'

import * as sinon from 'sinon'
import * as VueTest from '@vue/test-utils'
import { wrappers } from 'vue-modal-dialogs/wrapper'
import TestComponent from '../components/test.vue'
import { create, DialogsWrapper } from 'vue-modal-dialogs'      // eslint-disable-line no-unused-vars

const noop = () => { /* nothing */ }
let wrapper
const symbol = {}   // Fake symbol
const testFunction = create(TestComponent, 'title', 'content')

function nextTick () {
  // Wait 20ms to ensure the component promise is resolved
  return new Promise(resolve => setTimeout(resolve, 20))
}

function getDialogComponentVm (index = 0, wrapperIndex = 0) {
  return wrapper.vm.$children[wrapperIndex].$children[0].$children[index]
}

function generatePromiseTest (dialogFunction) {
  return async function promiseTest (action = noop, data = symbol, awaitTransition = false) {
    let dialog = dialogFunction(data)
    const rejectSpy = sinon.spy()
    const resolveSpy = sinon.spy()

    await nextTick()
    await action(dialog, resolveSpy, rejectSpy)

    if (awaitTransition) {
      dialog = dialog.transition()
    }

    await dialog.then(resolveSpy, rejectSpy)
    return { data, resolveSpy, rejectSpy }
  }
}

function registerCommonHooks () {
  beforeEach('create two wrappers', () => {
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

  afterEach('clear the internal states', () => {
    wrapper.destroy()
    Object.keys(wrappers).forEach(key => delete wrappers[key])
  })
}

describe('Dialog function creator', () => {
  registerCommonHooks()

  async function assertTestComponent () {
    await nextTick()
    expect(getDialogComponentVm().$el.classList.contains('test')).to.be.true
  }

  describe('should handle async components correctly', () => {
    it('SFC with default export', () => {
      create(import('../components/test.vue'))()
      return assertTestComponent()
    })

    it('SFC using TypeScript with default export', () => {
      create(import('../components/test-ts.vue'))()
      return assertTestComponent()
    })

    it('TypeScript .tsx component', () => {
      create(import('../components/test-tsx.tsx').then(x => x.default))()
      return assertTestComponent()
    })
  })
})

describe('Dialog function', () => {
  registerCommonHooks()

  describe('should render the dialog into the corresponding wrapper', () => {
    it('undefined', async () => {
      const instance = await testFunction().getInstance()
      expect(instance).to.equal(getDialogComponentVm(0, 0))
    })

    it(`'default'`, async () => {
      const instance = await create({
        wrapper: 'default',
        component: TestComponent
      })().getInstance()

      expect(instance).to.equal(getDialogComponentVm(0, 0))
    })

    it(`'another'`, async () => {
      const instance = await create({
        wrapper: 'another',
        component: TestComponent
      })().getInstance()

      expect(instance).to.equal(getDialogComponentVm(0, 1))
    })

    it(`'invalid'`, async () => {
      const promiseTest = generatePromiseTest(create({
        wrapper: 'invalid',
        component: TestComponent
      }))

      const { rejectSpy } = await promiseTest()
      expect(rejectSpy).to.have.been.called
    })
  })
})

describe('Dialog component', () => {
  registerCommonHooks()
  const promiseTest = generatePromiseTest(testFunction)

  it('should have injected methods and properties', async () => {
    const instance = await testFunction().getInstance()
    expect(instance.dialogId).to.be.a('number')
    expect(instance.arguments).to.be.an('array')
    expect(instance.$close).to.be.a('function')
    expect(instance.$error).to.be.a('function')
  })

  it('should resolve the dialog promise when $close is called', async () => {
    const close = () => wrapper.find('#resolve').trigger('click')
    const { resolveSpy } = await promiseTest(close)
    expect(resolveSpy).to.have.been.calledWith(symbol)
  })

  it('should reject the dialog promise romise when $error is called', async () => {
    const close = () => wrapper.find('#reject').trigger('click')
    const { rejectSpy } = await promiseTest(close)
    expect(rejectSpy).to.have.been.calledWith(symbol)
  })
})

describe('Dialog Promise', () => {
  registerCommonHooks()
  const promiseTest = generatePromiseTest(testFunction)

  it('should be returned by dialog function', () => {
    const dialog = testFunction()
    expect(dialog).to.be.a('promise')
  })

  describe('close', () => {
    it('should resolve the promise', async () => {
      const { resolveSpy } = await promiseTest(dialog => dialog.close(symbol))
      expect(resolveSpy).to.have.been.calledWith(symbol)
    })

    it('should return undefined', () => {
      const dialog = testFunction()
      expect(dialog.close()).to.be.an('undefined')
    })
  })

  describe('error', () => {
    it('should reject the promise', async () => {
      const { rejectSpy } = await promiseTest(dialog => dialog.error(symbol))
      expect(rejectSpy).to.have.been.calledWith(symbol)
    })

    it('should return undefined', () => {
      const dialog = testFunction()
      dialog.catch(noop)
      expect(dialog.error()).to.be.an('undefined')
    })
  })

  describe('getInstance', () => {
    it('should return a promise resolves with the component instance', async () => {
      const dialog = testFunction()
      const instance = await dialog.getInstance()

      expect(instance).to.be.equal(getDialogComponentVm())
      dialog.close()
    })
  })

  describe('transition', () => {
    function transitionTest (action) {
      return promiseTest(async (dialog, resolveSpy, rejectSpy) => {
        action(dialog)
        await nextTick()

        // Transition takes 100ms, but nextTick takes 20ms.
        // At this time, all spies should not be called
        expect(resolveSpy).not.to.have.been.called
        expect(rejectSpy).not.to.have.been.called
      }, symbol, true /* awaitTransition */)
    }

    it('should return a promise resolves with the same data after the transition ends', async () => {
      const { resolveSpy } = await transitionTest(dialog => dialog.close(symbol))
      expect(resolveSpy).to.have.been.calledWith(symbol)
    })

    it('should return a promise rejects with the same error after the transition ends', async () => {
      const { rejectSpy } = await transitionTest(dialog => dialog.error(symbol))
      expect(rejectSpy).to.have.been.calledWith(symbol)
    })
  })
})
