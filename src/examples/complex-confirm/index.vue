<template lang="md" functional>

  ## Using data object

  When the dialog is getting complex, you might get a super long argument list.
  Using an data object in this situation is more appropriate. In this case you
  *MUST* define the dialog's props in the dialog component.

  Note that you can always define props just like before, whether you use the
  data object feature or not, to get the benifits of props validation,
  default value, etc.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: '<ComplexConfirm> component' }
    ]
  }
</script>
