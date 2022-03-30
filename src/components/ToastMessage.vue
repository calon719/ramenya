<template>
  <div class="toast-container position-fixed p-3 end-0"
    :class="fromPage === 'admin' ? 'bottom-0' : 'user-toast-container'">
    <div class="toast fade show"
      role="alert" aria-live="assertive" aria-atomic="true"
      v-for="(item, key) in adminMessages" :key="item.msg+key">
      <div class="d-flex align-items-center">
        <div class="toast-body fs-5 d-flex align-items-center border-start border-5"
          :class="item.res ? 'border-success' : 'border-danger'">
          <i v-if="item.res" class="bi bi-check-circle fs-3 text-success"></i>
          <i v-else class="bi bi-exclamation-circle fs-3 text-danger"></i>
          <span v-if="item.res" class="ms-2">成功{{ item.msg }}</span>
          <span v-else class="ms-2">{{ item.msg }}失敗</span>
        </div>
        <button type="button" class="btn-close me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>

    <div class="toast fade show"
      role="alert" aria-live="assertive" aria-atomic="true"
      v-for="(item, key) in userMessages" :key="item.msg+key">
      <div class="alert d-flex justify-content-center align-items-center mb-0"
        :class="item.res ? 'alert-success' : 'alert-danger'"
        role="alert">
        <p class="fs-4 mb-0" v-if="item.res">
          <i class="bi bi-check-square-fill me-1"></i>
          成功{{ item.msg }}
        </p>
        <p class="fs-4 mb-0" v-else>
          <i class="bi bi-x-square-fill me-1"></i>
          {{ item.msg }}失敗
        </p>
        <button type="button" class="btn-close me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromPage: '',
      adminMessages: [],
      userMessages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    hideToast() {
      setTimeout(() => {
        this.adminMessages.shift();
        this.userMessages.shift();
      }, 3500);
    },
  },
  mounted() {
    this.emitter.on('pushMessage', (message) => {
      const { fromPage } = message;
      this.fromPage = fromPage;
      const ary = `${fromPage}Messages`;
      this[ary].push(message);
      this.hideToast();
    });
  },
  unmounted() {
    this.emitter.off('pushMessage');
  },
};
</script>

<style scoped>
.toast-container {
  z-index: 2500;
}
.user-toast-container {
  top: 56px;
}
</style>
