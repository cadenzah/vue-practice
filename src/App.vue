<template>
  <div id="app">
    <navigation></navigation>
    <hr />
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
    <router-view></router-view>
    <p>이 위에는 라우팅 별 페이지가 나와야 합니다</p>
  </div>
</template>

<script>
import {
  Card,
  Navigation,
} from './components';

export default {
  components: {
    card: Card,
    navigation: Navigation,
  },
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
