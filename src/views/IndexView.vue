<template>
  <div class="index">
    <nav
      class="navbar navbar-expand-md navbar-light bg-primary sticky-top">
      <div class="container">
        <routerLink class="navbar-brand custom-navbar-brand" to="/">
          <h1 class="logo">拉麵屋</h1>
        </routerLink>
        <button class="navbar-toggler ms-auto"
          type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" ref="navbar">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <routerLink class="nav-link"
                :to="{ path: '/products', query: { category: '拉麵' } }">美味菜單</routerLink>
            </li>
            <li class="nav-item">
              <routerLink class="nav-link" to="/anniversary">優惠活動</routerLink>
            </li>
            <li class="nav-item">
              <routerLink class="nav-link" to="/contact">聯絡我們</routerLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <routerView v-if="loadingPage.some((page) => $route.name === page)"
      @loadingStatus="changeLoadingStatus" />
    <routerView v-else />

    <footer class="bg-dark py-4">
      <div class="container">
        <ul class="list-unstyled d-flex justify-content-center mb-0 fs-5">
          <li>
            <routerLink class="text-white d-block px-2 py-1" to="/login">
              <i class="bi bi-wrench-adjustable-circle-fill"></i>
            </routerLink>
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

    <LoadingComponent :isLoading="isLoading"></LoadingComponent>
  </div>
</template>

<script>
import { Collapse } from 'bootstrap';

export default {
  data() {
    return {
      navbar: {},
      needLoading: false,
      isLoading: false,
      loadingPage: [
        'Home',
        'UserProducts',
        'UserProduct',
        'UserCart',
        'UserOrderConfirm',
      ],
    };
  },
  watch: {
    $route() {
      this.navbar.hide();
    },
  },
  methods: {
    changeLoadingStatus(status) {
      this.isLoading = status;
    },
  },
  mounted() {
    this.navbar = new Collapse(this.$refs.navbar, {
      toggle: false,
    });
  },
};
</script>
