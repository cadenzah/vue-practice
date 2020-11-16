<template>
  <div id="app">
    Parent counter: {{parentCounter}} <br />
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
    <card></card>
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
  computed: {
    parentCounter: function() {
      return this.$store.getters.getCounter;
    },
  },
  methods: {
    addCounter() {
      // this.$store.mutations.addCounter(); // Invalid
      this.$store.commit('addCounter'); 
    },
    subCounter() {
      this.$store.state.counter--; // okay, but not preferred
    },
  },
  components: {
    card: Card,
  },
  created: function() {
    console.log(this)
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sanf-serif;
  color: blue;
}
</style>
