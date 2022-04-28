<template>
  <div id="app">
    <RouterView />
    <ToastMessage />
  </div>
  <LoadingComponent :isLoading="isLoading" />
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import emitter from '@/utils/emitter';
import checkBtnLoading from '@/utils/checkBtnLoading';

export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading || this.$store.getters.checkFetch;
    },
  },
  provide: {
    emitter,
    checkBtnLoading,
  },
  components: {
    ToastMessage,
    LoadingComponent,
  },
};
</script>
