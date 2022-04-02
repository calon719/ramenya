<template>
  <div class="modal fade" id="orderModal"
    tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true" ref="orderModalInner">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h3 class="modal-title">編輯訂單資料</h3>
          <button type="button" class="btn-close btn-close-white"
            data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-12 col-md-4">
              <h4>客戶資料</h4>
              <table class="table">
                <tbody class="align-middle">
                  <tr>
                    <th scope="row" width="100">姓名</th>
                    <td>
                      <div class="input-group">
                        <input type="text" class="form-control" v-model="data.user.name"
                          :readonly="!editStatus.name" />
                        <button type="button" class="btn btn-outline-secondary"
                          @click="editStatus.name = !editStatus.name">
                          編輯</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">聯絡電話</th>
                    <td>
                      <div class="input-group">
                        <input type="tel" class="form-control" v-model="data.user.tel"
                          :readonly="!editStatus.tel" />
                        <button class="btn btn-outline-secondary" type="button"
                          @click="editStatus.tel = !editStatus.tel">
                          編輯</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">地址</th>
                    <td>
                      <div class="input-group">
                        <input class="form-control" type="text" v-model="data.user.address"
                        :readonly="!editStatus.address" />
                        <button class="btn btn-outline-secondary" type="button"
                          @click="editStatus.address = !editStatus.address">編輯</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-12 col-md-8">
              <h4>訂單細節</h4>
              <table class="table mb-4">
                <tbody>
                  <tr>
                    <th scope="row" width="100">訂單編號</th>
                    <td>{{ data.id }}</td>
                  </tr>
                  <tr>
                    <th scope="row">下單時間</th>
                    <td>
                      {{ new Date(data.create_at * 1000).toLocaleString('zh-TW', timeOptions) }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">付款狀態</th>
                    <td :class="data.is_paid ? 'text-success' : 'text-muted'">
                      <div class="form-check form-switch">
                        <input class="form-check-input rounded-pill" type="checkbox" role="switch"
                          :id="`is_paid${data.id}`" v-model="data.is_paid" />
                        <label class="form-check-label" :for="`is_paid${data.id}`">
                          {{ data.is_paid ? '已付款' : '未付款' }}
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">交貨狀態</th>
                    <td :class="data.is_delivered ? 'text-success' : 'text-muted'">
                      <div class="form-check form-switch">
                        <input class="form-check-input rounded-pill" type="checkbox" role="switch"
                          :id="`is_delivered${data.id}`" v-model="data.is_delivered" />
                        <label class="form-check-label" :for="`is_delivered${data.id}`">
                          {{ data.is_delivered ? '已送達' : '未送達' }}
                        </label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="row row-cols-1 row-cols-md-2">
                <div class="col">
                  <h4>選購商品</h4>
                  <table class="table mb-4">
                    <tbody>
                      <tr v-for="item in data.products" :key="`modal_${item.product.id}`">
                        <th scope="row" width="150">{{ item.product.title }}</th>
                        <td class="text-end">{{ item.qty }} {{ item.product.unit }}</td>
                        <td class="text-end">
                          {{ item.total.toLocaleString('zw-TW', currencyOptions) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="text-end">
                        <th scope="row" colspan="2">總金額</th>
                        <td  width="120" v-if="data.total">
                          {{ data.total.toLocaleString('zw-TW', currencyOptions) }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div class="col">
                  <h5>備註</h5>
                  <p>{{ data.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary px-4"
            data-bs-dismiss="modal">關閉</button>
          <button class="btn btn-primary px-4" type="button"
            @click="updateOrder">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      modal: {},
      data: this.order,
      editStatus: {
        name: false,
        tel: false,
        address: false,
      },
      isBtnLoading: false,
      timeOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      },
      currencyOptions: {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0,
      },
    };
  },
  watch: {
    order() {
      this.data = this.order;
      this.editStatus = {
        name: false,
        tel: false,
        address: false,
      };
    },
  },
  props: ['order'],
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    updateOrder() {
      this.$emit('update-order', this.data);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.orderModalInner);
  },
};
</script>
