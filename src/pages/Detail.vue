<template>
  <div>
    <p>Depth 1: {{pageNo}}번 페이지입니다</p>
    <p>this.$route.params를 통하여 동적 인자를 받아오는 연습을 위한 페이지입니다</p>
  </div>
</template>

<script>
export default {
  computed: {
    pageNo() {
      return this.$route.params.pageId;
    }
  }
}
</script>

<style>

</style>
