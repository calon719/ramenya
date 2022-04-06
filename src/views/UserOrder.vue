<template>
  <div class="order">
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">訂單資訊</h2>
    </header>

    <routerView v-if="$route.name === 'UserOrderConfirm'"
      @loadingStatus="toggleLoading"></routerView>
    <routerView v-else></routerView>

    <LoadingComponent :isLoading="isLoading"></LoadingComponent>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    toggleLoading(status) {
      this.isLoading = status;
    },
  },
};
</script>
