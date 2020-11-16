<template>
  <div>
    <hr />
    Child counter: {{$store.state.counter}} <br />
    <button>+</button>
    <button>-</button>
  </div>
</template>

<script>
export default {
  props: ['num'],
  methods: {
    onButtonClick: function(e) {
      this.$emit('customclick', e);
    },
    onCustomClick: function() {
      alert('Card')
    }
  },
}
</script>

<style>

</style>
