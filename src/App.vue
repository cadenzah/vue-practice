<template>
  <div id="app">
    <card
      :message="message"
      @customclick="customClick"
    ></card>
    <p >{{ count }}</p>
  </div>
</template>

<script>
import Card from './components/Card.vue';

export default {
  data() {
    return {
      message: 'Hello, world!',
      count: 0,
    };
  },
  methods: {
    customClick: function() {
      // alert('customclick')
      this.count++;
    },
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
