<template>
  <div class="adminOrder">
    <h2>訂單管理列表</h2>
    <div class="table-responsive">
      <table class="table table-striped text-center text-nowrap">
        <thead>
          <tr>
            <th scope="col">下單時間</th>
            <th scope="col" class="text-start">客戶資料</th>
            <th scope="col" class="text-start">訂購商品</th>
            <th scope="col" class="text-end">應賦金額</th>
            <th scope="col">交貨狀態</th>
            <th scope="col">付款狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-if="!ordersData.length">
            <td colspan="7" class="py-5">尚未有任何訂單</td>
          </tr>
          <tr v-else v-for="order in ordersData" :key="order.id">
            <td>
              {{ new Date(order.create_at * 1000).toLocaleString('zh-TW', dateOptions) }}
              <br>
              {{ new Date(order.create_at * 1000).toLocaleString('zh-TW', timeOptions) }}
            </td>
            <td>
              <ul class="text-start list-unstyled mb-0">
                <li>姓名：{{ order.user.name }}</li>
                <li>信箱：{{ order.user.email }}</li>
                <li>電話：{{ order.user.tel }}</li>
                <li>地址：{{ order.user.address }}</li>
              </ul>
            </td>
            <td>
              <ul class="text-start list-unstyled mb-0">
                <li v-for="data in order.products" :key="data">
                  {{ data.product?.title }}*{{ data.qty }}
                </li>
              </ul>
            </td>
            <td class="text-end">NTD {{ Math.ceil(order.total).toLocaleString() }}</td>
            <td
              :class="[{'text-success': order.is_delivered}, {'text-muted': !order.is_delivered}]">
              <div class="d-flex justify-content-center align-items-center">
                <div class="form-check form-switch">
                  <input class="form-check-input rounded-pill" type="checkbox" role="switch"
                    :id="`is_delivered${order.id}`" v-model="order.is_delivered"
                    @change="updateOrder(order)" />
                  <label class="form-check-label" :for="`is_delivered${order.id}`">
                    {{ order.is_delivered ? '已送達' : '未送達' }}
                  </label>
                </div>
              </div>
            </td>
            <td
              :class="[{'text-success': order.is_paid}, {'text-muted': !order.is_paid}]">
              <div class="d-flex justify-content-center align-items-center">
                <div class="form-check form-switch">
                  <input class="form-check-input rounded-pill" type="checkbox" role="switch"
                    :id="`is_paid${order.is_paid}`" v-model="order.is_paid"
                    @change="updateOrder(order)" />
                  <label class="form-check-label" :for="`is_paid${order.is_paid}`">
                    {{ order.is_paid ? '已付款' : '未付款' }}
                  </label>
                </div>
              </div>
            </td>
            <td>
              <div class="btn-group" role="group" aria-label="edit order">
                <button type="button" class="btn btn-outline-secondary"
                  @click="showModal('edit', order)">檢視</button>
                <button type="button"
                  class="btn btn-outline-danger"
                  @click="showModal('delete', order)"
                >刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <pagination :pages="paginationData" @page="getOrders"></pagination>

    <orderModal ref="orderModalOuter" :order="modalTemp"></orderModal>

    <delModal ref="delModalOuter"
      :item="modalTemp" view="order" @update="getOrders">
      <template #modal-text>
        <table class="table">
          <tbody>
            <tr>
              <th scope="row" width="100">訂單編號</th>
              <td>{{ modalTemp.id }}</td>
            </tr>
            <tr>
              <th scope="row" width="100">下單時間</th>
              <td v-if="modalTemp.create_at">
                {{ new Date(modalTemp.create_at * 1000).toLocaleString('zh-TW', {hour12: false}) }}
              </td>
            </tr>
            <tr>
              <th scope="row" width="100">客戶姓名</th>
              <td>{{ modalTemp.user.name }}</td>
            </tr>
            <tr>
              <th scope="row" width="100">地址</th>
              <td>{{ modalTemp.user.tel }}</td>
            </tr>
            <tr>
              <th scope="row" width="100">付款狀態</th>
              <td
                :class="modalTemp.is_paid ? 'text-success' : 'text-muted'"
              >{{ modalTemp.is_paid ? '已付款' : '未付款' }}</td>
            </tr>
            <tr>
              <th scope="row" width="100">付款狀態</th>
              <td
                :class="modalTemp.is_delivered ? 'text-success' : 'text-muted'"
              >{{ modalTemp.is_delivered ? '已送達' : '未送達' }}</td>
            </tr>
          </tbody>
        </table>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">選購商品</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in modalTemp.products" :key="`del_${item.product.id}`">
              <th scope="row" width="100">{{ item.product.title }}</th>
              <td>{{ item.qty }} {{ item.product.unit }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </delModal>
    <loadingText :isLoading="isLoading"></loadingText>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import pagination from '@/components/PaginationComponent.vue';
import delModal from '@/components/DelModal.vue';
import orderModal from '@/components/OrderModal.vue';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      ordersData: [],
      paginationData: {},
      modalTemp: {
        user: {},
      },
      dateOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      timeOptions: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      },
      isLoading: false,
      isBtnLoading: false,
    };
  },
  methods: {
    getOrders(page = this.paginationData?.current_page || 1) {
      const api = `${this.apiBase}/admin/orders?page=${page}`;
      this.isLoading = true;
      this.$http.get(api)
        .then((res) => {
          this.ordersData = res.data.orders;
          this.paginationData = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          console.dir(err);
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            text: err.data.response.message,
          });
        });
    },
    showModal(status, order) {
      if (status === 'edit') {
        this.modalTemp = JSON.parse(JSON.stringify(order));
        this.$refs.orderModalOuter.showModal();
      } else {
        this.modalTemp = order;
        this.$refs.delModalOuter.showModal();
      }
    },
    updateOrder(order) {
      this.isLoading = true;
      const api = `${this.apiBase}/admin/order/${order.id}`;
      this.$http.put(api, { data: order })
        .then((res) => {
          this.isLoading = false;
          pushToastMessage('admin', res.data.success, '訂單更新');
          this.getOrders();
        }).catch((err) => {
          this.isLoading = false;
          pushToastMessage('admin', err.response.data.success, '訂單更新');
        });
    },
  },
  created() {
    this.getOrders();
  },
  components: {
    pagination,
    delModal,
    orderModal,
  },
};
</script>
