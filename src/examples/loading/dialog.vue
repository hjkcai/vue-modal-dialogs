<template>
  <!-- Using the 'Loading' component of element-ui -->
  <!-- http://element.eleme.io/#/en-US/component/loading -->
  <div
    class="dialog-mask" style="background-color: rgba(255, 255, 255, 0.5)"
    v-loading="true"
    element-loading-text="Loading..."
    element-loading-background="transparent"
  ></div>
</template>
