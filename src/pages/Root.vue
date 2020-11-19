<template>
  <div>
    <p>Vue Router test</p>
    <button @click="navigateTest">Test로 이동하기</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTest() {
      return this.$router.push('/test');
    },
  },
};
</script>

<style>

</style>
