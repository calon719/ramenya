import { createStore } from 'vuex';
import pushToastMessage from '@/utils/pushToastMessage';
import showErrMsg from '@/utils/showErrMsg';

const apiBase = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`;
const headers = {
  'Content-Type': 'application/json',
};

export default createStore({
  state: {
    productsList: [],
    cartList: [],
    btnLoadingItems: [],
    isLoading: false,
    searchKeyWord: '',
  },
  getters: {
    checkFetch(state) {
      return state.productsList.length === 0 && state.cartList.length === 0;
    },
  },
  mutations: {
    setProductsList(state, playload) {
      state.productsList = playload;
    },
    setCartList(state, playload) {
      state.cartList = playload;
    },
    inputSearchKeyWord(state, playload) {
      state.searchKeyWord = playload;
    },
    toggleLoading(state, playload) {
      state.isLoading = playload;
    },
    addBtnLoadingItem(state, playload) {
      state.btnLoadingItems.push(playload);
    },
    delBtnLoadingItem(state, playload) {
      const index = state.btnLoadingItems.findIndex((item) => item === playload);
      state.btnLoadingItems.splice(index, 1);
    },
  },
  actions: {
    async fetchProductsList({ commit }) {
      const json = await fetch(`${apiBase}/products/all`)
        .then((res) => res.json());

      if (json.success) {
        const { products } = json;
        commit('setProductsList', products);
      } else {
        showErrMsg(json.msg);
      }
    },
    async fetchCartList({ commit }) {
      const json = await fetch(`${apiBase}/cart`)
        .then((res) => res.json());
      if (json.success) {
        const { data } = json;
        commit('setCartList', data);
      } else {
        showErrMsg(json.msg);
      }
    },
    async addCart({ dispatch, commit }, playload) {
      const { data, prefix } = playload;
      const options = {
        headers,
        method: 'POST',
        body: JSON.stringify({ data }),
      };

      const json = await fetch(`${apiBase}/cart`, options)
        .then((res) => res.json());

      commit('delBtnLoadingItem', `${prefix}-${data.product_id}`);
      if (json.success) {
        pushToastMessage('user', json.success, '加入購物車');
        dispatch('fetchCartList');
      } else {
        pushToastMessage('user', json.success, '加入購物車');
      }
    },
    async putCart({ dispatch, commit }, playload) {
      const { data, id, prefix } = playload;
      const options = {
        headers,
        method: 'PUT',
        body: JSON.stringify({ data }),
      };
      const json = await fetch(`${apiBase}/cart/${id}`, options)
        .then((res) => res.json());

      commit('delBtnLoadingItem', `${prefix}-${data.product_id}`);
      if (json.success) {
        pushToastMessage('user', json.success, '更新購物車');
        dispatch('fetchCartList');
      } else {
        pushToastMessage('user', json.success, '更新購物車');
      }
    },
    async delCart({ dispatch, commit }, playload) {
      const { id, prefix } = playload;
      const options = {
        headers,
        method: 'DELETE',
      };
      const json = await fetch(`${apiBase}/cart/${id}`, options)
        .then((res) => res.json());

      commit('delBtnLoadingItem', `${prefix}-${id}`);

      if (json.success) {
        dispatch('fetchCartList');
        pushToastMessage('user', json.success, '刪除商品');
      } else {
        pushToastMessage('user', json.success, '刪除商品');
      }
    },
    async clearCart({ dispatch, commit }) {
      const options = {
        headers,
        method: 'DELETE',
      };
      const json = await fetch(`${apiBase}/carts`, options)
        .then((res) => res.json());
      commit('toggleLoading', false);
      if (json.success) {
        pushToastMessage('user', json.success, '清空購物車');
        dispatch('fetchCartList');
      } else {
        pushToastMessage('user', json.success, '清空購物車');
      }
    },
  },
});
