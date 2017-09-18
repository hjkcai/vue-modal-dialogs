declare module 'vue-modal-dialogs' {
  import Vue from 'vue'

  export type TransitionEventHandler = () => void

  /** A Vue component that registered as a dialog */
  export class DialogComponent<T> extends Vue {
    /** Close dialog */
    $close (data: T): void
  }

  export interface PluginOptions {
    /**
     * Mount point of the wrapper element.
     * vue-modal-dialogs automatically creates a new element if that element is not present.
     *
     * Defaults to `undefined`.
     */
    el?: HTMLElement | string,

    /**
     * Determines if shortcut functions will be added into Vue's prototype.
     *
     * Defaults to `true`.
     */
    inject?: boolean,

    /**
     * Render options of the wrapper element.
     *
     * This options is the same to VNode's render option.
     * You can pass any props/events supported by the <transition-group> element.
     * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
     */
    wrapper?: {
      class?: Object | string[],
      style?: Object,
      attrs?: Object,
      props?: {
        tag?: string,
        name?: string,
        appear?: boolean,
        css?: boolean,
        type?: string,
        moveClass?: string,
        enterClass?: string,
        leaveClass?: string,
        enterToClass?: string,
        leaveToClass?: string,
        enterActiveClass?: string,
        leaveActiveClass?: string,
        appearClass?: string,
        appearActiveClass?: string,
        appearToClass?: string
      },
      domProps?: Object,
      on?: {
        beforeEnter?: TransitionEventHandler,
        enter?: TransitionEventHandler,
        afterEnter?: TransitionEventHandler,
        beforeLeave?: TransitionEventHandler,
        leave?: TransitionEventHandler,
        afterLeave?: TransitionEventHandler,
        beforeAppear?: TransitionEventHandler,
        appear?: TransitionEventHandler,
        afterAppear?: TransitionEventHandler
      },
      nativeOn?: Object,
      directives?: Vue.VNodeDirective[],
      ref?: string
    }

    /** Options to control the `z-index` css property of each dialog */
    zIndex?: {
      /**
       * The initial value of `z-index`.
       *
       * Defaults to `1000`.
       */
      value?: number,

      /**
       * Indicates if the `z-index` auto increses
       * when a new modal dialog is shown.
       *
       * Defaults to `true`.
       */
      autoIncrement?: boolean
    }
  }

  /**
   * Options to build a dialog function
   *
   * This is almost all the same to the VNode's render options.
   * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
   */
  export interface DialogRenderOptions<T> {
    /** A Vue component that will be the 'dialog component' of a modal dialog */
    component: DialogComponent<T>,

    /** An array that maps the argument list to props */
    args: string[],

    /**
     * Indicates whether to inject dialog methods into Vue's prototype.
     * This can override the global setting
     */
    inject?: boolean,

    class?: Object | string[],
    style?: Object,
    attrs?: Object,
    props?: Object,
    domProps?: Object,
    on?: Object,
    nativeOn?: Object,
    directives?: Vue.VNodeDirective[],
    ref?: string
  }

  export interface DialogFunction<T> {
    (...args: any[]): Promise<T>
  }

  export interface ModalDialogsInstance {
    [key: string]: DialogFunction<any> | any,

    /**
     * Indicates if debug mode is turned on.
     * This results in some console warns to be shown
     */
    debug: boolean,

    /** Install `vue-modal-dialogs` into Vue */
    install (vue: Vue, options: PluginOptions): void,

    /**
     * Add a dialog function
     *
     * @param component A Vue component that will be the 'template' of a modal dialog
     * @param args An array that maps the argument list to props
     */
    add<T> (name: string, component: DialogComponent<T>, ...args: string[]): DialogFunction<T> | undefined,

    /** Add a dialog function */
    add<T> (name: string, options: DialogRenderOptions<T>): DialogFunction<T> | undefined,

    /**
     * Show a modal dialog
     *
     * @param name The name of the modal dialog
     * @param args The arguments to be passed
     * @returns Returns a promise that resolves when the modal dialog is closed
     */
    show<T> (name: string, ...args: any[]): Promise<T>
  }

  const modalDialogs: ModalDialogsInstance
  export default modalDialogs
}
