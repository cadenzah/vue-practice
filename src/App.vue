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
    <card class="card-slot">
      <template v-slot:default="slotProps">
        <p>Slot을 사용하면, 컴포넌트의 재사용성이 높아집니다! 예!</p>
        <p>제어의 역전(Inversion of Control)에 대하여 생각해보기</p>
        <p>Slot도 props를 사용할 수 있다는 사실! {{slotProps.second_message}}</p>
      </template>
    </card>
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
  mounted: function() {
    // console.log(this)
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: 'Roboto', sanf-serif;
  color: blue;
}

.card-slot {
  background-color: aquamarine;
}
</style>
