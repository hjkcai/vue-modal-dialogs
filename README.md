[Guide & Demo](https://hjkcai.github.io/vue-modal-dialogs) |
[2.x docs](https://github.com/hjkcai/vue-modal-dialogs/blob/62eadbb4683d4b4f3bfdbb783a7eb0aab9363174/README.md) |
[1.x docs](https://github.com/hjkcai/vue-modal-dialogs/blob/c0fcd99961f2cc118c2fbadc73efc4e384ab2593/README.md)

# Introduction

**Promisify dialogs!**

A typical and essential type of user interaction is dialogs. Dialogs are somehow similar to Promise. A dialog will eventually close. A Promise will eventually resolve. A dialog returns some data when it closes. So does Promise. It is time to put them together.

vue-modal-dialogs has the magic to turn dialogs into Promises. Developers can build and control dialogs a lot easier in Vue.js applications. Especially in some complicated situations like controlling multiple dialogs, nested dialogs, etc.

Feel free to open an issue or PR if you have any questions, problems, or new ideas.

# Installation

Install via [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)

```bash
# Use npm
npm install vue-modal-dialogs --save

# Use yarn
yarn add vue-modal-dialogs
```

Then import and install vue-modal-dialogs as a Vue plugin:

```javascript
import * as ModalDialogs from 'vue-modal-dialogs'
Vue.use(ModalDialogs)               // No options
```

# Guide & Demo

[Guide & demo is here!](https://hjkcai.github.io/vue-modal-dialogs)

# API

## ModalDialogs.create

`ModalDialogs.create` creates a dialog function.
A dialog function is nothing but a function that returns a dialog promise.
The dialog function's arguments depends on the options you passed in the
`ModalDialogs.create` function.

### Declaration

```typescript
function create (component: VueComponent, ...props: string[]): DialogFunction
function create (options: DialogOptions): DialogFunction
```

### Options

#### `component: VueConstructor | Promise<VueConstructor>`

The `component` option is the Vue component constructor for the dialog component.
It can be a Promise resolves with a Vue component constructor for supporting
async component.

#### `props: string[]`

The `props` option maps the arguments of the dialog function to the properties of
the dialog component. For example, if you call the dialog function like this:

```javascript
// The props option is ['title', 'content']
const dialogFunction = create(SomeComponent, 'title', 'content')
dialogFunction('This is title', 'This is content', 'Extra argument')
```

The dialog component will receive these properties:

```javascript
{
  title: 'This is title',       // 1st argument
  content: 'This is content',   // 2nd argument

  // Stores all arguments
  arguments: ['This is title', 'This is content', 'Extra argument']
}
```

If you just leave the `props` option empty, the dialog function's first argument
will become a 'data object' stores all the properties to pass into
the dialog component.

```javascript
// The props option is [] (an empty array)
const dialogFunction = create(SomeComponent)
dialogFunction({
  title: 'This is title',
  content: 'This is content'
}, 'Extra argument')
```

The dialog component will receive these properties:

```javascript
{
  title: 'This is title',       // Data from the first argument
  content: 'This is content',

  // Stores all arguments
  arguments: [{ title: 'This is title', content: 'This is content'}, 'Extra argument']
}
```

This is useful when you have lots of properties.
It is better to use an object instead of a long list of arguments.
**Remember to define all the properties in the dialog component**!
Otherwise no property will be received.

#### `wrapper: string`

The `wrapper` option specifies which dialogs wrapper to render the dialog component.
The default value is `'default'`. In most cases you do not need to set this option.

The dialog promise will *reject* when the specified wrapper is not found.

## &lt;dialogs-wrapper> component

A dialogs wrapper is nothing but a slightly modified `<transition-group>` component.

`<dialogs-wrapper>` component should be placed into the root component of your
project (typically `App.vue`), in order to make sure the component will never be
destroied.

It have two main properties:

1. `name`: The name of the wrapper. It *MUST* be unique throughout the project.
    The default value is `default`.

2. `transition-name`: Alias to the `name` property of the `<transition-group>`
    component.

Everything other than these two properties, including event listeners,
will be directly passed into the underlying `<transition-group>` component.
You are free to use full-featured `<transition-group>` component.

You can create multiply wrappers at the same time. Dialogs will go into the
wrapper you specifies when calling `create` function (see the following section).
Usually one wrapper with a default name is enough for most cases.

## Dialog component

Dialog components will be rendered into the dialogs wrapper when you call the dialog function.

### Optional property definitions

Property definitions are *optional* since you have defined them in
`ModalDialogs.create`, unless you want to [validate these properties](https://vuejs.org/v2/guide/components#Prop-Validation).
Just define them inside the dialog component like other components.

However, if you would like to use data objects to pass properties,
you *must* manually define all props in the dialog component.

### Injections

There are some additional properties and methods available in the dialog component:

1. `$close()`: A 'callback'. Call this method when it is time to close the dialog,
    with the data you want to send back. It will resolve the dialog promise.
2. `$error()`: It is the same to `$close` but it rejects the Promise.
3. `arguments`: An array contains everything you passed in the dialog function.

## Dialog promise

A dialog promise is a promise with some additional methods for controlling the
dialog outside.

1. `close()`, `error()`: The same to the `$close()` and `$error()` in the dialog
    component.
2. `transition()`: Returns a promise that resolves after the dialog's transition
    with the same value as the dialog promise.
3. `getInstance()`: Returns a promise that resolves with the dialog component
    instance.

# Integrate with TypeScript

vue-modal-dialogs have *partial* support for TypeScript.
Vue.js 2.5 or above is *required* if you are using TypeScript.

## ModalDialogs.create

Specify argument types and the return type through generic:

```typescript
import SomeComponent from './comp.vue'

interface ConfirmData {
  title: string,
  content: string
}

// (prop1: string, prop2: string) => Promise<any>
create<string, string>(SomeComponent, 'title', 'content')

// (prop1: string, prop2: string) => Promise<boolean>
create<string, string, boolean>(SomeComponent, 'title', 'content')

// (data: ConfirmData) => Promise<any>
create<ConfirmData>(SomeComponent)

// (data: ConfirmData) => Promise<boolean>
create<ConfirmData, boolean>(SomeComponent)
```

## Dialog component

Dialog components can be defined by extending the base class
`DialogComponent<ReturnType>` with the help of
[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator).

The `ReturnType` generic argument indicates the type that the promise resolves.
TypeScript can infer this generic argument in `ModalDialogs.create`.

```tsx
import { Prop, Component } from 'vue-property-decorator'
import { create, DialogComponent } from 'vue-modal-dialogs'

@Component
export default class SomeComponent extends DialogComponent<boolean> {
  @Prop() title: string
  @Prop() content: string

  ok () {
    this.$close(true)
  }

  render (h) {
    // ...
  }
}

// (data: ConfirmData) => Promise<boolean>
create<ConfirmData>(SomeComponent)
```



# Migration

## from 2.x

1. `makeDialog` is renamed to `create`.
2. The `dialogId` property is removed and kept internally. You might need to
    find another way to implement your requirement without `dialogId`.

## from 1.x

Here are two major breaking changes:

1. An HTML element is inserted into the DOM automatically in 1.x.
    Then I create a new root Vue instance on it. This causes critical problem
    when using vue-modal-dialogs with vuex, vue-i18n, etc.

    Remove all options in `Vue.use(ModalDialogs, ...)` and
    add a `<dialogs-wrapper>` component into the root component, typically `App.vue`,
    of your project.

2. CSS z-index control are completely removed. If you need to control it,
    do it yourself. The `dialogId` prop can be used as an auto-increment z-index
    value. Bind it to your dialog component.
