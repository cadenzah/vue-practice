<template>
  <div>
    <hr />
    Child counter: {{getCounter}} <br />
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  props: ['num'],
  computed: mapGetters([
    'getCounter'
  ]),
  methods: mapMutations([
    'addCounter',
    'subCounter',
  ]),
};
</script>

<style>

</style>
