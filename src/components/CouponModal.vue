<template>
  <div class="modal fade" id="staticBackdrop"
    data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true"
    ref="modal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h3 class="modal-title" id="staticBackdropLabel">
            {{ status === 'add' ? '新增' : '編輯' }}優惠券
          </h3>
          <button type="button" class="btn-close btn-close-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <Form v-slot="{ errors, meta }" @submit="updateCoupon">
          <div class="modal-body">
            <div class="row mb-3 g-3">
              <div class="col-12 col-md-7">
                <label class="form-label" for="title">
                  優惠券標題
                  <span class="text-danger">*</span>
                </label>
                <Field id="title" class="form-control" type="text"
                  name="標題" placeholder="請輸入優惠券標題"
                  rules="required" v-model="data.title"
                  :class="{ 'is-invalid': errors['標題'] }" />
                <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="col-12 col-md-5">
                <label class="form-label" for="title">
                  到期日
                  <span class="text-danger">*</span>
                </label>
                <DatePicker
                  v-model="formatDate"
                  :min-date="new Date()">
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="form-control text-end"
                      :input-debounce="500"
                      :value="inputValue"
                      v-on="inputEvents" />
                  </template>
                </DatePicker>
              </div>
              <div class="col-12 col-md-7">
                <label class="form-label" for="code">折扣碼</label>
                <input id="code" class="form-control" type="text"
                  name="折扣碼" placeholder="請輸入優惠折扣碼"
                  v-model="data.code" />
                <small class="text-muted">※ 沒有輸入會自動代入 11 碼英數亂碼</small>
              </div>
              <div class="col-12 col-md-5">
                <label class="form-label" for="percent">
                  折扣
                  <span class="text-danger">*</span>
                  （單位：%）
                </label>
                <Field id="percent" class="form-control" type="number" min="0"
                  name="折扣" placeholder="以 % 為單位，ex. 8 折就輸入 80"
                  rules="required|min_value:0|max_value:100|numeric" v-model.number="data.percent"
                  :class="{ 'is-invalid': errors['折扣'] }" />
                <ErrorMessage name="折扣" class="invalid-feedback"></ErrorMessage>
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div class="form-check form-switch">
                <input type="checkbox" role="switch"
                  id="is_enabled" class="form-check-input rounded-pill"
                  :true-value="1" :false-value="0"
                  v-model="data.is_enabled" />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary px-4"
              data-bs-dismiss="modal">取消</button>
            <button type="submit" class="btn btn-primary px-4"
              :disabled="!meta.valid || isBtnLoading">
              <span v-if="!isBtnLoading">確認</span>
              <span v-else class="spinner-border spinner-border-sm"
                role="status" aria-hidden="true"></span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import modalMixin from '@/mixins/modalMixin';

export default {
  data() {
    return {
      modal: {},
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      data: this.coupon,
      formatDate: '',
      status: this.methodStatus,
      isBtnLoading: false,
    };
  },
  props: ['coupon', 'methodStatus'],
  watch: {
    coupon: {
      handler(newVal) {
        this.data = newVal;
        this.formatDate = newVal.due_date * 1000;
      },
      deep: true,
    },
    methodStatus() {
      this.status = this.methodStatus;
    },
  },
  mixins: [modalMixin],
  inject: ['pushToastMessage'],
  methods: {
    updateCoupon() {
      this.data.due_date = this.formatDate;
      let method = '';
      let url = `${this.apiBase}/admin/coupon`;
      let timestamp = '';

      // 判斷是不是 Unix 格式
      const dateLen = this.data.due_date.toString().length;
      if (dateLen !== 10) {
        timestamp = this.data.due_date.getTime();
        this.data.due_date = Math.floor(timestamp / 1000);
      }

      switch (this.status) {
        case 'add':
          method = 'post';
          if (!this.data.code) {
            // 產生 11 碼隨機字串
            this.data.code = Math.random().toString(36).substring(2);
          }
          break;
        case 'edit':
          method = 'put';
          url = `${this.apiBase}/admin/coupon/${this.data.id}`;
          break;
        default:
          break;
      }

      this.isBtnLoading = true;
      this.$http[method](url, { data: this.data })
        .then((res) => {
          this.pushToastMessage('admin', res.data.success, '優惠券更新');
          this.hideModal();
          this.$emit('update');
        }).catch((err) => {
          this.pushToastMessage('admin', err.response.data.success, '優惠券更新');
        }).then(() => {
          this.isBtnLoading = false;
        });
    },
  },
  components: {
    DatePicker,
  },
};
</script>
