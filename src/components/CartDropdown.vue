<template>
  <div class="dropdown">
    <button type="button" class="cart-btn"
      data-bs-toggle="dropdown">
      <span class="cart-badge badge rounded-pill bg-danger">
        {{ cart.length ? cart.length : 0 }}
      </span>
      <i class="bi bi-basket-fill"></i>
    </button>

    <div class="dropdown-menu rounded">
      <div class="overflow-auto" style="max-height: 400px;">
        <table class="table table-borderless mb-0"
          :class="{'table-striped': cart.length}"
          style="width: 300px">
          <thead>
            <tr>
              <th scope="col" colspan="3"
                class="text-center fw-normal fs-5 border-bottom">
                購物車清單
              </th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <tr v-show="!cart.length">
              <td class="py-4 text-center text-muted">
                購物車內沒東西
                <br>
                <router-link to="/products"
                  class="btn btn-primary mt-2">去逛逛</router-link>
              </td>
            </tr>

            <tr v-show="cart.length"
              v-for="item in cart" :key="`cart-link-${item.id}`">
              <td style="height: 50px">
                <div class="ratio ratio-1x1 overflow-hidden" style="width: 70px">
                  <img class="img-cover" :src="item.product.imageUrl" :alt="item.product.title">
                </div>
              </td>
              <td class="text-center">
                <p class="mb-1">{{ item.product.title }}</p>
                <p class="mb-0">
                  NTD {{ item.product.price }}
                  <i class="bi bi-x"></i>
                  {{ item.qty }}
                </p>
              </td>
              <td class="text-end" @click="deleteProduct(item.id)">
                <button class="btn-close"></button>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="cart.length">
            <tr>
              <td colspan="3">
                <router-link to="/cart" class="btn btn-primary w-100">去結帳</router-link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <VueLoading v-model:active="isLoading"
      :color="`#fff`"
      :background-color="`#000`"
      :opacity="0.75"
      :z-index="3000">
      <div class="loadingio-spinner-ellipsis-66suo52scoo"><div class="ldio-i8bc824azn">
          <div></div><div></div><div></div><div></div><div></div>
      </div></div>
    </VueLoading>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      dropdown: {},
      cart: [],
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      this.$http.get(`${this.apiBase}/cart`)
        .then((res) => {
          this.cart = res.data.data.carts;
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          const msg = err.response.data.message;
          Swal.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    deleteProduct(id) {
      console.log('click');
      this.isLoading = true;
      this.$http.delete(`${this.apiBase}/cart/${id}`)
        .then((res) => {
          pushToastMessage('user', res.data.success, '刪除商品');
          this.getCart();
        }).catch((err) => {
          this.isLoading = false;
          pushToastMessage('user', err.response.data.success, '刪除商品');
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
