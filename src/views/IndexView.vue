<template>
  <nav
    class="navbar navbar-expand-md navbar-light bg-warning sticky-top">
    <div class="container">
      <h1 class="navbar-brand fs-5 logo-ff mb-0">樂和屋</h1>
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
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item ms-auto">
            <router-link
              class="nav-link d-flex align-items-center" to="/login">
              <span class="material-icons">
               settings
              </span>
              後台登入
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />

  <footer class="bg-dark py-3 py-md-4 py-lg-5">
    <p class="text-center text-white mb-0">僅個人練習使用．不做商業用途</p>
  </footer>

</template>
