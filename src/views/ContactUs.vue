<template>
  <div class="contact footer-bottom">
    <CartDropdown />
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">聯絡我們</h2>
    </header>

    <div class="container py-5 mb-5 mt-4 mt-sm-5">
      <ul class="info text-center mb-0 list-unstyled
        row justify-content-center gy-0">
        <li class="col-12 col-sm-4 col-lg-3 py-sm-3">
          <div class="border-bottom pb-5 pb-sm-0">
            <div
              class="info-icon rounded-circle d-flex justify-content-center align-items-center">
              <i class="bi bi-calendar-fill"></i>
            </div>
            週一 ~ 週六
            <br>
            11:00 ~ 14:00
            <br>
            17:00 ~ 20:30
          </div>
        </li>
        <li class="col-12 col-sm-4 col-lg-3 py-sm-3">
          <div class="border-bottom py-5 py-sm-0">
            <div
              class="info-icon rounded-circle d-flex justify-content-center align-items-center">
              <i class="bi bi-house-fill"></i>
            </div>
            <p class="mb-0">
              高雄市三民區最耀眼的柏油路旁
            </p>
          </div>
        </li>
        <li class="col-12 col-sm-4 col-lg-3 py-sm-3">
          <div class=" pt-5 pt-sm-0">
            <div
              class="info-icon rounded-circle d-flex justify-content-center align-items-center">
              <i class="bi bi-telephone-fill"></i>
            </div>
            <a class="text-dark text-decoration-none" href="tel:073456789">07-3456789</a>
          </div>
        </li>
      </ul>

      <div class="feedback">
        <div class="row justify-content-center gy-5 gy-md-0">
          <div class="col-12 col-md-6">
            <MapComponent />
          </div>
          <div class="col-12 col-md-6">
            <h3 class="text-center">建議回饋</h3>
            <Form ref="form" v-slot="{ errors, meta }"
              @submit="sendMessage">
              <p class="mb-4 text-center text-muted">如果有任何建議與回饋，歡迎寄信給我們知道！</p>
              <small class="mb-2 text-muted">
                <span class="text-danger">*</span>
                為必填資料
              </small>
              <div class="mb-3">
                <label class="form-label" for="name">
                  姓名
                  <span class="text-danger">*</span>
                </label>
                <Field id="name" class="form-control" type="text"
                  name="姓名" placeholder="請輸入姓名"
                  rules="required" :class="{ 'is-invalid': errors['姓名'] }"
                  v-model="userData.name" />
                <ErrorMessage name="姓名" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="email">
                  Email
                  <span class="text-danger">*</span>
                </label>
                <Field id="email" class="form-control" type="email"
                  name="Email" placeholder="請輸入 Email"
                  rules="required|email" :class="{ 'is-invalid': errors['Email'] }"
                  v-model="userData.email" />
                <ErrorMessage name="Email" class="invalid-feedback" />
              </div>
              <div class="mb-3">
                <label class="form-label" for="message">
                  留言
                  <span class="text-danger">*</span>
                </label>
                <Field as="textarea" class="p-3 form-control"
                  name="留言" id="message" style="height: 250px;"
                  rules="required" :class="{ 'is-invalid': errors['留言'] }"
                  placeholder="請輸入留言" v-model="userData.content" />
                <ErrorMessage name="留言" class="invalid-feedback" />
              </div>
              <div class="text-end">
                <button class="btn btn-primary px-4" type="submit"
                  :disabled="!meta.valid || isBtnLoading">
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
import pushToastMessage from '@/utils/pushToastMessage';
import MapComponent from '@/components/MapComponent.vue';

export default {
  data() {
    return {
      isBtnLoading: false,
      userData: {
        name: '',
        email: '',
        content: '',
      },
    };
  },
  methods: {
    sendMessage() {
      const api = `https://script.google.com/macros/s/${process.env.VUE_APP_GOOGLE_SHEET_CONTACT}/exec`;
      const params = this.userData;

      this.isBtnLoading = true;
      this.$http.post(api, null, { params })
        .then((res) => {
          pushToastMessage('user', res.data, '送出留言');
          this.isBtnLoading = false;
          this.$refs.form.resetForm();
        }).catch(() => {
          pushToastMessage('user', false, '送出留言');
          this.isBtnLoading = false;
        });
    },
  },
  components: {
    MapComponent,
  },
};
</script>
