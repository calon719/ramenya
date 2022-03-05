<template>
  <div class="toast-container position-fixed p-3 bottom-0 end-0">
    <div class="toast fade show"
      role="alert" aria-live="assertive" aria-atomic="true"
      v-for="(item, key) in messages" :key="item.msg+key">
      <div class="d-flex align-items-center">
        <div class="toast-body fs-5 d-flex align-items-center border-start border-5 rounded-start"
          :class="item.res ? 'border-success' : 'border-danger'">
          <i v-if="item.res" class="bi bi-check-circle fs-3 text-success"></i>
          <i v-else class="bi bi-exclamation-circle fs-3 text-danger"></i>
          <span v-if="item.res" class="ms-2">{{ item.msg }}成功</span>
          <span v-else class="ms-2">{{ item.msg }}失敗</span>
        </div>
        <button type="button" class="btn-close me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  </div>
</template>

<style>
.toast-container {
  z-index: 2500;
}
</style>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  inject: ['emitter'],
  methods: {
    hideToast() {
      setTimeout(() => {
        // 刪除第一個訊息
        this.messages.shift();
      }, 3500);
    },
  },
  mounted() {
    this.emitter.on('pushMessage', (message) => {
      this.messages.push(message);

      // 每一個訊息進來就會觸發一次
      this.hideToast();
    });
  },
};
</script>
