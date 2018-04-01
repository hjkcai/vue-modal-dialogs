<template>
  <article id="app">
    <the-header></the-header>
    <foreword></foreword>
    <example-section id="message-box"></example-section>
    <example-section id="confirm"></example-section>
    <example-section id="complex-confirm"></example-section>
    <the-footer></the-footer>
    <dialogs-wrapper tag="div" transition-name="fade"></dialogs-wrapper>
  </article>
</template>

<script>
  import Foreword from './components/foreword'
  import TheHeader from './components/the-header'
  import TheFooter from './components/the-footer'
  import ExampleSection from './components/example-section'

  export default {
    name: 'App',
    components: {
      Foreword,
      TheHeader,
      TheFooter,
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
