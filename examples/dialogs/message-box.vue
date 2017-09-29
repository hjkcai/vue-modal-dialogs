<template>
  <div class="message-wrapper" @click.self="$close()">
    <div class="message-content">{{ content }}</div>
  </div>
</template>
