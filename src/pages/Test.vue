<template>
  <div>
    <p>Test 페이지</p>
    <button @click="navigatePrev">뒤로가기!</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigatePrev() {
      this.$router.go(-1);
    },
  },
}
</script>

<style>

</style>
