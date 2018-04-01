<template lang="md" functional>

  ## Message box

  A simple and nice message box! Type whatever you want in the text box below.

  Clicking on the mask or the 'OK' button closes the message box. As you can see
  in the message box's source code, both the mask and the button have the event handler
  `@click="$close"`.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: 'Message box component' }
    ]
  }
</script>
