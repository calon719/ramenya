<template>
  <nav
    class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="/">
        <h1 class="fs-5 logo-ff mb-0">樂和屋</h1>
      </a>
      <button class="navbar-toggler"
        type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">訂單</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout" href="#">登出</a>
          </li>
          <li class="nav-item ms-md-auto">
            <a class="nav-link d-flex align-items-center" href="/">
              <span class="material-icons">home</span>
              返回前台
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container py-5">
    <router-view v-if="isLogin" />
  </div>
  <loadingText :isLoading="isLoading"></loadingText>
  <toastMessage></toastMessage>
</template>

<script>
import Swal from 'sweetalert2';
import emitter from '@/utils/emitter';
import pushToastMessage from '@/utils/pushToastMessage';
import toastMessage from '@/components/ToastMessage.vue';

export default {
  data() {
    return {
      isLogin: false,
      isLoading: false,
    };
  },
  provide: {
    emitter,
  },
  methods: {
    checkLogin(token) {
      if (token) {
        this.isLoading = true;
        this.$http.post(`${process.env.VUE_APP_API}/api/user/check`)
          .then((res) => {
            const { success } = res.data;
            this.isLogin = success;
            pushToastMessage(success, '登入');
            this.isLoading = false;
          }).catch((err) => {
            this.isLogin = err.response.data.success;
            Swal.fire({
              icon: 'error',
              text: err.response.data.message,
            });
            this.$router.replace({
              name: 'Login',
            });
            this.isLoading = false;
          });
      } else {
        Swal.fire({
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
      this.$router.push({
        name: 'Login',
      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)rakuwaya\s*\=\s*([^;]*).*$)|^.*$/, // eslint-disable-line
      '$1',
    );

    this.$http.defaults.headers.common.Authorization = token;
    this.checkLogin(token);
  },
  components: {
    toastMessage,
  },
};
</script>
