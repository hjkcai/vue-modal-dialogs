[Check demo here!](https://hjkcai.github.io/vue-modal-dialogs) |
[1.x docs](https://github.com/hjkcai/vue-modal-dialogs/blob/c0fcd99961f2cc118c2fbadc73efc4e384ab2593/README.md)

# Introduction

**Promisify dialogs! Every dialog is just a promise!**

Dialogs are a typical and essential user interaction in interactive applications.
But implementing dialogs are not an easy thing in front-end web development.

`vue-modal-dialogs` is a super light-weighted library aimed to
help developers to easily use dialogs by the advantage of [Vue.js](https://vuejs.org),
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and
[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

Feel free to open an issue or PR if you have any questions, problems, or new ideas.

# Features

* ✅ Light weighted (~2kb min+gzip)
* ✅ Promise based
* ✅ Functional programming
* ✅ Full customizable
* ✅ Place everything you want into that dialog

Features below is *not* provided. You can achieve them by yourself:

* ❌ Pre-defined dialog style
* ❌ Shortcut function in Vue's prototype
* ❌ Lock the scroll bar
* ❌ Anything but promisify dialogs

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

// Now you are able to call `message` with 'title' as the first argument,
// and 'content' as the second argument.
// It returns a Promise so you can easily use it in an async function.
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

In MessageComponent, just call `this.$close` with some data when you are done.
It can be done even in component's template.

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

Firstly install `ModalDialogs` as a plugin into Vue.

```javascript
Vue.use(ModalDialogs)               // No options
```

Then add a `<dialogs-wrapper>` component into the root component of your project
(typically `App.vue`). See details below.

## Dialogs wrapper

A dialogs wrapper is nothing but a slightly modified `<transition-group>` component.

There are two props:

1. `name`: The name of the wrapper. The name must be unique throughout the entire project.
    The default value is `default`.

2. `transition-name`: Alias to the `name` prop of the `<transition-group>` component.

Everything other than these two props, including event listeners,
will be directly passed into the underlying `<transition-group>` component.
You are free to use full-featured `<transition-group>` component.

I strongly recommend that put the wrapper in the root component of your project
(typically `App.vue`). Because, in this case, the wrapper component will never be re-created.
Otherwise there may be wired behaviors of the dialogs.

You can create multiply wrappers at the same time.
Dialogs will go into the wrapper you specifies when calling `makeDialog` function
(see the following section). Usually one wrapper with a default name is enough for most cases.

## Dialog function

A dialog function is nothing but a function that returns a Promise.

Call `makeDialog` function to make a dialog function.
You can call it by `ModalDialogs.makeDialogs` or import `makeDialog` function like this:

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
  props: string[]

  /** The wrapper that the dialog will be added into */
  wrapper: string
}
```

### `component`

The `component` option is the place where to pass your dialog component into.

### `props`

**The `props` option maps the arguments of the dialog function to the props of the dialog component**.
For example, if you call the dialog function like this:

```javascript
// The props option is ['title', 'content']
const dialogFunction = makeDialog(SomeComponent, 'title', 'content')
dialogFunction('This is title', 'This is content', 'Extra argument')
```

The dialog component will receive these props:

```javascript
{
  title: 'This is title',       // 1st argument
  content: 'This is content',   // 2nd argument
  dialogId: 0,                  // A unique ID of current dialog

  // Stores all arguments
  arguments: ['This is title', 'This is content', 'Extra argument']
}
```

If you just leave the `props` option **an empty array**, the dialog function can
still pass props into dialog components. In this case it will not map the arguments.
It retrieves the first argument as `propsData`, in another word, a 'data object',
if the first argument is an object. For example:

```javascript
// The props option is [] (an empty array)
const dialogFunction = makeDialog(SomeComponent)
dialogFunction({
  title: 'This is title',
  content: 'This is content'
}, 'Extra argument')
```

The dialog component will receive these props:

```javascript
{
  title: 'This is title',       // Data from the first argument
  content: 'This is content',
  dialogId: 0,                  // A unique ID of current dialog

  // Stores all arguments
  arguments: [{ title: 'This is title', content: 'This is content'}, 'Extra argument']
}
```

This is useful when you have lots of props to pass into the dialog component.
It is better to use an object instead of a long list of arguments.
If you want to pass props in this way,
**remember to define props in the dialog component**!

The first argument will be treated as the data object
**only when `props` option is empty**! If you want to mix those two usages,
do it yourself.

### `wrapper`

The `wrapper` option specifies which dialogs wrapper to put the dialog component into.
The default value is `default` (it is the same to the default value of the `name` prop
of the dialogs wrapper component). In most cases you do not need to set this option.

Note that `makeDialog` function is a *pure function* and a *higher-order function*.
It does not modify the original component but generate a new components that
*extends* the original one. You can use the original component everywhere else as-is.
See [https://vuejs.org/v2/api/#extends](https://vuejs.org/v2/api/#extends) for more information.

## Dialog component

Dialog components will be shown later when you call the dialog function.
Here you need to decide how your dialog looks like.

Typically there are some arguments passed into the dialog function.
They can be easily retrieved from props. These props will be defined *automatically*.
If you want to [validate these props](https://vuejs.org/v2/guide/components#Prop-Validation),
just define them by yourself with some validation.

However, if you would like to use data objects to pass props,
**you need to manually define all props** in the component.
Otherwise the data will be *never* received in the component.

```javascript
export default {
  props: {
    title: String,
    content: String
  },
  ...
}
```

Additionally, one method and two props will always be available in every dialog component.
You can always omit the declaration of them:

1. `$close`: A 'callback'. Call this method when you are done (e.g. user pressing the OK button),
    with the data you want to send back. It will close the current dialog component,
    and resolve the previous created Promise.

    ```javascript
    this.$close(data)       // data is optional
    ```

2. `arguments`: This is an array containing everything you passed in the dialog function.
    See examples in the previous section.

3. `dialogId`: A unique ID of current dialog. This is an internal data of `vue-modal-dialogs`.
    This might be useful when you need an auto-increment index.

The same component can be used many many times for creating dialog functions,
since the component will *never* be modified.

## TypeScript

vue-modal-dialogs have *partial* support for TypeScript.
If you want to use TypeScript, you must use Vue 2.5 or above.
And [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
are recommended.

Dialog components can be defined by extending the base class `DialogComponent<ReturnType>`:

```typescript
import { DialogComponent } from 'vue-modal-dialogs'
import { Prop, Component } from 'vue-property-decorator'

@Component({})
export default class SomeComponent extends DialogComponent<boolean> {
  @Prop() title: string
  @Prop() content: string

  ok () {
    this.$close(true)
  }

  render (h) {
    return (
      <div onClick={ this.ok }>
        <div>{ this.title }</div>
        <div>{ this.content }</div>
      </div>
    )
  }
}
```

Argument types of the dialog function is unknown.
Manually specify via the `makeDialog` generic:

```typescript
// returns (prop1: string, prop2: string) => Promise<boolean>
makeDialog<string, string>(SomeComponent, 'title', 'content')
```

If you want to use 'data object' as the first argument, you need to define
what to pass into the dialog function by using object type definitions or interfaces.

```typescript
interface ConfirmData {
  title: string,
  content: string
}

// returns (data: ConfirmData) => Promise<boolean>
makeDialog<ConfirmData>(SomeComponent)

// returns (data: { title: string, content: string }) => Promise<boolean>
makeDialog<{ title: string, content: string }>(SomeComponent)
```

Unfortunately, if `SomeComponent` is defined in a `.vue` file, the type of
`SomeComponent` will be `VueConstructor` instead of `DialogComponent<boolean>`.
This results in unknown return type of the dialog function (it becomes to `any`).
You have to annotate it yourself:

```typescript
import SomeComponent from './comp.vue'

// returns (prop1: string, prop2: string) => Promise<any>
makeDialog<string, string>(SomeComponent, 'title', 'content')

// returns (prop1: string, prop2: string) => Promise<boolean>
makeDialog<string, string, boolean>(SomeComponent, 'title', 'content')

// returns (data: ConfirmData) => Promise<any>
makeDialog<ConfirmData>(SomeComponent)

// returns (data: ConfirmData) => Promise<boolean>
makeDialog<ConfirmData, boolean>(SomeComponent)
```

# Contribution

## Run development server

Run example in development mode:

```bash
# use npm
npm run dev

# use yarn
yarn dev
```

## Build production version

The built file will be generated in the `dist` folder.

```bash
# use npm
npm run build

# use yarn
yarn build
```
