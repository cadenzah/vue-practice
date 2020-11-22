<template>
  <div class="user">
    <p>Depth 1: 사용자 상세 페이지</p>
    <p>this.$route.params를 통하여 동적 인자를 받아오는 연습을 위한 페이지입니다</p>
    <router-view></router-view>
    <p>이 위에는 사용자 아이디를 받아서 상세 정보를 보여주게 됩니다</p>
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

<style scoped>
.user {
  background-color: skyblue;
}
</style>
