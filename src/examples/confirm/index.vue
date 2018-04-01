<template lang="md" functional>

  ## Confirmation

  When `$close` function is called with some data,
  the data will be returned to the caller of the dialog function.

  In this example, 'Yes' yields `true`, and 'No' yields `false`.
  Clicking on the mask also yields `false`.

  It is super easy to control multiple dialogs with async functions.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: '<Confirm> component' }
    ]
  }
</script>
