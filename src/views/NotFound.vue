<template>
  <div class="notFound d-flex justify-content-center">
    <div class="content">
      <h1 class="content-title text-center">404</h1>
      <p class="text-center fs-2">
        哦喔！看起來你走錯地方囉！
        <br>
        我應該能幫助你，讓我試試！
      </p>
      <div class="d-flex justify-content-center">
        <a href="#" class="btn btn-outline-white btn-lg me-5"
          @click.prevent="goBack">回上一頁</a>
        <routerLink to="/" class="btn btn-outline-white btn-lg">回首頁</routerLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
