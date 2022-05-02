<template>
  <div class="modal fade" id="delModal"
    tabindex="-1"
    ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-white">
          <h3 class="modal-title fw-bold">刪除資料</h3>
          <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>
            確定要刪除以下資料嗎？
          </p>
          <slot name="modal-text"></slot>
          <strong class="text-danger">※ 注意：刪除後資料無法復原</strong>
        </div>
        <div class="modal-footer">
          <button type="button"
            class="btn btn-outline-danger px-4"
            @click="delData"
            :disabled="isLoading">
            <span v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status" aria-hidden="true"></span>
            <span v-else>刪除</span>
          </button>
          <button type="button"
            class="btn btn-secondary px-4"
            data-bs-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      data: this.item,
      isLoading: false,
    };
  },
  inject: ['pushToastMessage'],
  props: ['item', 'view'],
  watch: {
    item: {
      handler(newVal) {
        this.data = newVal;
      },
      deep: true,
    },
  },
  mixins: [modalMixin],
  methods: {
    delData() {
      const api = `${this.apiBase}/admin/${this.view}/${this.data.id}`;
      let msg = '';

      switch (this.view) {
        case 'product':
          msg = '刪除產品';
          break;
        case 'coupon':
          msg = '刪除優惠券';
          break;
        case 'order':
          msg = '刪除訂單';
          break;
        default:
          break;
      }

      this.isLoading = true;
      this.$http.delete(api)
        .then((res) => {
          this.pushToastMessage('admin', res.data.success, msg);
          this.hideModal();
          this.$emit('update');
        }).catch((err) => {
          this.pushToastMessage('admin', err.response.data.success, msg);
        }).then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>
