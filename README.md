[中文文档](https://huajingkun.com/article/vue-modal-dialogs) | [Check demo here!](https://hjkcai.github.io/vue-modal-dialogs)

# Introduction

Dialogs are a typical and essential user interaction in interactive applications. But implementing dialogs are not an easy thing in front-end web development.

`vue-modal-dialogs` is a super light-weighted library aimed to help developers to easily use dialogs by the advantage of [Vue.js](https://vuejs.org), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

# Features

* ✅ Light weighted (~1kb min+gzip)
* ✅ Promise based
* ✅ Functional programming
* ✅ Full customizable
* ✅ Place everything you want into that dialog

Features below is *not* provided. You can achieve them by yourself:

* ❌ Pre-defined dialog style
* ❌ Shortcut function in Vue's prototype

# Installation

Install via [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) (recommended)

```bash
# Use npm
npm install vue-modal-dialogs --save

# Use yarn
yarn add vue-modal-dialogs
```

# Quick glance

```javascript
// main.js

import Vue from 'vue'
import ModalDialogs from 'vue-modal-dialogs'
import MessageComponent from 'components/message.vue'

// Initialization
Vue.use(ModalDialogs)

// Make a dialog function called 'message' with two arguments: 'title' and 'content'
const message = ModalDialogs.makeDialog(MessageComponent, 'title', 'content')

// Now you are able to call `message` with 'title' as the first argument and 'content' as the second argument. It returns a Promise so you can easily use it in an async function.
new Vue({
  template: '<button @click="removeEverything">Click Me!</button>',
  methods: {
    async removeEverything () {
      if (await message('Warning', 'Are you sure to remove everything from your computer?')) {
        // boom!
      }
    }
  }
})
```

In MessageComponent, just call `this.$close` with some data when you are done. It can be done even in component's template.

```html
<!-- MessageComponent.vue -->

<template>
  <div class="message">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
    <button @click="$close(true)">confirm</button>
    <button @click="cancel">cancel</button>
  </div>
</template>

<script>
  export default {
    methods: {
      cancel () {
        this.$close(false)
      }
    }
  }
</script>
```

That's all!

# Guide & API

## Initialization

```javascript
Vue.use(VueModalDialogs, { /* optional options */ })
```

You can have a few options here:

```typescript
interface PluginOptions {
  /**
   * Mount point of the wrapper element. All dialogs will be inside this wrapper.
   * vue-modal-dialogs automatically creates a new element if that element is not present.
   *
   * Defaults to `undefined`.
   */
  el?: HTMLElement | string,

  /**
   * Render options of the wrapper element.
   *
   * This options is the same to VNode's render option.
   * You can pass any props/events supported by the <transition-group> component.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  wrapper?: WrapperRenderOptions

  /**
   * Component options of the dialog wrapper component.
   */
  wrapperComponentOptions?: Vue.ComponentOptions<Vue>

  /**
   * Options to control the `z-index` css property of each dialog.
   * This feature guarantees that the newer dialog is always on the top of the older dialogs.
   * You can disable this feature by setting this option to `false`.
   */
  zIndex?: {
    /**
     * The initial value of `z-index`.
     *
     * Defaults to `1000`.
     */
    value?: number,

    /**
     * Indicates if the `z-index` auto increases
     * when a new modal dialog is shown.
     *
     * Defaults to `true`.
     */
    autoIncrement?: boolean
  }
}
```

## Dialog function

A dialog function is nothing but a function that returns a Promise.

Call `makeDialog` function to make a dialog function. You can call it by `ModalDialogs.makeDialogs` or import `makeDialog` function like this:

```javascript
import { makeDialog } from 'vue-modal-dialogs'
```

Here are the definitions of the `makeDialog` function:

```typescript
function makeDialog (component: VueComponent, ...props: string[]): DialogFunction
function makeDialog (options: DialogOptions): DialogFunction
```

Here are the options:

```typescript
interface DialogOptions {
  /** A Vue component that will be the 'dialog component' */
  component: DialogComponent,

  /** An array that maps the argument list to props */
  props: string[],

  /**
   * Options to render the dialog component.
   *
   * This is the same to the VNode's render options.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  render?: Vue.VNodeData
}
```

The `props` option is very important. **It maps the arguments of the dialog function to the props of the dialog component**. For example, if `props` is set to `['title', 'content']`, then you call the dialog function like this:

```javascript
dialogFunction('This is title', 'This is content', 'Extra argument')
```

The dialog component will receive these props:

```javascript
{
  title: 'This is title',       // 1st argument
  content: 'This is content',   // 2nd argument
  dialogId: 0,                  // A unique ID of current dialog
  // stores all arguments
  arguments: ['This is title', 'This is content', 'Extra argument']
}
```

Note that `makeDialog` function is a *pure function* and a *higher-order function*. It does not modify the original component but generate a new components that *extends* the original one. You can use the original component everywhere else as-is. See [https://vuejs.org/v2/api/#extends](https://vuejs.org/v2/api/#extends) for more information.

## Dialog component

Dialog components will be shown later when you call the dialog function. Here you need to decide how your dialog looks like.

Typically there are some arguments passed into the dialog function. They can be easily retrieved from props. These props will be defined *automatically*. If you want to [validate these props](https://vuejs.org/v2/guide/components#Prop-Validation), just define them by yourself with some validation.

```javascript
export default {
  // Here are two dialog arguments. You can use these props as normal props.
  // In fact, vue-modal-dialogs has already defined these props for you.
  // You may not define these props unless you want to do some validation.
  props: {
    title: String,
    content: String
  },
  ...
}
```

Additionally, two props will always be available in every dialog component:

1. `arguments`: This is an array containing everything you passed in the dialog function.
2. `dialogId`: A unique ID of current dialog. This is an internal data of `vue-modal-dialogs`.

A `$close` method will be added into this component automatically. Call this method with data when you are done (e.g. user pressing the OK button). It will close the current dialog component and resolve the previous created Promise.

```javascript
this.$close(data)       // data is optional
```

You can make several dialog components and then use them for making dialog functions.

# Contribution

Issues and PRs are welcomed!

## Run development server

```bash
# use npm
npm run dev

# use yarn
yarn dev
```

## Build production version

```bash
# use npm
npm run build

# use yarn
yarn build
```
