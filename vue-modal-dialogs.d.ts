import Vue, { ComponentOptions } from 'vue'
import { VueConstructor, Vue as _Vue, ExtendedVue } from 'vue/types/vue'
export as namespace VueModalDialogs

export interface DialogPromise<ReturnType> extends Promise<ReturnType> {
  close (data: ReturnType): DialogPromise<ReturnType>
}

export interface DialogComponent<ReturnType> extends Vue {
  /** The unique id of this dialog */
  readonly dialogId: number

  /** The arguments array passed into the dialog function */
  readonly arguments: any[]

  /** Close dialog */
  $close (data: ReturnType): void
}

export type Component<ReturnType, PropsDef> = ComponentOptions<DialogComponent<ReturnType> & PropsDef> | VueConstructor

/** Options to build a dialog function */
export interface DialogOptions<ReturnType, PropsDef> {
  /** A Vue component that will be the 'dialog component' */
  component: Component<ReturnType, PropsDef>,

  /** An array that maps the argument list to props */
  props: string[],

  /** The wrapper that the dialog will be added into */
  wrapper: string[]
}

interface DialogFunction<ReturnType = any, PropsDef extends object = {}> {
  (...args: any[]): DialogPromise<ReturnType>
  (data?: PropsDef): DialogPromise<ReturnType>
}

export declare function makeDialog<
  ReturnType = any,
  PropsDef extends object = {}
> (
  options: DialogOptions<ReturnType, PropsDef>
): DialogFunction<ReturnType, PropsDef>

export declare function makeDialog<
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>
): (data?: PropsDef) => DialogPromise<ReturnType>

export declare function makeDialog<
  ReturnType = any,
  Arg1 = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string
): (arg1: Arg1) => DialogPromise<ReturnType>

export declare function makeDialog<
  ReturnType = any,
  Arg1 = any,
  Arg2 = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string
): (arg1: Arg1, arg2: Arg2) => DialogPromise<ReturnType>

export declare function makeDialog<
  ReturnType = any,
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string,
  prop3: string
): (arg1: Arg1, arg2: Arg2, arg3: Arg3) => DialogPromise<ReturnType>

export declare function makeDialog<
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  ...props: string[]
): DialogFunction<ReturnType, PropsDef>

/** Dialogs wrapper component */
export declare const DialogsWrapper: ExtendedVue<Vue, {}, {}, {}, {}>

export interface ModalDialogsInstance {
  /** Install `vue-modal-dialogs` into Vue */
  install (vue: typeof _Vue): void
}

declare const modalDialogs: ModalDialogsInstance
export default modalDialogs
