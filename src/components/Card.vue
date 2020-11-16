<template>
  <div>
    우와! 이것이 새로운 카드이다. 그 상대는~ {{message}}
    <button @click="onButtonClick">증가증가</button>
    <p @customclick="onCustomClick">으으음?</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
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
