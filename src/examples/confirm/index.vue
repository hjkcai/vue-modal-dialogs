<template lang="md" functional>

  ## Returning data

  When `$close` function is called with some data,
  the data will be returned to the caller of the dialog function.
  In this example, 'Yes' yields `true`, and 'No' yields `false`.
  Clicking on the mask also yields `false`.
  This makes it super easy to control multiple dialogs with async functions.

  If you pass a valid value to the `transition-name` prop of `<dialogs-wrapper>`,
  you are able to use `.tranition()` to wait until the transition ends before
  the data is returned.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: '<Confirm> component' },
      { id: 'App', title: 'Application entry (App.vue)' }
    ]
  }
</script>
