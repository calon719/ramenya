<template>
  <div class="contact footer-bottom">
    <cartDropdown></cartDropdown>
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">聯絡我們</h2>
    </header>

    <div class="container py-3 py-md-5 mb-5 mt-4 mt-sm-5">
      <div class="info mb-5 row align-items-center gy-4">
        <div class="col-12 col-md-6 col-lg-5 order-2 order-md-1 d-flex justify-content-center">
          <ul class="lh-lg d-flex flex-column align-item-center">
            <li>營業時間：每週一到週六，11:00 ~ 14:00 與 17:00 ~ 20:30</li>
            <li>地址：高雄市三民區看得順眼的那條路</li>
            <li>電話：<a href="tel:073456789">07-3456789</a></li>
          </ul>
        </div>
        <div class="col-12 col-md-6 col-lg-7 order-1 order-md-2 h-100 overflow-hidden">
          <mapComponent class="w-100"></mapComponent>
        </div>
      </div>

      <div class="feedback">
        <h3 class="text-center">建議回饋</h3>
        <div class="row justify-content-center">
          <div class="col-12 col-sm-10 col-md-8 col-lg-6">
            <Form ref="form" v-slot="{ errors, meta }">
              <p class="mb-4 text-center text-muted">如果有任何建議與回饋，歡迎寄信給我們知道！</p>
              <div class="mb-3">
                <label class="form-label" for="name">
                  姓名
                  <span class="badge badge-custom bg-danger ms-1">必要</span>
                </label>
                <Field id="name" class="form-control" type="text"
                  name="姓名" placeholder="請輸入姓名"
                  rules="required" :class="{ 'is-invalid': errors['姓名'] }" />
                <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">
                  Email
                  <span class="badge badge-custom bg-danger ms-1">必要</span>
                </label>
                <Field id="email" class="form-control" type="email"
                  name="Email" placeholder="請輸入 Email"
                  rules="required|email" :class="{ 'is-invalid': errors['Email'] }" />
                <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label class="form-label" for="message">留言</label>
                <span class="badge badge-custom bg-danger ms-1">必要</span>
                <Field as="textarea" class="p-3 form-control"
                  name="留言" id="message" style="height: 250px;"
                  rules="required" :class="{ 'is-invalid': errors['留言'] }"
                  placeholder="請輸入留言"></Field>
                <ErrorMessage name="留言" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="text-end">
                <button class="btn btn-primary px-4" type="button"
                  :disabled="!meta.valid || isBtnLoading" @click="sendMessage">
                  <div class="spinner-border spinner-border-sm"
                    v-if="isBtnLoading"></div>
                  <span v-else>送出</span>
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartDropdown from '@/components/CartDropdown.vue';
import pushToastMessage from '@/utils/pushToastMessage';
import mapComponent from '@/components/MapComponent.vue';

export default {
  data() {
    return {
      isBtnLoading: false,
    };
  },
  methods: {
    sendMessage() {
      this.isBtnLoading = true;
      setTimeout(() => {
        this.isBtnLoading = false;
        this.$refs.form.resetForm();
        pushToastMessage('user', true, '送出留言');
      }, 500);
    },
  },
  components: {
    cartDropdown,
    mapComponent,
  },
  mounted() {
  },
};
</script>
