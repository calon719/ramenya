<template>
  <div class="dropdown">
    <button type="button" class="cart-btn"
      data-bs-auto-close="outside"
      data-bs-toggle="dropdown">
      <span class="cart-badge badge rounded-pill bg-danger">
        {{ cartList.length ? cartList.length : 0 }}
      </span>
      <i class="bi bi-basket-fill"></i>
    </button>

    <div class="dropdown-menu rounded">
      <div class="overflow-auto" style="max-height: 400px;">
        <table class="table table-borderless mb-0"
          :class="{'table-striped': cartList.length}"
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
            <tr v-show="!cartList.length">
              <td class="py-4 text-center text-muted">
                購物車內沒東西
                <br>
                <RouterLink :to="{ path: '/products', query: { category: '全部' } }"
                  class="btn btn-primary mt-2">去逛逛</RouterLink>
              </td>
            </tr>

            <tr v-show="cartList.length"
              v-for="item in cartList" :key="`cart-link-${item.id}`">
              <td style="height: 50px">
                <div class="ratio ratio-1x1 overflow-hidden" style="width: 70px">
                  <img class="img-cover" :src="item.product.imageUrl" :alt="item.product.title">
                </div>
              </td>
              <td>
                <p class="mb-1">{{ item.product.title }}</p>
                <p class="mb-0">
                  NTD {{ item.product.price }}
                  <i class="bi bi-x"></i>
                  {{ item.qty }}
                </p>
              </td>
              <td class="text-end" @click="delCart(item.id)">
                <div v-if="checkBtnLoading(`cartDropdown-del-${item.id}`)"
                  class="spinner-border spinner-border-sm"></div>
                <button v-else type="button" class="btn-close"></button>
              </td>
            </tr>
          </tbody>
          <tfoot v-show="cartList.length">
            <tr>
              <td colspan="3">
                <RouterLink to="/cart" class="btn btn-primary w-100">去結帳</RouterLink>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdown: {},
    };
  },
  inject: ['checkBtnLoading'],
  computed: {
    cartList() {
      return this.$store.state.cartList.carts || [];
    },
  },
  methods: {
    delCart(id) {
      this.$store.commit('addBtnLoadingItem', `cartDropdown-del-${id}`);
      this.$store.dispatch('delCart', { id, prefix: 'cartDropdown-del' });
    },
  },
};
</script>
