<template>
  <main class="main-footer-bottom p-3">
    <div class="container bg-white mb-5">
      <div class="d-flex flex-column align-items-center justify-content-center p-5">
        <h3 class="fs-1 mb-5">
          <i class="bi bi-x-circle-fill text-danger"></i>
          交易失敗！
        </h3>
        <p class="fs-5">請稍後再重新嘗試</p>
        <RouterLink class="btn btn-secondary" to="/">返回首頁</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    localStorage.removeItem('carts');
    localStorage.removeItem('orderData');
  },
};
</script>
