import Vue, { ComponentOptions } from 'vue'
import { VueConstructor, Vue as _Vue, ExtendedVue } from 'vue/types/vue'
export as namespace VueModalDialogs

export interface DialogPromise<ReturnType> extends Promise<ReturnType> {
  close (data: ReturnType): DialogPromise<ReturnType>
}

export declare class DialogComponent<ReturnType> extends Vue {
  /** The unique id of this dialog */
  readonly dialogId: number

  /** The arguments array passed into the dialog function */
  readonly arguments: any[]

  /** Close dialog */
  $close (data: ReturnType): DialogPromise<ReturnType>
}

interface DialogComponentConstructor<ReturnType> {
  new (): DialogComponent<ReturnType>
}

export type Component<ReturnType, PropsDef> = DialogComponentConstructor<ReturnType> |
  ComponentOptions<DialogComponent<ReturnType> & PropsDef> |
  VueConstructor

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
  (data?: Partial<PropsDef>): DialogPromise<ReturnType>
  (...args: any[]): DialogPromise<ReturnType>
}

export declare function makeDialog<
  PropsDef extends object = {},
  ReturnType = any
> (
  options: DialogOptions<ReturnType, PropsDef>
): DialogFunction<ReturnType, PropsDef>

export declare function makeDialog<
  PropsDef extends object = {},
  ReturnType = any
> (
  component: Component<ReturnType, PropsDef>
): (data?: Partial<PropsDef>) => DialogPromise<ReturnType>

export declare function makeDialog<
  Arg1 = any,
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string
): (arg1: Arg1) => DialogPromise<ReturnType>

export declare function makeDialog<
  Arg1 = any,
  Arg2 = any,
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string
): (arg1: Arg1, arg2: Arg2) => DialogPromise<ReturnType>

export declare function makeDialog<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string,
  prop3: string
): (arg1: Arg1, arg2: Arg2, arg3: Arg3) => DialogPromise<ReturnType>

export declare function makeDialog<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  Arg4 = any,
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string,
  prop3: string,
  prop4: string
): (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4) => DialogPromise<ReturnType>

export declare function makeDialog<
  Arg1 = any,
  Arg2 = any,
  Arg3 = any,
  Arg4 = any,
  Arg5 = any,
  ReturnType = any,
  PropsDef extends object = {}
> (
  component: Component<ReturnType, PropsDef>,
  prop1: string,
  prop2: string,
  prop3: string,
  prop4: string,
  prop5: string
): (arg1: Arg1, arg2: Arg2, arg3: Arg3, arg4: Arg4, arg5: Arg5) => DialogPromise<ReturnType>

export declare function makeDialog<
  PropsDef extends object = {},
  ReturnType = any
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
