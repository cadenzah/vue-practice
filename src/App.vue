<template>
  <div id="app">
    <card :message="message"></card>
    {{ message }}
  </div>
</template>

<script>
import Card from './components/Card.vue';

export default {
  data() {
    return {
      message: 'Hello, world!',
    };
  },
  components: {
    Card: Card,
  },
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sanf-serif;
  color: blue;
}
</style>
