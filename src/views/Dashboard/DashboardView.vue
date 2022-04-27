<template>
  <div class="dashboard">
    <nav
      class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div class="container">
        <RouterLink class="custom-navbar-brand navbar-brand" to="/">
          <h1 class="logo">拉麵屋</h1>
        </RouterLink>
        <button class="navbar-toggler ms-auto"
          type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup"
          ref="navbar">
          <ul class="navbar-nav w-100">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin/products">產品</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin/coupons">優惠券</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/admin/orders">訂單</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logout" href="#">登出</a>
            </li>
            <li class="nav-item ms-md-auto">
              <RouterLink class="nav-link d-flex align-items-center" to="/">
                <i class="bi bi-house-fill me-1"></i>
                返回前台
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container py-5">
      <RouterView @loadingStatus="changeLoadingStatus" v-if="isLogin" />
    </div>

    <LoadingComponent :isLoading="isLoading" />
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      navbar: {},
      isLogin: false,
      isLoading: false,
    };
  },
  watch: {
    $route() {
      this.navbar.hide();
    },
  },
  methods: {
    checkLogin(token) {
      if (token) {
        this.isLoading = true;
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then((res) => {
            const { success } = res.data;
            this.isLogin = success;
            pushToastMessage('admin', success, '登入');
            this.isLoading = false;
          }).catch((err) => {
            this.isLogin = err.response.data.success;
            this.$swal({
              icon: 'error',
              text: err.response.data.message,
            });
            this.$router.replace({
              name: 'Login',
            });
            this.isLoading = false;
          });
      } else {
        this.$swal({
          icon: 'error',
          title: '請登入帳號',
        });
        this.$router.replace({
          name: 'Login',
        });
        this.isLogin = false;
      }
    },
    logout() {
      document.cookie = `rakuwaya=;expires=${(new Date(0)).toGMTString()}`;
      pushToastMessage('admin', true, '登出');
      this.$router.push({
        name: 'Login',
      });
    },
    changeLoadingStatus(status) {
      this.isLoading = status;
    },
  },
  mounted() {
    this.navbar = new Collapse(this.$refs.navbar, {
      toggle: false,
    });

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)rakuwaya\s*=\s*([^;]*).*$)|^.*$/, '$1');

    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin(token);
  },
};
</script>
