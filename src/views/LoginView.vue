<template>
  <div class="login">
    <div class="bg-secondary bg-opacity-10">
      <div class="container py-3">
        <div class="d-flex justify-content-end">
          <router-link to="/" class="text-secondary text-decoration-none mb-3">
            <i class="bi bi-house-fill"></i>
            返回前台
          </router-link>
        </div>

        <div class="row justify-content-center align-items-center login-footer-bottom">
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

    <footer class="bg-dark py-4">
      <div class="container">
        <ul class="list-unstyled d-flex justify-content-center mb-0 fs-5">
          <li>
            <router-link class="text-white d-block px-2 py-1" to="/login">
              <i class="bi bi-wrench-adjustable-circle-fill"></i>
            </router-link>
          </li>
          <li>
            <a class="text-white d-block px-2 py-1" href="https://github.com/calon719/ramenya" target="_blank">
              <i class="bi bi-github"></i>
            </a>
          </li>
        </ul>
        <p class="text-center text-white mb-0">
          僅個人練習使用．不做商業用途
          <br>
          Copyright © 2022 made by Calon
        </p>
      </div>
    </footer>

    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
import loading from '@/components/LoadingComponent.vue';

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
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)rakuwaya\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.checkLogin(token);
  },
  components: {
    loading,
  },
};
</script>
