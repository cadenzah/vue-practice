<template>
  <div class="user-detail">
    <p>Depth 2: {{userId}} 님의 정보 페이지입니다</p>
    <button @click="navigatePrev">뒤로가기!</button>
  </div>
</template>

<script>
export default {
  computed: {
    userId() {
      return this.$route.params.userId;
    },
  },
  methods: {
    navigatePrev() {
      return this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.user-detail {
  background-color: darkorange;
}
</style>
