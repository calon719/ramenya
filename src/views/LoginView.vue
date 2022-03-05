<template>
  <div class="bg-secondary bg-opacity-10">
    <div class="container py-3">
      <router-link class="d-flex align-items-center justify-content-end
        text-secondary text-decoration-none link-hover mb-3"
        to="/">
        <span class="material-icons">
          home
        </span>
        返回前台
      </router-link>

      <div class="row justify-content-center align-items-center footer-bottom">
        <div class="col-12 col-md-6 col-xl-4">
          <div class="bg-white p-4 rounded-3">
            <h2 class="text-center fw-bold">登入</h2>
            <Form v-slot="{ errors, meta }" @submit="login">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field name="Email" id="email" type="email"
                  placeholder="請輸入 Email"
                  rules="required|email" class="form-control"
                  :class="{ 'is-invalid': errors['Email'] }"
                  v-model="user.username" />
                <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <Field name="密碼" id="password" type="password"
                  placeholder="請輸入密碼"
                  rules="required" class="form-control"
                  :class="{ 'is-invalid': errors['密碼'] }"
                  v-model="user.password"
                  autocomplete />
                <ErrorMessage name="密碼" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="text-end">
                <button type="submit"
                  class="btn btn-primary w-50 ms-auto"
                  :disabled="!meta.valid || isBtnLoading">
                  <div class="spinner-border spinner-border-sm" role="status"
                    v-if="isBtnLoading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <span v-else>登入</span>
                </button>
              </div>
              <p>
                <small v-if="isErr" class="text-danger fs-sm">Email 或 密碼 不正確</small>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="bg-dark py-3 py-md-4 py-lg-5">
    <p class="text-center text-white mb-0">僅個人練習使用．不做商業用途</p>
  </footer>

  <loadingText :isLoading="isLoading"></loadingText>
</template>

<style lang="scss">
@import 'bootstrap';

.link-hover:hover{
  opacity: .7;
}
.footer-bottom {
  min-height: calc(100vh - 40px - 56px - 32px);
}
@include media-breakpoint-up(md){
  .footer-bottom {
    min-height: calc(100vh - 40px - 72px - 32px);
  }
}
@include media-breakpoint-up(lg){
  .footer-bottom {
    min-height: calc(100vh - 40px - 120px - 32px);
  }
}
</style>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      isLoading: false,
      isBtnLoading: false,
      isErr: false,
    };
  },
  methods: {
    login() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;

      this.isBtnLoading = true;
      this.$http.post(api, this.user)
        .then((res) => {
          this.isErr = false;

          const { token, expired } = res.data;
          document.cookie = `rakuwaya=${token}; expires=${new Date(expired)};`;

          this.$router.push({
            name: 'AdminProducts',
          });
        }).catch(() => {
          this.isErr = true;
        }).then(() => {
          this.isBtnLoading = false;
        });
    },
    checkLogin(token) {
      if (token) {
        this.$http.defaults.headers.common.Authorization = token;
        this.isLoading = true;
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then(() => {
            this.$router.push({
              name: 'AdminProducts',
            });
            this.isLoading = false;
          }).catch(() => {
            this.isLoading = false;
          });
      }
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rakuwaya\s*\=\s*([^;]*).*$)|^.*$/, // eslint-disable-line
      '$1',
    );
    this.checkLogin(token);
  },
};
</script>
