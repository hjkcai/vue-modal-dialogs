<template>
  <article id="app">
    <header>
      <h1>vue-modal-dialogs</h1>
      <p style="margin: -12px 0 32px">Promisify dialogs!</p>
      <div class="github-buttons">
        <a class="github-button" href="https://github.com/hjkcai/vue-modal-dialogs" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star hjkcai/vue-modal-dialogs on GitHub">Star</a>
        <a class="github-button" href="https://github.com/hjkcai/vue-modal-dialogs/fork" data-icon="octicon-repo-forked" data-size="large" aria-label="Fork hjkcai/vue-modal-dialogs on GitHub">Fork</a>
      </div>
    </header>
    <foreword></foreword>
    <example-section id="message-box"></example-section>
    <footer>
      <p>Made with ❤️ by <a href="https://github.com/hjkcai">hjkcai</a></p>
    </footer>
  </article>
</template>

<script>
  import Foreword from './components/foreword'
  import ExampleSection from './components/example-section'

  export default {
    name: 'App',
    components: {
      Foreword,
      ExampleSection
    }
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    max-width: 800px;
    padding: 0 16px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Roboto, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
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

  h1, h2, h3 {
    margin: 16px 0;
    font-weight: 300;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
  }

  p {
    margin: 16px 0;
    font-size: 14px;
    line-height: 1.5em;
  }

  #app {
    & > header, & > footer {
      padding-top: 20px;
      text-align: center;
    }

    section {
      margin-top: 40px;
    }
  }
</style>
