<template lang="md" functional>

  ## Controlling the dialog

  Dialogs are rendered into `<dialogs-wrapper>`. You can have more than one
  `<dialogs-wrapper>` with a different name. And then decide which wrapper to
  render into when creating dialog functions. All dialogs will get into the
  `default` wrapper (or the wrapper without a name) in default.

  vue-modal-dialogs provides several ways to control the dialog outside the
  dialog component. These helper methods are injected into the Promise returned
  by the dialog function. Check the API reference for the full list of helper methods.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: '<Loading> component' },
      { id: 'App', title: 'Application entry (App.vue)' }
    ]
  }
</script>
