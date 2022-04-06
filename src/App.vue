<template>
  <div id="app">
    <routerView />
    <ToastMessage />
  </div>
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue';
import emitter from '@/utils/emitter';

export default {
  provide: {
    emitter,
  },
  components: {
    ToastMessage,
  },
};
</script>
