<template>
  <div id="app">
    <RouterView />
    <ToastMessage />
  </div>
</template>

<script>
import ToastMessage from '@/components/ToastMessage.vue';
import emitter from '@/utils/emitter';
import checkBtnLoading from '@/utils/checkBtnLoading';
import pushToastMessage from '@/utils/pushToastMessage';
import showErrMsg from '@/utils/showErrMsg';

export default {
  provide: {
    emitter,
    checkBtnLoading,
    showErrMsg,
    pushToastMessage,
  },
  components: {
    ToastMessage,
  },
};
</script>
