# Introduction

Dialogs are a typical and essential user interaction in interactive applications. But implementing dialogs are not an easy thing in front-end web development.

This project is aimed to help developers to easily use dialogs by the advantage of [Vue.js](https://vuejs.org), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

[Basic example](https://hjkcai.github.io/vue-modal-dialogs/basic) | [ElementUI example](https://hjkcai.github.io/vue-modal-dialogs/element-ui)

# Quick glance

```javascript
import Vue from 'vue'
import VueModalDialogs from 'vue-modal-dialogs'
import MessageComponent from 'components/message.vue'

// Initialization
Vue.use(VueModalDialogs)

// Make a dialog function 'message' with two arguments: 'title' and 'content'
VueModalDialogs.add('message', MessageComponent, 'title', 'content')
```

Now you can call this dialog function by '$&lt;name>' in other components with 'title' as the first argument and 'content' as the second argument. It returns a Promise so you can easily use it in an async function.

```javascript
{
  methods: {
    async removeEverything () {
      if (await this.$message('Warning', 'Are you sure to remove everything from your computer?')) {
        // boom!
      }
    }
  }
}
```

In MessageComponent just call `this.$close` with some data when you are done. It can be done even in component's template.

```html
<button @click="$close(true)">confirm</button>
```

# Guide

## Import `vue-modal-dialogs`

You can install `vue-modal-dialogs` in 2 ways:

1. Download [`dist/vue-modal-dialogs.js`](https://github.com/hjkcai/vue-modal-dialogs/blob/master/dist/vue-modal-dialogs.js) and copy it into your project. And then import it via `script` tag.

    ```html
    <script type="text/javascript" src="/path/to/vue-modal-dialogs.js"></script>
    ```

2. Install via [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) (recommended)

    ```bash
    # Use npm
    npm install vue-modal-dialogs --save

    # Use yarn
    yarn add vue-modal-dialogs
    ```

    Then import it like this:

    ```javascript
    import VueModalDialogs from 'vue-modal-dialogs'
    ```

## Initialization

```javascript
Vue.use(VueModalDialogs, { /* optional options */ })
```

You can have a few options here:

```typescript
{
  /**
   * Mount point of the wrapper element.
   * vue-modal-dialogs automatically creates a new element if that element is not present.
   *
   * Defaults to `undefined`.
   */
  el: HTMLElement | string,

  /**
   * Determines if shortcut functions will be added into Vue's prototype.
   *
   * Defaults to `true`.
   */
  inject: boolean,

  /**
   * Render options of the wrapper element.
   *
   * This options is the same to VNode's render option.
   * You can pass any props/events supported by the <transition-group> element.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  wrapper: {}

  /** Options to control the `z-index` css property of each dialog */
  zIndex: {
    /**
     * The initial value of `z-index`.
     *
     * Defaults to `1000`.
     */
    value: number,

    /**
     * Indicates if the `z-index` auto increses
     * when a new modal dialog is shown.
     *
     * Defaults to `true`.
     */
    autoIncrement: boolean
  }
}
```

A `$dialog` property will be installed into Vue's prototype after initialization. You can access all these functions below through `this.$dialog` in any component.

## Make a dialog component

This component will be shown later when you call the dialog function. Here you need to decide how your dialog looks like. You just need to add props to this component and then dialog arguments can be retrieved from props.

```javascript
export default {
  // Here are two dialog arguments. You can use these props as normal props.
  props: ['title', 'content'],
  ...
}
```

A `$close` method will be added into this component automatically. Call this method with data when you are done (e.g. user pressing the OK button). It will close the current dialog component and resolve the previous created Promise.

```javascript
this.$close(data)       // data is optional
```

You can make several dialog components and then use them for making dialog functions.

## Make a dialog function

Call `VueModalDialogs.add` function to make a dialog function. A dialog function is nothing but a function that returns a Promise.

Here are the signature of this function:

```typescript
function add (name: string, component: VueComponent, ...args: string[]): DialogFunction
function add (name: string, options: DialogRenderOptions): DialogFunction
```

Here are the options:

```typescript
{
  /** A Vue component that will be the 'dialog component' of a modal dialog */
  component: VueComponent,

  /** An array that maps the argument list to props */
  args: string[],

  /**
   * Indicates whether to inject dialog methods into Vue's prototype.
   * This can override the global setting
   */
  inject?: boolean,
}
```

The `name` argument must be identical between all dialog functions you added.

The `args` option is very important. **It maps the arguments of the dialog function to the props of the dialog component**. For example, if `args` is set to `['title', 'content']`, then you call the dialog function like this:

```javascript
dialogFunction('This is title', 'This is content')
```

The dialog component will receive these props:

```javascript
{
  title: 'This is title',       // 1st argument
  content: 'This is content',   // 2nd argument
  args: ['This is title', 'This is content']      // store all arguments (it will always be there)
}
```

If you define props in the dialog component correctly, you can access these props via `this.title` and `this.content` **just the same as the normal props**.

The `VueModalDialogs.add` function returns a dialog function so you can store and call it later. It also creates a entry in `this.$dialogs` with the same name. If `inject` options is truthy, the dialog function will be injected into Vue's prototype as `$<name>`.

```javascript
const showMessage = VueModalDialogs.add('message', MessageComponen, 'content')

// Use returned dialog function
showMessage('some message')

// Use this.$dialogs in a Vue component
this.$dialogs.message('some message')

// Use this.$<name> in a Vue component (if inject options is truthy)
this.$message('some message')
```

# Development

Issues and PRs are welcomed!

## Run development server

```bash
# use npm
npm run dev

# use yarn
yarn dev
```

## Build production version

You need Node.js 7.6.0+ to build the production version (because I have used async function in the build script 😊)

```bash
# use npm
npm run build

# use yarn
yarn build
```
