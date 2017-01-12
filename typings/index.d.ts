declare module 'vue-modal-dialogs' {
  import Vue from 'vue'

  namespace VueModalDialogs {

    export type TransitionEventHandler = () => void

    export interface WrapperOptions {
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
       * This options is the same as VNode's class option.
       * See https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth
       */
      wrapper?: {
        class?: Object | string[],
        style?: Object,
        attrs?: Object,
        props: {
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
        domProps: Object,
        on: {
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
        nativeOn: Object,
        directives: Vue.VNodeDirective[],
        ref: string
      }

      /**
       * Options of controlling `z-index` css property
       */
      zIndex?: {
        /**
         * The initial value of `z-index`.
         * The default value is `1000`
         */
        value: number,

        /**
         * Indicates if the `z-index` auto increses
         * when a new modal dialog is shown.
         * The default value is `true`
         */
        autoIncrement: boolean
      }
    }

    /**
     * Options to build a modal function
     *
     * @export
     * @interface ModalOptions
     */
    export interface ModalOptions {
      /**
       * A Vue component that will be the 'template'
       * of a modal dialog
       *
       * @type {Vue.Component}
       * @memberOf ModalOptions
       */
      component: Vue.Component,

      props: {}
    }

    /**
     * Indicates if debug mode is turned on.
     * This results in some console warns to be shown
     *
     * @export
     */
    export var debug: boolean

    /**
     * Install vue-modal into Vue
     *
     * @export
     */
    export function install (vue: Vue, options: WrapperOptions): void

    /**
     * Add a modal function into Vue.prototype
     * so that you can access this function
     * via `this.$<name>` from a Vue component
     *
     * @export
     */
    export function use (name: string, options: ModalOptions): void

    /**
     * Show a modal dialog
     *
     * @export
     * @param name The name of the modal dialog
     * @param args The arguments to be passed
     * @returns {Promise<any>} Returns a promise that resolves when the modal dialog is closed
     */
    export function show (name: string, ...args: any[]): Promise<any>
  }

  export = VueModalDialogs
}
