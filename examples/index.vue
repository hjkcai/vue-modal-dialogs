<template>
  <main id="vue-modal-dialogs">
    <dialogs-wrapper tag="div" transition-name="fade" @enter="transitionEnter"></dialogs-wrapper>
    <header>
      <h1>vue-modal-dialogs</h1>
      <p style="margin: -12px 0 32px">Every dialog is just a Promise!</p>
      <p>A light-weighted Vue.js helper for developers to use dialogs easily by the advantage of Promise.</p>
      <p>Tip: Open Vue Devtool to see what is happening</p>
      <div class="github-buttons">
        <a class="github-button" href="https://github.com/hjkcai/vue-modal-dialogs" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star hjkcai/vue-modal-dialogs on GitHub">Star</a>
        <a class="github-button" href="https://github.com/hjkcai/vue-modal-dialogs/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork hjkcai/vue-modal-dialogs on GitHub">Fork</a>
      </div>
      <p>Please star 🌟 this project if you like it!</p>
      <p>Made with ❤️ by <a href="https://github.com/hjkcai">hjkcai</a></p>
    </header>
    <article>
      <message-box></message-box>
      <confirm></confirm>
      <login></login>
      <confirm-ts></confirm-ts>
    </article>
  </main>
</template>

<script>
  import Login from './sections/login'
  import Confirm from './sections/confirm'
  import ConfirmTs from './sections/confirm-ts'
  import MessageBox from './sections/message-box'

  export default {
    name: 'IndexPage',
    components: {
      Login,
      Confirm,
      ConfirmTs,
      MessageBox
    },
    methods: {
      transitionEnter () {
        console.log('`enter` event of the `transition-group` component has been fired.')
      }
    }
  }
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    max-width: 800px;
    padding: 0 16px;
    margin: 0 auto;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a, a:visited {
    color: inherit;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.33s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  header {
    padding-top: 50px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-family: Inconsolata, monospace;
      font-weight: normal;
      font-size: 40px;
    }

    p {
      margin: 8px 0;
    }

    .github-buttons {
      margin-top: 32px;
    }

    iframe + iframe {
      margin-left: 12px;
    }
  }

  section {
    margin: 80px 0;
  }

  p {
    margin: 16px 0;
    text-align: center;
  }

  h2 {
    margin: 0;
    text-align: center;
    font-weight: normal;
  }

  h3 {
    margin: 32px 0 8px;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    color: #212121;
  }

  button, input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    outline: 0;
    font-size: 14px;
    font-family: inherit;
  }

  main form {
    padding: 0 32px;
    margin: 16px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      margin-right: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .md-textfield {
    height: 36px;
    padding: 16px 0 8px 0;
    border: 0;
    border-bottom: 1px solid #9e9e9e;
    color: #212121;
    width: 350px;

    &:focus {
      padding-bottom: 7px;
      border-bottom: 2px solid #2196F3;
    }
  }

  .md-button {
    height: 36px;
    padding: 0 16px;
    border: 0;
    border-radius: 2px;
    flex-shrink: 0;
    text-transform: uppercase;
    color: white;
    background-color: #2196F3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.33);
    transition: 0.33s ease;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.33);
    }

    &:active {
      background-color: #1976D2;
    }

    &.flat {
      color: #2196F3;
      background-color: transparent;
      box-shadow: none;

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .one-button {
    margin: 16px 0;
    text-align: center;
  }

  .message-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.33);
  }

  .message-title {
    font-size: 16px;
    font-weight: bold;
  }

  .message-content {
    padding: 32px;
    border-radius: 2px;
    margin: 0 16px;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.33);
    display: block;
  }

  .confirm {
    padding-bottom: 16px;
  }

  .message-text {
    margin: 16px 0;
    font-size: 14px;
    text-align: left;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .source {
    display: block;
    text-align: center;
    text-transform: uppercase;
    color: #9e9e9e;
    font-size: 14px;

    a + a {
      margin-left: 8px;
    }
  }
</style>

