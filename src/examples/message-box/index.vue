<template lang="md" functional>

## Quick start

Before creating any dialog, you need to install vue-modal-dialogs as a plugin,
and then put `<dialogs-wrapper>` component to the end of `App.vue`.

The `create` function converts a Vue component to a 'dialog function'.
You can define props in the `create` function as the arguments-to-props map.
In this case, you can omit the props definition in that component.
Calling the dialog function will show the dialog component.

Here is a simple and nice message box.
Clicking on the mask or the 'OK' button closes the message box. As you can see
in the message box's source code, both the mask and the button have the event handler
`@click="$close"`.

</template>

<script>
  export default {
    sources: [
      { id: 'dialog', title: '<MessageBox> component' },
      { id: 'main.js', title: 'Application entry (main.js)' },
      { id: 'App', title: 'Application entry (App.vue)' }
    ]
  }
</script>
