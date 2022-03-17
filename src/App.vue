<template>
  <div id="app">
    <router-view/>
  </div>
  <toastMessage></toastMessage>
</template>

<script>
import toastMessage from '@/components/ToastMessage.vue';
import emitter from '@/utils/emitter';

export default {
  provide: {
    emitter,
  },
  components: {
    toastMessage,
  },
};
</script>
