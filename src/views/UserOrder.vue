<template>
  <div class="order">
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">訂單資訊</h2>
    </header>

    <router-view v-if="$route.name === 'UserOrderConfirm'"
      @loadingStatus="toggleLoading"></router-view>
    <router-view v-else></router-view>

    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
import loading from '@/components/LoadingComponent.vue';

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
  components: {
    loading,
  },
};
</script>
