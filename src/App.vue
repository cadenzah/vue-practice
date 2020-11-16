<template>
  <div id="app">
    Parent counter: {{$store.state.counter}} <br />
    <button
      @click="addCounter"
    >
      +
    </button>
    <button
      @click="subCounter"
    >
      -
    </button>
    <card
      :num="counter"
    ></card>
  </div>
</template>

<script>
import Card from './components/Card.vue';

export default {
  // data() {
  //   return {
  //     counter: 0,
  //   };
  // },
  methods: {
    addCounter() {
      this.$store.state.counter++;
    },
    subCounter() {
      this.$store.state.counter--;
    },
  },
  components: {
    card: Card,
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
