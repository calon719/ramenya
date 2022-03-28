<template>
  <vueLoadingOverlay v-model:active="isLoading"
    :color="'#fff'"
    :background-color="'#000'"
    :opacity="0.75"
    :z-index="3000">
    <div class="loadingio-spinner-ellipsis-66suo52scoo">
      <div class="ldio-i8bc824azn">
        <div></div><div></div><div></div><div></div><div></div>
      </div>
    </div>
  </vueLoadingOverlay>
</template>

<script>
import vueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  props: ['is-loading'],
  components: {
    vueLoadingOverlay,
  },
};
</script>
