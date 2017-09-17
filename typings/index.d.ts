declare module 'vue-modal-dialogs' {
  import Vue from 'vue'

  namespace VueModalDialogs {

    export type TransitionEventHandler = () => void

    /** A Vue component that registered as a dialog */
    export class DialogComponent<T> extends Vue {
      /** Close dialog */
      $close (data: T): void
    }

    export interface PluginOptions {
      /**
       * Mount element of the wrapper element
       */
      el?: HTMLElement | string,

      /**
       * Determines if shortcut functions will be added into Vue's prototype
       */
      inject?: boolean,

      /**
       * Render options of the wrapper element.
       *
       * This options is the same to VNode's render option.
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

      /**
       * Options of controlling `z-index` css property of each dialog
       */
      zIndex?: {
        /**
         * The initial value of `z-index`.
         * The default value is `1000`
         */
        value?: number,

        /**
         * Indicates if the `z-index` auto increses
         * when a new modal dialog is shown.
         * The default value is `true`
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
      /** A Vue component that will be the 'template' of a modal dialog */
      component: DialogComponent<T>,

      /** An array that maps the argument list to props */
      args: string[],

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

    /**
     * Indicates if debug mode is turned on.
     * This results in some console warns to be shown
     */
    export var debug: boolean

    /** Install `vue-modal-dialogs` into Vue */
    export function install (vue: Vue, options: PluginOptions): void

    /**
     * Add a dialog function
     *
     * @param component A Vue component that will be the 'template' of a modal dialog
     * @param args An array that maps the argument list to props
     */
    export function add<T> (name: string, component: DialogComponent<T>, ...args: string[]): void

    /** Add a dialog function */
    export function add<T> (name: string, options: DialogRenderOptions<T>): void

    /**
     * Show a modal dialog
     *
     * @param name The name of the modal dialog
     * @param args The arguments to be passed
     * @returns Returns a promise that resolves when the modal dialog is closed
     */
    export function show<T> (name: string, ...args: any[]): Promise<T>
  }

  export = VueModalDialogs
}
